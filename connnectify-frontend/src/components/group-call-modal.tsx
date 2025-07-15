"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signallingChannel } from "@/utils/single-video-room";
import { useUser } from "@/utils/context";
import { getUserData } from "@/db/users";
import GroupVideoCallScreen from "./group-video-call-screen";
import type { User } from "@/utils/types";

export default function GroupCallModal({
  data,
  onClose,
}: {
  data: { sender: string; channel: string; requestedPeople: any[] };
  onClose: () => void;
}) {
  const { user } = useUser();
  const [inCall, setInCall] = useState(false);
  const [sender, setSender] = useState<User | null>(null);

  /* fetch sender each time a new call arrives */
  useEffect(() => {
    let mounted = true;
    async function fetchSender() {
      if (!data?.sender) return;
      const { data: senderData } = await getUserData(data.sender);
      if (mounted) setSender(senderData as User ?? null);
    }
    fetchSender();
    return () => {
      mounted = false;
    };
  }, [data.sender]);

  // Wait for sender info to render prettier modal
  if (!sender)
    return null;

  /* ––– switch to full call screen after Accept ––– */
  if (inCall) {
    return (
      <GroupVideoCallScreen
        channelName={data.channel}
        onLeave={() => {
          setInCall(false);
          onClose();
        }}
      />
    );
  }

  /* ––– Modal UI ––– */
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[400px] rounded-2xl border border-cyan-700 bg-[#0f172a] p-6 shadow-2xl">
        {/* close */}
        <button
          onClick={() => {
            signallingChannel.emit("group-call-reject", {
              sender: data.sender,
              requestedPeople: data.requestedPeople,
            });
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        {/* avatar */}
        <Image
          src={sender.image || "/placeholder-user.jpeg"}
          alt="Caller"
          width={100}
          height={100}
          className="mx-auto mb-4 rounded-full border border-gray-700 object-cover"
        />

        <h2 className="mb-1 text-center text-xl font-semibold text-gray-100">
          Incoming group call
        </h2>
        <p className="mb-4 text-center text-sm text-gray-400">
          From <strong>{sender.name ?? sender.uid}</strong>
        </p>

        {/* invited list */}
        {data.requestedPeople?.length > 0 && (
          <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-gray-400 max-h-32 overflow-y-auto">
            {data.requestedPeople.map((p) => (
              <li key={p.uid}>{p.name ?? p.uid}</li>
            ))}
          </ul>
        )}

        {/* actions */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              signallingChannel.emit("group-call-accept", {
                requestedPeople: data.requestedPeople,
                acceptor: user,
                sender: data.sender,
              });
              setInCall(true);
            }}
            className="flex-1 rounded-lg bg-emerald-600 py-2 text-white hover:bg-emerald-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => {
              signallingChannel.emit("group-call-reject", {
                requestedPeople: data.requestedPeople,
                rejector: user,
                sender: data.sender,
              });
              onClose();
            }}
            className="flex-1 rounded-lg bg-rose-600 py-2 text-white hover:bg-rose-700 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </section>
  );
}
