"use client";
import { useState, useRef, SetStateAction, Dispatch } from "react";
import Image from "next/image";
import {

  VideoOffIcon,
  VideoIcon,
} from "lucide-react";
import { useUser } from "@/utils/context";
import { JSX } from "react";
import { signallingChannel } from "@/utils/single-video-room";
import { friend } from "@/utils/types";
export default function SinglePersonVideoSection({
  activePerson,
  setPersonLocked,
}: {
  activePerson: friend|undefined;
  setPersonLocked: Dispatch<SetStateAction<boolean>>;
}) {
  const {user} = useUser();

  const videoIcon = {
    activeIcon: <VideoIcon className="w-10 h-10 text-cyan-800" />,
    inactiveIcon: <VideoOffIcon className="w-10 h-10 text-red-700" />,
    activeText: "Start Video call",
    inactiveText: "Cancel video call",
  };


  const [callActive, setCallActive] = useState(false);
  const [calling, setCalling] = useState(false);
  const [videoCallButtonState, setVideoCallButtonState] = useState(true);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);

  let mode: "no-person" | "idle" | "calling" | "active";
  if (!activePerson || !activePerson.name) {
    mode = "no-person";
  } else if (callActive) {
    mode = "active";
  } else if (calling) {
    mode = "calling";
  } else {
    mode = "idle";
  }

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-full rounded-4xl bg-gray-900">
      <video
        className="w-full h-full object-cover rounded-4xl  bg-slate-500 absolute z-10"
        autoPlay
        muted
        loop
        ref={remoteRef}
      />

      <video
        ref={localRef}
        className={`w-[250px] h-[280px] object-cover bg-slate-950 rounded-xl absolute bottom-4 right-4 z-20 transition-opacity duration-300 ${
          mode === "calling" || mode === "active"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        autoPlay
        muted
      />

      {(() => {
        switch (mode) {
          case "no-person":
            return (
              <h1 className="text-3xl absolute z-20 text-white text-center">
                Select a person to start Video call
              </h1>
            );
          case "idle":
            return (
              <section className="absolute flex flex-col items-center z-20 gap-[20px] justify-center">
                <Image
                  src={
                    activePerson?.image
                      ? activePerson.image
                      : "/placeholder-user.jpeg"
                  }
                  alt=""
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </section>
            );
          case "calling":
            return (
              <section className="absolute flex flex-col items-center justify-center gap-4 z-20">
                <p className="text-white">Calling...</p>
              </section>
            );
          case "active":
            return (
              <ul className="absolute bottom-4 flex flex-row items-center justify-center gap-4 z-20">
                {/* {controls.map((control) => (
                  <ControlButton
                    key={control.key}
                    activeIcon={control.activeIcon}
                    inactiveIcon={control.inactiveIcon}
                    activeText={control.activeText}
                    inactiveText={control.inactiveText}
                  />
                ))} */}
              </ul>
            );
          default:
            return null;
        }
      })()}
      { mode !== "no-person" && (
      <section className="absolute bottom-4 flex flex-row items-center justify-center gap-4 z-20">
        <VideoCallButton
          state={videoCallButtonState}
          setState={setVideoCallButtonState}
          activeIcon={videoIcon.activeIcon}
          inactiveIcon={videoIcon.inactiveIcon}
          activeText={videoIcon.activeText}
          inactiveText={videoIcon.inactiveText}
          localRef={localRef}
          setCalling={setCalling}
          senderId={user?.uid}
          remoteRef={remoteRef}
          activePerson={activePerson}
          setPersonLocked={setPersonLocked}
          setCallActive={setCallActive}
        />
      </section>)
}
    </section>
  );
}

function VideoCallButton({
  activeIcon,
  inactiveIcon,
  activeText,
  inactiveText,
  localRef,
  state,
  remoteRef,
  setState,
  setCalling,
  setCallActive,
  senderId,
  activePerson,
  setPersonLocked,
}: {
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  activeText: string;
  inactiveText: string;
  localRef: React.RefObject<HTMLVideoElement | null>;
  setCalling: Dispatch<SetStateAction<boolean>>;
  setCallActive: Dispatch<SetStateAction<boolean>>;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  senderId: string|undefined;
  remoteRef: React.RefObject<HTMLVideoElement | null>;
  activePerson: friend|undefined;
  setPersonLocked: Dispatch<SetStateAction<boolean>>;
}) {
  async function toggle() {
    if (state) {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const configure = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            urls: "turn:your.turn.server:3478",
            username: "your-username",
            credential: "your-credential",
          },
        ],
      };

      if (localRef.current) {
        localRef.current.srcObject = mediaStream;
        localRef.current.muted = true;
        localRef.current.autoplay = true;
        localRef.current.addEventListener("loadedmetadata", () => {
          localRef.current?.play();
        });
      }
      setCalling(true);
      setState(false);
      const pc = new RTCPeerConnection(configure);
      mediaStream.getTracks().forEach((track) => {
        console.log("adding tracks to media stream", track);
        pc.addTrack(track, mediaStream);
      });

      pc.addEventListener("track", (event) => {
        console.log("Track event received:", event);
        const stream = event.streams[0];
        if (remoteRef?.current) {
          remoteRef.current.srcObject = stream;
          remoteRef.current.autoplay = true;
          remoteRef.current.muted = true;
          remoteRef.current.controls = true;
          remoteRef.current.onloadedmetadata = async () => {
            try {
              await remoteRef.current?.play();
            } catch (error) {
              console.error("Error playing remote video:", error);
            }
          };
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      signallingChannel.emit("message", {
        senderId: senderId,
        receiverId: activePerson?.uid,
        offer: offer,
      });

      signallingChannel.on("message", async (data: any) => {
        if (data.answer) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          setCallActive(true);
          setCalling(false);
          setPersonLocked(true);

        }
        
        
        
        else if (data.iceCandidate) {
          await pc.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
        } 




        else if (data.callClosed) {
          if (localRef.current) {
            const stream = localRef.current.srcObject as MediaStream;
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
            // Reset the local video element

            localRef.current.srcObject = null;
            localRef.current.pause();
            localRef.current.muted = true;
            localRef.current.autoplay = false;
            localRef.current.controls = false;
          }
          if (remoteRef?.current) {
            const stream = remoteRef.current.srcObject as MediaStream;
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
            // Reset the remote video element
            remoteRef.current.srcObject = null;
            remoteRef.current.pause();
            remoteRef.current.muted = true;
            remoteRef.current.autoplay = false;
            remoteRef.current.controls = false;
          }
          setCallActive(false);
          setCalling(false);
          setPersonLocked(false);
          setState(true)
        }
      });

      pc.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          signallingChannel.emit("message", {
            senderId: senderId,
            receiverId: activePerson?.uid,
            iceCandidate: event.candidate,
          });
        }
      });

      setPersonLocked(true);
      setCallActive(true);
    } else {
      if (localRef.current) {
        const stream = localRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        localRef.current.srcObject = null;
        localRef.current.pause();
        localRef.current.muted = true;
        localRef.current.autoplay = false;
        localRef.current.controls = false;
      }
      if (remoteRef?.current) {
        const stream = remoteRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        remoteRef.current.srcObject = null;
        remoteRef.current.pause();
        remoteRef.current.muted = true;
        remoteRef.current.autoplay = false;
        remoteRef.current.controls = false;
      }
      signallingChannel.emit("message", {
        senderId: senderId,
        receiverId: activePerson?.uid,
        callClosed: true,
      });
      setCallActive(false);
      setCalling(false);
      setPersonLocked(false);
      setState(true);
    }
  }

  return (
    <button
      className="flex flex-col relative items-center justify-center p-6 max-w-[70px] max-h-[70px] rounded-full bg-black group"
      onClick={toggle}
    >
      <span className={`${state ? "text-white" : "text-gray-600"}`}>
        {state ? activeIcon : inactiveIcon}
      </span>
      <span className="bg-black text-white absolute top-[-40px] text-nowrap rounded-2xl p-2 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
        {state ? activeText : inactiveText}
      </span>
    </button>
  );
}
