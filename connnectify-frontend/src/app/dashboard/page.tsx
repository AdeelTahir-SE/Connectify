import Image from "next/image";
import { Suspense } from "react";
import { Camera } from "lucide-react";
import DashboardFriendsSectionSkeleton from "@/components/dashboard-friends-section-skeleton";
import DashboardFriendsSection from "@/components/dashboard-friends-section";
import * as motion from "motion/react-client";
export default function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full ">
      <h1 className="dashboard-title ">Dashboard</h1>
      <section className="flex flex-row items-center justify-start w-full h-full ">
        <section className="flex flex-col items-center justify-center gap-[20px]">
          <section className="relative flex flex-col  max-w-[200px] max-h-[200px] overflow-hidden rounded-xl">
            <Image
              src="/erasebg-transformed.webp"
              alt="Dashboard Image"
              width={200}
              height={200}
              
            />
            <motion.section
              className="absolute  w-[200px] h-[200px] flex flex-col items-center justify-center bg-gray-700"
              whileHover={{ opacity: 0.5 }}
              initial={{ opacity: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-[40px] h-[40px]" />
            </motion.section>
          </section>
          <section className="flex flex-col items-center justify-center gap-[10px]">
            <h2 className="text-white font-bold">Adeel Tahir</h2>
            <h2 className="text-white font-semibold">userid:1jndnf913h41reass</h2>
          </section>
        </section>

        <section className="flex flex-col items-center justify-center gap-[20px] ">
      <h1>Tier Details</h1>
      <section className="flex flex-col items-center justify-center gap-[10px]">
        <h2>Tier 1</h2>
        <h3>Day bought:19/11/25</h3>
        <h3>Days remaining</h3>
      </section>
        <section className="flex flex-col items-center justify-center gap-[20px] pt-3 rounded-xl border-2 max-h-[400px] overflow-y-scroll">
            <h1 className=" text-white text-4xl font-semibold">Friends</h1>
            <Suspense fallback={<DashboardFriendsSectionSkeleton count={3}/>}>
           {/* <DashboardFriendsSection/> */}
           </Suspense>
           <form>
            <label htmlFor="addFrient">
              <input type="text" id="addFrient" />
            </label>
           </form>

                              
        </section>
      </section>
    </section>
    </section>
  );
}
