"use client";

import {
  createClient,
  createMicrophoneAudioTrack,
  createCameraVideoTrack,
  IAgoraRTCClient,
  IRemoteUser,
} from "agora-rtc-sdk-ng";
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
  const [remoteUsers, setRemoteUsers] = useState<IRemoteUser[]>([]);
  const localRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef<Record<string, boolean>>({});

  async function handleStart() {
    if (!user?.uid) return;
    setCallActive(true);

    const c = createClient({ mode: "rtc", codec: "vp8" });
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

    
    c.on("user-unpublished", (u) =>{
      alert("User left the call");
      setRemoteUsers((prev) => prev.filter((x) => x.uid !== u.uid))
      playedRef.current[u.uid] = false; // reset so can replay if they return
      remoteUsers.forEach((u) => {
        const el = document.getElementById(`u-${u.uid}`);
        if (el) {
          u.videoTrack?.stop();
          u.videoTrack?.close();
        }
      })
    }
    );

    await c.join(process.env.NEXT_PUBLIC_AGORA_APP_ID, channel, token, user.uid);

    const [mic, cam] = await Promise.all([
      createMicrophoneAudioTrack(),
      createCameraVideoTrack(),
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
      client.localTracks?.forEach((t: any) => {
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
      <div className="flex  flex-col items-center justify-center  mt-[20px]  gap-[20px] ">

        <p className="font-semibold text-center ">
          Click the button below to start a group video call with your friends.
          After clicking room will be created then select friends whom you want to invite in room

        </p>
        <button
          onClick={handleStart}
          className="rounded bg-indigo-600 px-6 py-3 hover:bg-indigo-700"
        >
          Start Group Call
        </button>
      </div>
    );

  return (
    <section className="flex flex-col items-center mt-[20px] ">
      <div
        className="flex flex-col gap-[30px]   w-full"
      >


        <div className="relative">
          <div
            ref={localRef}
            className="aspect-video w-full rounded bg-black"
          />
          <span className="absolute left-2 top-2 rounded bg-emerald-600 px-2 text-xs">
            YOU
          </span>
        </div>

         <section className="grid gap-4 w-full max-w-6xl
          grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        {remoteUsers.map((u) => (
          <div key={u.uid} className="relative">
            <div
              id={`u-${u.uid}`}
              className="aspect-video w-full rounded bg-gray-800"
            />
            <span className="absolute left-2 top-2 rounded bg-gray-700/70 px-2 text-xs">
              {u.uid}
            </span>
          </div>
        ))}
        </section>
      </div>

      <button
        onClick={leave}
        className="mt-6 rounded bg-rose-600 px-6 py-2 hover:bg-rose-700"
      >
        Leave Call
      </button>
    </section>
  );
}
