"use client";
import { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useUser } from "@/utils/context";
import { useEffect, useRef, useState } from "react";

interface Props {
  callActive: boolean;
  setCallActive: (b: boolean) => void;
  setChannel?: (c: string) => void;
  setToken?: (t: string) => void;
}

export default function MultiPersonVideoSection({
  callActive,
  setCallActive,
  setChannel,
  setToken,
}: Props) {
  const { user } = useUser();

  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const localRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef<Record<string, boolean>>({});

  async function handleStart() {
    if (!user?.uid) return;
    setCallActive(true);
    const { default: AgoraRTC } = await import("agora-rtc-sdk-ng");

    const c = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(c);

    const channel = `group-${Date.now()}`;
    setChannel?.(channel);

    const { token } = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/agora/token?channelName=${channel}&uid=${user.uid}`
    ).then((r) => r.json());
    setToken?.(token);

    /* remote events */
    c.on("user-published", async (u, mediaType) => {
      await c.subscribe(u, mediaType);
      setRemoteUsers((prev) =>
        prev.find((x) => x.uid === u.uid) ? prev : [...prev, u]
      );
      if (mediaType === "video") {
        queueMicrotask(() => {
          const el = document.getElementById(`u-${u.uid}`);
          if (el) {
            u.videoTrack?.play(el);
            playedRef.current[u.uid] = true;
          }
        });
      }
      if (mediaType === "audio") {
        u.audioTrack?.play();
      }
    });

    c.on("user-unpublished", (u) => {
      alert("User left the call");
      setRemoteUsers((prev) => prev.filter((x) => x.uid !== u.uid));
      playedRef.current[u.uid] = false; // reset so can replay if they return
      remoteUsers.forEach((u) => {
        const el = document.getElementById(`u-${u.uid}`);
        if (el) {
          u.videoTrack?.stop();
          // u.videoTrack?.close();
        }
      });
    });

    await c.join(
      process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
      channel,
      token,
      user.uid
    );

    const [mic, cam] = await Promise.all([
      AgoraRTC?.createMicrophoneAudioTrack(),
      AgoraRTC?.createCameraVideoTrack(),
    ]);
    await c.publish([mic, cam]);
    cam.play(localRef.current!);
  }

  useEffect(() => {
    remoteUsers.forEach((u) => {
      if (playedRef.current[u.uid]) return;
      const box = document.getElementById(`u-${u.uid}`);
      if (box) {
        u.videoTrack?.play(box);
        playedRef.current[u.uid] = true;
      }
    });
  }, [remoteUsers]);

  async function leave() {
    if (client) {
      client.remoteUsers.forEach((u) => {
        u.videoTrack?.stop();
        u.audioTrack?.stop();
      });
      client.localTracks?.forEach((t) => {
        t.stop();
        t.close();
      });
      await client.leave();
    }
    setCallActive(false);
    setRemoteUsers([]);
    playedRef.current = {};
  }

  if (!callActive)
    return (
      <div className="flex flex-col items-center justify-center mt-[20px] gap-6 text-gray-600 max-w-md mx-auto text-center h-[50vh]">
        <p className="font-medium text-sm leading-relaxed">
          Click the button below to start a group video call with your friends.
          After the room is created, you can invite your friends to join.
        </p>
        <button
          onClick={handleStart}
          className="clay-btn bg-blue-600 px-8 py-3.5 text-white font-bold rounded-full transition-all hover:bg-blue-700"
        >
          Start Group Call
        </button>
      </div>
    );

  return (
    <section className="flex flex-col items-center mt-[20px] w-full h-full">
      <div className="flex flex-col gap-[30px] w-full flex-1">
        <div className="relative clay-card overflow-hidden p-2 rounded-2xl bg-white border border-gray-100">
          <div
            ref={localRef}
            className="aspect-video w-full rounded-xl bg-gray-900 overflow-hidden"
          />
          <span className="absolute left-6 top-6 rounded-full bg-blue-600 text-white font-bold px-3 py-1 text-xs shadow-md">
            YOU
          </span>
        </div>

        <section
          className="grid gap-6 w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]"
        >
          {remoteUsers.map((u) => (
            <div key={u.uid} className="relative clay-card overflow-hidden p-2 rounded-2xl bg-white border border-gray-100">
              <div
                id={`u-${u.uid}`}
                className="aspect-video w-full rounded-xl bg-gray-800 overflow-hidden"
              />
              <span className="absolute left-6 top-6 rounded-full bg-gray-700 text-white font-bold px-3 py-1 text-xs shadow-md">
                {u.uid}
              </span>
            </div>
          ))}
        </section>
      </div>

      <div className="sticky bottom-4 mt-8 flex justify-end w-full max-w-6xl z-20 pr-4">
        <button
          onClick={leave}
          className="rounded-full bg-red-500 text-white font-bold px-8 py-3 hover:bg-red-600 shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(239,68,68,0.4)] active:translate-y-1 active:shadow-[inset_0_0_0_rgba(0,0,0,0.2),0_0_0_rgba(239,68,68,0.4)] transition-all"
        >
          Leave Call
        </button>
      </div>
    </section>
  );
}
