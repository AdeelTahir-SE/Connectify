"use client";
import SideBar from "@/components/side-bar";
import ReceiveCallModal from "@/components/receiveCallModal";
import { signalingEmitter } from "@/utils/event-emitter";
import { useState, useEffect } from "react";
import IncomingCallPersonVideoSection from "@/components/IncomingCallVideoSection";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showReceiveCallModal, setShowReceiveCallModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [modalData, setModalData] = useState<null | {
    senderId: string;
    receiverId: string;
    offer: RTCSessionDescriptionInit;
  }>(null);
  useEffect(() => {
    const handleReceiveCall = (data: {
      senderId: string;
      receiverId: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      alert(data.senderId + " is calling you");
      setShowReceiveCallModal(true);
      setModalData(data);
      alert("called by " + data.senderId);
    };

    signalingEmitter.on("offerReceived", handleReceiveCall);
    signalingEmitter.on("videoModal", () => {
      setVideoModal(true);
    });

    return () => {
      signalingEmitter.off("offerReceived", handleReceiveCall);
      signalingEmitter.off("videoModal", () => {
        setVideoModal(false);
      });
    };
  }, []);
  return (
    <section className="flex flex-row items-center justify-center h-screen ">
      <section className="flex flex-col items-center justify-center h-full sticky-left-0">
        <SideBar />
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full bg-slate-950 p-8">
        {showReceiveCallModal && (
          <ReceiveCallModal
            onClose={() => {
              setShowReceiveCallModal(false);
              signalingEmitter.emit("callRejected");
            }}
            senderId={modalData.senderId}
          />
        )}
        {videoModal && (
          <IncomingCallPersonVideoSection
            onClose={() => {
              setVideoModal(false);
              signalingEmitter.emit("closeVideoCall");
            }}
          />
        )}
        {children}
      </section>
    </section>
  );
}
