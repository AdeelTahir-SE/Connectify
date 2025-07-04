"use client";
import SinglePersonVideoSection from "@/components/single-person-video-section";
import FriendsSecitonSingleRoom from "@/components/firneds-section-single-rrom";
import { getFriendsList } from "@/actions/friends";
import { useState } from "react";
export default function SingleChat() {
  const [activePerson, setActivePerson] = useState<any>();
  const friends=getFriendsList()
  return (
    <section className="flex flex-row items-center justify-center gap-[30px] w-full h-full bg-slate-950 ">
      
        <FriendsSecitonSingleRoom
          activePerson={activePerson}
          setActivePerson={setActivePerson}
          friendsList={friends}
        />

      <section className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="dashboard-title">`Chat room</h1>

        <SinglePersonVideoSection activePerson={activePerson} />
      </section>
    </section>
  );
}
