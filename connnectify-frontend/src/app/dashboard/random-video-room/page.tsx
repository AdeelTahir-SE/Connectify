"use client";

import { useEffect, useState } from "react";
import AgoraRTC, { IAgoraRTCClient, IRemoteUser } from "agora-rtc-sdk-ng";
import { signallingChannel } from "@/utils/single-video-room";
import { useUser } from "@/utils/context";

export default function RandomVideoRoom() {
  const { user } = useUser();
  const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(null);
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  /* Join lobby */
  async function handleJoinRoom() {
    if (!user?.uid || joining) return;
    document.getElementById("remote-video")!.innerHTML = "Waiting…";
    document.getElementById("local-video")!.innerHTML = "";

    setJoining(true);
    signallingChannel.emit("join-random-lobby", { uid: user.uid });
  }

  /* Matched handler */
  useEffect(() => {
    if (!user?.uid) return;

    const onMatched = async ({ channel }: { channel: string }) => {
      const uid = user.uid.toString();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/agora/token?channelName=${channel}&uid=${uid}`
      );
      const { token } = await res.json();

      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setAgoraClient(client);

      await client.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
        channel,
        token,
        uid
      );

      client.on("user-published", async (remote, mediaType) => {
        await client.subscribe(remote, mediaType);
        document.getElementById("remote-video")!.innerHTML = "";

        if (mediaType === "video") remote.videoTrack?.play("remote-video");
        else if (mediaType === "audio") remote.audioTrack?.play();
      });

      client.on("user-unpublished", () => {
        document.getElementById("remote-video")!.innerHTML = "Left";
      });

      const [mic, cam] = await Promise.all([
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
      ]);
      await client.publish([mic, cam]);
      cam.play("local-video");

      setJoined(true);
      setJoining(false);
    };

    signallingChannel.on("matched", onMatched);
    return () => signallingChannel.off("matched", onMatched);
  }, [user?.uid]);

  /* Leave */
  async function leaveCall() {
    if (agoraClient) {
      agoraClient.localTracks?.forEach((t: any) => {
        t.stop(); t.close();
      });
      agoraClient.remoteUsers.forEach((u) => {
        u.videoTrack?.stop(); u.audioTrack?.stop();
      });
      await agoraClient.leave();
    }
    setAgoraClient(null);
    setJoined(false);
    setJoining(false);
    document.getElementById("local-video")!.innerHTML = "You";
    document.getElementById("remote-video")!.innerHTML = "Other Person";
  }

  /* UI */
  return (
    <section className="flex flex-col items-center gap-4 p-4 w-full h-full">
      <h2 className="dashboard-title">
        Random Person Video Room
      </h2>

      {/* video grid */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full  h-full gap-4">
        <div
          id="local-video"
          className="flex-1 aspect-video bg-black rounded-lg text-white flex items-center justify-center text-xl"
        >
          You
        </div>
        <div
          id="remote-video"
          className="flex-1 aspect-video bg-slate-700 rounded-lg text-white flex items-center justify-center text-xl"
        >
          Other&nbsp;Person
        </div>
      </div>

      {/* buttons */}
      {!joined ? (
        <button
          onClick={handleJoinRoom}
          disabled={joining}
          className={`mt-4 w-52 rounded py-2 text-white transition ${
            joining
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {joining ? "Connecting…" : "Join Random Call"}
        </button>
      ) : (
        <button
          onClick={leaveCall}
          className="mt-4 w-52 rounded bg-rose-600 py-2 text-white hover:bg-rose-700 transition"
        >
          Leave Call
        </button>
      )}
    </section>
  );
}
