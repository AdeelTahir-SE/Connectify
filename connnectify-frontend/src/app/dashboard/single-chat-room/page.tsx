"use client";
import SinglePersonVideoSection from "@/components/single-person-video-section";
import FriendsSecitonSingleRoom from "@/components/friends-section-single-room";
import { getFriendsList } from "@/actions/friends";
import { useState,useEffect } from "react";
import {signallingChannel} from "@/utils/single-video-room";
export default function SingleChat() {
  const [activePerson, setActivePerson] = useState<any>();
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [personLocked,setPersonLocked]=useState(false)
   async function fetchFriends() {
    signallingChannel.emit("register", {
      userId: activePerson?.uid || "unknown",
      username: activePerson?.name || "Unknown User",
    });
      const { data, error } = await getFriendsList();
      if (error) {
        console.error("Error fetching friends:", error);
      }
      if (data) {
        console.log(data)
        setFriendsList(data);
      } else {
        console.warn("No friends found or data is null");
      }
    }
  useEffect(() => {
   
    fetchFriends();
  },[]);
  return (
    <section className="flex flex-row items-center justify-center gap-[30px] w-full h-full bg-slate-950 ">
      
        <FriendsSecitonSingleRoom
          activePerson={activePerson}
          setActivePerson={setActivePerson}
          friends={friendsList}
        />

      <section className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="dashboard-title">`Chat room</h1>

        <SinglePersonVideoSection activePerson={activePerson} />
      </section>
    </section>
  );
}
