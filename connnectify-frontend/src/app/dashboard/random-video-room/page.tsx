"use client";

import { useEffect, useState } from "react";
import  { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { signallingChannel } from "@/utils/signaling-channel";
import { useUser } from "@/utils/context";

export default function RandomVideoRoom() {
  const { user } = useUser();
  const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(null);
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

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
    const { default: AgoraRTC } = await import("agora-rtc-sdk-ng");

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
    return () => {signallingChannel.off("matched", onMatched)};
  }, [user?.uid]);

  /* Leave */
  async function leaveCall() {
    if (agoraClient) {
      agoraClient.localTracks?.forEach((t) => {
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
    <section className="flex flex-col items-center gap-6 p-6 w-full min-h-[calc(100vh-80px)] bg-gray-50 text-gray-900 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-blue-400/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[20vw] h-[20vw] rounded-full bg-purple-400/10 blur-3xl pointer-events-none"></div>

      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 drop-shadow-sm z-10">
        Random Person Video Room
      </h2>
      <p className="text-sm text-gray-500 mb-4 z-10 max-w-md text-center">
        Connect instantly with someone new. Just click join and start chatting!
      </p>

      {/* video grid */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl h-full gap-8 z-10">
        <div className="flex-1 w-full relative clay-card overflow-hidden p-2 rounded-2xl bg-white border border-gray-100">
          <div
            id="local-video"
            className="w-full aspect-video bg-gray-900 rounded-xl text-gray-400 flex items-center justify-center text-xl overflow-hidden"
          >
            You
          </div>
          <span className="absolute left-6 top-6 rounded-full bg-blue-600 text-white font-bold px-3 py-1 text-xs shadow-md">
            YOU
          </span>
        </div>
        
        <div className="flex-1 w-full relative clay-card overflow-hidden p-2 rounded-2xl bg-white border border-gray-100">
          <div
            id="remote-video"
            className="w-full aspect-video bg-gray-800 rounded-xl text-gray-400 flex items-center justify-center text-xl overflow-hidden"
          >
            Other&nbsp;Person
          </div>
          <span className="absolute left-6 top-6 rounded-full bg-gray-700 text-white font-bold px-3 py-1 text-xs shadow-md">
            REMOTE
          </span>
        </div>
      </div>

      {/* buttons */}
      <div className="z-10 mt-8 flex justify-end w-full max-w-5xl px-4">
        {!joined ? (
          <button
            onClick={handleJoinRoom}
            disabled={joining}
            className={`w-64 rounded-full py-3.5 text-white font-bold transition-all shadow-md ${
              joining
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 clay-btn"
            }`}
          >
            {joining ? "Connecting…" : "Join Random Call"}
          </button>
        ) : (
          <button
            onClick={leaveCall}
            className="w-64 rounded-full bg-red-500 py-3.5 text-white font-bold hover:bg-red-600 transition-all shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(239,68,68,0.4)] active:translate-y-1 active:shadow-[inset_0_0_0_rgba(0,0,0,0.2),0_0_0_rgba(239,68,68,0.4)]"
          >
            Leave Call
          </button>
        )}
      </div>
    </section>
  );
}
