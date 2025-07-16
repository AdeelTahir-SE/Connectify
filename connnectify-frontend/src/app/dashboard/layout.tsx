"use client";
import SideBar from "@/components/side-bar";
import ReceiveCallModal from "@/components/receiveCallModal";
import { signalingEmitter } from "@/utils/event-emitter";
import { useState, useEffect } from "react";
import IncomingCallPersonVideoSection from "@/components/IncomingCallVideoSection";
import GroupCallModal from "@/components/group-call-modal";
import { signallingChannel } from "@/utils/signaling-channel";
import { useUser } from "@/utils/context";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showReceiveCallModal, setShowReceiveCallModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [groupCallModal, setGroupCallModal] = useState(false);
  const { user } = useUser();
  const [groupCallModalData, setGroupCallMdalData] = useState({
    sender: "",
    channel: "",
    requestedPeople: [],
  });
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
      setShowReceiveCallModal(true);
      setModalData(data);
    };
    signallingChannel.emit("register", {
      userId: user?.uid || "unknown",
      username: user?.name || "Unknown User",
    });

    signalingEmitter.on("offerReceived", handleReceiveCall);
    signalingEmitter.on("videoModal", (data) => {
      console.log("Video modal data:", data);
      setVideoModal(data);
    });

    signalingEmitter.on("group-call-join", (data) => {
      setGroupCallModal(true);
      setGroupCallMdalData(data);
    });

    return () => {
      signalingEmitter.off("offerReceived", handleReceiveCall);
      signalingEmitter.off("videoModal", () => {
        setVideoModal(false);
      });
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center md:h-screen ">
      <section className="flex flex-col items-center justify-center h-full md:w-fit w-full md:sticky-left-0">
        <SideBar />
      </section>
      <section className="flex flex-col items-center justify-center w-full h-full bg-slate-950 p-8">
        {showReceiveCallModal && (
          <ReceiveCallModal
            onClose={() => {
              setShowReceiveCallModal(false);
            }}
            senderId={modalData?.senderId}
          />
        )}
        {videoModal && (
          <IncomingCallPersonVideoSection
            onClose={() => {
              signalingEmitter.emit("closeVideoCall");
            }}
          />
        )}

        {groupCallModal && (
          <GroupCallModal
            data={groupCallModalData}
            onClose={() => {
              setGroupCallModal(false);
            }}
          />
        )}
        {children}
      </section>
    </section>
  );
}
