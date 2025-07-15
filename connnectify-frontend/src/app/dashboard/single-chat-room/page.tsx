"use client";
import SinglePersonVideoSection from "@/components/single-person-video-section";
import FriendsSecitonSingleRoom from "@/components/friends-section-single-room";
import { getFriendsList } from "@/actions/friends";
import { useState,useEffect } from "react";
import { friend } from "@/utils/types";
export default function SingleChat() {
  const [activePerson, setActivePerson] = useState<friend>();
  const [friendsList, setFriendsList] = useState<friend[]>([]);
  const [personLocked,setPersonLocked]=useState(false)


   async function fetchFriends() {
   
      const { data, error } = await getFriendsList();
      if (error) {
        console.error("Error fetching friends:", error);
      }
      if (data) {
        console.log(data)
        setFriendsList(data as friend[]);
      } else {
        console.warn("No friends found or data is null");
      }
    }
  useEffect(() => {
   
    fetchFriends();
  },[]);
  return (
    <section className="flex flex-row items-center justify-center gap-[10px] w-full h-full bg-slate-950 ">
      
        <FriendsSecitonSingleRoom
          activePerson={activePerson}
          setActivePerson={setActivePerson}
          friends={friendsList}
          personLocked={personLocked}
        />

      <section className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="dashboard-title">Chat room</h1>

        <SinglePersonVideoSection activePerson={activePerson} setPersonLocked={setPersonLocked} />
      </section>
    </section>
  );
}
