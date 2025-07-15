"use client";

import { useEffect, useState } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IRemoteUser,
} from "agora-rtc-sdk-ng";
import { signallingChannel } from "@/utils/single-video-room";
import { useUser } from "@/utils/context";

export default function RandomVideoRoom() {
  const {user} = useUser();

  const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(null);
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);      // 🚫 double‑click guard

  async function handleJoinRoom() {
    if (!user?.uid || joining) return;
    document.getElementById("remote-video")!.innerHTML = "Waiting for someone to join...";
    document.getElementById("local-video")!.innerHTML = "";

    setJoining(true);
    signallingChannel.emit("join-random-lobby", { uid: user.uid });
  }

  useEffect(() => {
    if (!user?.uid) return;

    const onMatched = async ({ channel }: { channel: string }) => {
      const uid = user.uid.toString();

      // fetch token
      const res = await fetch(
        `http://localhost:3001/agora/token?channelName=${channel}&uid=${uid}`
      );
      const { token } = await res.json();

      // init & JOIN before any remote track can publish
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setAgoraClient(client);

      await client.join(
        "d466703c8fe64d94a4dd6c0fa46d9d7b",
        channel,
        token,
        uid
      );

      /* Attach remote listeners ONCE, right after join */
      client.on("user-published", async (remoteUser: IRemoteUser, mediaType) => {
        await client.subscribe(remoteUser, mediaType);
            document.getElementById("remote-video")!.innerHTML = "";


        if (mediaType === "video") {
          remoteUser.videoTrack?.play("remote-video");
        } else if (mediaType === "audio") {
          remoteUser.audioTrack?.play();
        }
      });

      client.on("user-unpublished", () => {
        (document.getElementById("remote-video") ?? {}).innerHTML = "";
      });

      /* local tracks */
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
    return () => {
      signallingChannel.off("matched", onMatched);
    };
  }, [user?.uid]);

  /* 3️⃣  Leave call */
  async function leaveCall() {
    if (!agoraClient) return;

    agoraClient.localTracks?.forEach((track: any) => {
      track.stop();
      track.close();
    });
    agoraClient.remoteUsers.forEach((u) => {
      u.videoTrack?.stop();
      u.audioTrack?.stop();
    });
    await agoraClient.leave();

    setAgoraClient(null);
    setJoined(false);
    setJoining(false);
    (document.getElementById("local-video") ?? {}).innerHTML = "You";
    (document.getElementById("remote-video") ?? {}).innerHTML = "Other Person";
  }

  /* UI */
  return (
    <section className="flex flex-col items-center gap-4 p-4 w-full h-full">
      <h2 className="text-4xl text-white font-semibold">Random Video Room</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4  w-full h-full">
        <div id="local-video" className="w-1/2 h-full bg-black rounded text-center text-4xl text-white flex flex-col items-center justify-center" >You</div>
        <div id="remote-video" className="w-1/2 h-full bg-slate-700 rounded text-center text-4xl text-white flex flex-col items-center justify-center" >Other Person</div>
      </div>

      {!joined ? (
        <button
          onClick={handleJoinRoom}
          disabled={joining}
          className={`px-5 py-2 rounded text-white transition ${
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
          className="bg-red-600 px-5 py-2 text-white rounded hover:bg-red-700"
        >
          Leave Call
        </button>
      )}
    </section>
  );
}
