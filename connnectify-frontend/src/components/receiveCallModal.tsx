"use client";
import Image from "next/image";
import { signalingEmitter } from "@/utils/event-emitter";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { getUserData } from "@/db/users";
import { User } from "@/utils/types";

export default function ReceiveCallModal({
  senderId,
  onClose,
}: {
  senderId: string | undefined;
  onClose: () => void;
}) {
  const [userData, setUserData] = useState<User>({
    uid: "",
    name: "",
    email: "",
    image: "",
    role: "user",
    tier: "normal",
    daysRemaining: "Infinity",
    dateOfPurchase: "",
    createdAt: Date.now(),
  });

  useEffect(() => {
    async function fetchUser() {
      if (!senderId) return;
      const { data } = await getUserData(senderId);
      if (data) setUserData(data as User);
    }
    fetchUser();
  }, [senderId]);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <div className="relative w-[350px] flex flex-col items-center justify-center rounded-2xl border border-purple-700 bg-[#0f172a] p-6 shadow-2xl">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
          >
            ✕
          </button>

          {/* Avatar */}
          <Image
            src={userData.image || "/placeholder-user.jpeg"}
            alt="Caller"
            width={100}
            height={100}
            className="mb-4 rounded-full border border-gray-700 object-cover"
          />

          {/* Name + caption */}
          <h1 className="text-xl font-semibold text-gray-100">
            {userData.name || "Incoming call"}
          </h1>
          <p className="mt-1 text-sm text-gray-400">Incoming call…</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => {
                signalingEmitter.emit("offerAccepted");
                onClose();
              }}
              className="flex-1 rounded-lg p-4 bg-emerald-600 py-2 text-white hover:bg-emerald-700 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => {
                signalingEmitter.emit("closeVideoCall");
                onClose();
              }}
              className="flex-1 rounded-lg bg-rose-600 py-2 p-4 text-white hover:bg-rose-700 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
