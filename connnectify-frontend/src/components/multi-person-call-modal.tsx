"use client";
import Image from "next/image";
import { signalingEmitter } from "@/utils/event-emitter";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { getUserData } from "@/db/users";
import {User} from "@/utils/types";
export default function MultiPersonCallModal({
  senderId,
  onClose,
}: {
  senderId: string|undefined;
  onClose: () => void;
}) {
  console.log("MultiPersonCallModal rendered with senderId:", senderId);

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

  async function fetchUserData(senderId: string| undefined) {
    if (!senderId) {
      console.warn("No senderId provided to fetchUserData");
      return;
    }
    const { data, error } = await getUserData(senderId);
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      if(data){
      setUserData(data as User);
      }
    }
  }

  useEffect(() => {
    fetchUserData(senderId);
  }, [senderId]);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      >
        <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl p-6 w-[350px] shadow-2xl border border-purple-400">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            onClick={onClose}
          >
            ✕
          </button>

          <Image
            src={userData?.image || "/placeholder-user.jpeg"}
            alt="Caller"
            width={100}
            height={100}
            className="rounded-full mb-4 border border-gray-300"
          />

          <h1 className="text-xl font-semibold text-gray-800">
            {userData?.name || "Incoming call"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Incoming group call...</p>

          <div className="flex flex-row gap-4 mt-6">
            <button
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => {
                signalingEmitter.emit("groupCallAccepted");
                onClose();
              }}
            >
              Accept
            </button>
            <button
              className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => {
                signalingEmitter.emit("groupCallRejected");
                onClose();
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
