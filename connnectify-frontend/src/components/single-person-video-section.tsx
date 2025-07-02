"use client";
import { useState } from "react";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import { JSX } from "react";
export default function SinglePersonVideoSection() {
  const controls = [
    {
      key: "camera",
      activeIcon: <Camera className="w-10 h-10 " />,
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
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-full rounded-4xl bg-gray-900">
      <video
        className="w-full h-full object-cover rounded-4xl"
        autoPlay
        muted
        loop
      />

      <ul className="absolute bottom-4 flex flex-row items-center justify-center gap-4 z-10">
        {controls &&
          controls.map((control) => (
            <ControlButton
              key={control.key}
              activeIcon={control.activeIcon}
              inactiveIcon={control.inactiveIcon}
              activeText={control.activeText}
              inactiveText={control.inactiveText}
            />
          ))}
      </ul>
    </section>
  );
}
export function ControlButton({
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
  console.log(activeIcon, inactiveIcon, activeText, inactiveText);
  const [activeState, setActiveState] = useState(false);

  const toggle = () => {
    setActiveState((prevState) => !prevState);
  };

  return (
    <button
      className="flex flex-col relative items-center justify-center p-6  max-w-[70px] max-h-[70px] rounded-full bg-black group"
      onClick={() => toggle()}
    >
      <p className={`${activeState ? "text-white" : "text-gray-600"}`}>
        {activeState ? activeIcon : inactiveIcon}
      </p>
      <p className="bg-black text-white absolute top-[-40px] text-nowrap rounded-2xl p-2 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
        {activeState ? activeText : inactiveText}
      </p>
    </button>
  );
}
