"use client";
import { useState, useRef, SetStateAction, Dispatch } from "react";
import Image from "next/image";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  VideoOffIcon,
  VideoIcon,
} from "lucide-react";
import { JSX } from "react";

export default function SinglePersonVideoSection({
  activePerson,
}: {
  activePerson: any;
}) {
  const videoIcon = {
    activeIcon: <VideoIcon className="w-10 h-10 text-cyan-800" />,
    inactiveIcon: <VideoOffIcon className="w-10 h-10 text-red-700" />,
    activeText: "Start Video call",
    inactiveText: "Cancel video call",
  };

  const controls = [
    {
      key: "camera",
      activeIcon: <Camera className="w-10 h-10" />,
      inactiveIcon: <CameraOff className="w-10 h-10" />,
      activeText: "Camera On",
      inactiveText: "Camera Off",
    },
    {
      key: "microphone",
      activeIcon: <Mic className="w-10 h-10" />,
      inactiveIcon: <MicOff className="w-10 h-10" />,
      activeText: "Microphone On",
      inactiveText: "Microphone Off",
    },
  ];

  const [callActive, setCallActive] = useState(false);
  const [calling, setCalling] = useState(false);
  const [videoCallButtonState, setVideoCallButtonState] = useState(true);
  const localRef = useRef<HTMLVideoElement | null>(null);

  // Compute display mode
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
      {/* Background video */}
      <video
        className="w-full h-full object-cover rounded-4xl bg-green-800 absolute z-10"
        autoPlay
        muted
        loop
      />

      <video
        ref={localRef}
        className={`w-[250px] h-[280px] object-cover bg-slate-950 rounded-xl absolute bottom-4 right-4 z-20 transition-opacity duration-300 ${
          mode === "calling" || mode === "active" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        autoPlay
        muted
      />

      {/* Switch content */}
      {(() => {
        switch (mode) {
          case "no-person":
            return (
              <h1 className="text-3xl absolute z-20 text-white">
                Select a person to start Video call
              </h1>
            );
          case "idle":
            return (
              <section className="absolute flex flex-col items-center z-20 gap-[20px] justify-center">
                <Image
                  src={activePerson.image}
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
                {controls.map((control) => (
                  <ControlButton
                    key={control.key}
                    activeIcon={control.activeIcon}
                    inactiveIcon={control.inactiveIcon}
                    activeText={control.activeText}
                    inactiveText={control.inactiveText}
                  />
                ))}
                <VideoCallButton
            state={videoCallButtonState}
            setState={setVideoCallButtonState}
            activeIcon={videoIcon.activeIcon}
            inactiveIcon={videoIcon.inactiveIcon}
            activeText={videoIcon.activeText}
            inactiveText={videoIcon.inactiveText}
            localRef={localRef}
            setCalling={setCalling}
            setCallActive={setCallActive}
          />
              </ul>
            );
          default:
            return null;
        }
      })()}

      {mode !== "no-person"&&mode!=="active" && (
        <section className="absolute bottom-4  z-20">
          <VideoCallButton
            state={videoCallButtonState}
            setState={setVideoCallButtonState}
            activeIcon={videoIcon.activeIcon}
            inactiveIcon={videoIcon.inactiveIcon}
            activeText={videoIcon.activeText}
            inactiveText={videoIcon.inactiveText}
            localRef={localRef}
            setCalling={setCalling}
            setCallActive={setCallActive}
          />
        </section>
      )}
    </section>
  );
}

function ControlButton({
  activeIcon,
  inactiveIcon,
  activeText,
  inactiveText,
}: {
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  activeText: string;
  inactiveText: string;
}) {
  const [activeState, setActiveState] = useState(false);

  const toggle = () => {
    setActiveState((prev) => !prev);
  };

  return (
    <button
      className="flex flex-col relative items-center justify-center p-6 max-w-[70px] max-h-[70px] rounded-full bg-black group"
      onClick={toggle}
    >
      <span className={`${activeState ? "text-white" : "text-gray-600"}`}>
        {activeState ? activeIcon : inactiveIcon}
      </span>
      <span className="bg-black text-white absolute top-[-40px] text-nowrap rounded-2xl p-2 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
        {activeState ? activeText : inactiveText}
      </span>
    </button>
  );
}

function VideoCallButton({
  activeIcon,
  inactiveIcon,
  activeText,
  inactiveText,
  localRef,
  state,
  setState,
  setCalling,
  setCallActive,
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
}) {
  const toggle = async () => {
    if (state) {
      alert("calling");
      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localRef?.current) {
        localRef.current.srcObject = userMedia;
      }
      setCalling(true);
    } else {
      alert("cancelling");
      if (localRef?.current) {
        const stream = localRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        localRef.current.srcObject = null;
      }
      setCalling(false);
    }
    setState((prev) => !prev);
  };

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
