"use client";

import Image from "next/image";
import { Suspense } from "react";
import { Camera } from "lucide-react";
import DashboardFriendsSectionSkeleton from "@/components/dashboard-friends-section-skeleton";
import DashboardFriendsSection from "@/components/dashboard-friends-section";
import * as motion from "motion/react-client";
import { addFriendDashboard } from "@/actions/friends";
import { useRef } from "react";
import { useUser } from "@/utils/context";
export default function DashboardClient({ friends }: { friends: any[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const user=useUser()
  console.log(user)

  return (
    <section className="flex flex-col items-center justify-start w-full min-h-screen p-6 gap-16">
      <h1 className="text-4xl font-bold text-white">Dashboard</h1>

      <section className="flex flex-col md:flex-row items-start justify-start w-full gap-8">
        {/* Profile */}
        <section className="flex flex-col items-center justify-center gap-4">
          <section className="relative flex max-w-[200px] max-h-[200px] overflow-hidden rounded-xl">
            <Image
              src={(user?.image)?user?.image:"/placeholder-user.jpeg"}
              alt="Dashboard Image"
              width={200}
              height={200}
              className="object-cover"
            />
            <motion.section
              className="absolute inset-0 flex flex-col items-center justify-center bg-black"
              whileHover={{ opacity: 0.4 }}
              initial={{ opacity: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="w-8 h-8 text-white" />
            </motion.section>
          </section>
          <section className="flex flex-col items-center gap-1">
            <h2 className="text-lg font-bold text-white">{user?.name}</h2>
            <p className="text-sm text-gray-400 break-all">
              {user?.uid}
            </p>
          </section>
          <section className="flex flex-col gap-2 p-4 border border-gray-700 rounded-lg w-full bg-gray-800">
            <h2 className="text-xl font-semibold text-white">Tier Details</h2>
            <div className="flex flex-col gap-1 text-gray-300">
              <p>Tier: <span className="text-white">{user?.tier}</span></p>
              <p>Date of Purchase: <span className="text-white">{user?.dateOfPurchase}</span></p>
              <p>Days remaining: <span className="text-white">{user?.daysRemaining}</span></p>
            </div>
          </section>
        </section>

        {/* Friends */}
        <section className="flex flex-col items-start justify-start gap-6 w-full max-w-2xl">
          <section className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg w-full bg-gray-800 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-white">Friends</h2>
            <Suspense fallback={<DashboardFriendsSectionSkeleton count={3} />}>
              <DashboardFriendsSection friendsList={friends} />
            </Suspense>

            <form
              className="flex w-full gap-2 mt-2"
              onSubmit={async (e) => {
                e.preventDefault();
                if (inputRef.current) {
                  await addFriendDashboard(inputRef.current.value);
                  inputRef.current.value = "";
                }
              }}
            >
              <input
                ref={inputRef}
                type="text"
                id="addFriend"
                placeholder="Add friend..."
                className="flex-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded hover:bg-cyan-700"
              >
                Add
              </button>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}
