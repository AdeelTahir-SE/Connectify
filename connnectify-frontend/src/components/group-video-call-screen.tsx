"use client";

import { useEffect, useRef, useState } from "react";
import { IAgoraRTCClient, IRemoteUser } from "agora-rtc-sdk-ng";
import { useUser } from "@/utils/context";

export default function GroupVideoCallScreen({
  channelName,
  onLeave,
}: {
  channelName: string;
  onLeave: () => void;
}) {
  const { user } = useUser();
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IRemoteUser[]>([]);
  const localBox = useRef<HTMLDivElement>(null);
  const playedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const { default: AgoraRTC } = await import("agora-rtc-sdk-ng");
      const c = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setClient(c);

      // Get Agora token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/agora/token?channelName=${channelName}&uid=${user?.uid}`
      );
      const { token } = await res.json();

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

        // audio still plays directly
        if (mediaType === "audio") u.audioTrack?.play();
      });

      c.on("user-unpublished", (u) => {
        setRemoteUsers((prev) => prev.filter((x) => x.uid !== u.uid));
        playedRef.current[u.uid] = false; // reset so can replay if they return
      });

      await c.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
        channelName,
        token,
        user?.uid
      );

      // Publish local tracks
      const [mic, cam] = await Promise.all([
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
      ]);
      await c.publish([mic, cam]);
      cam.play(localBox.current!);

      c.remoteUsers.forEach(async (user) => {
        if (user.hasVideo) {
          await c.subscribe(user, "video");
          user.videoTrack?.play(`u-${user.uid}`);
        }
        if (user.hasAudio) {
          await c.subscribe(user, "audio");
          user.audioTrack?.play();
        }
      });
    })();
  }, [channelName, user?.uid]);

  // 🧠 Play video tracks once container exists
  useEffect(() => {
    remoteUsers.forEach((u) => {
      if (playedRef.current[u.uid]) return;
      const el = document.getElementById(`u-${u.uid}`);
      if (el) {
        u.videoTrack?.play(el);
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
        client.removeAllListeners();
        playedRef.current = {};
      await client.leave();
      alert("Left the call");

    }
    onLeave();
  }

  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center bg-[#0f172a] text-white animate-fadeIn">
      <div
        className="mt-6 grid w-full max-w-6xl gap-4 px-4
        grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]"
      >
        {/* Local Video */}
        <div className="relative">
          <div
            ref={localBox}
            className="aspect-video w-full rounded-lg bg-black shadow-inner"
          />
          <span className="absolute left-2 top-2 rounded bg-emerald-600 px-2 text-xs">
            YOU
          </span>
        </div>

        {/* Remote Users */}
        {remoteUsers.map((u) => (
          <div key={u.uid} className="relative">
            <div
              id={`u-${u.uid}`}
              className="aspect-video w-full rounded-lg min-w-80 bg-gray-800 shadow"
            />
            <span className="absolute left-2 top-2 rounded bg-gray-700/60 px-2 text-xs">
              {u.uid}
            </span>
          </div>
        ))}
      </div>

      {/* Leave Button */}
      <div className="fixed bottom-6 flex gap-4 rounded-full bg-gray-800/70 px-6 py-3 backdrop-blur">
        <button
          onClick={leave}
          className="rounded-full bg-rose-600 px-6 py-2 text-sm font-semibold hover:bg-rose-700 transition"
        >
          Leave Call
        </button>
      </div>
    </section>
  );
}
