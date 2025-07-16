/* components/multi-person-friends-section.tsx */
"use client";

import React, { Dispatch } from "react";
import Image from "next/image";
import {Person} from "@/utils/types";


interface Props {
  friends: Person[];
  requestedPeople: Person[];
  setRequestedPeople: Dispatch<React.SetStateAction<Person[]>>;
  activePeople: Person[];
  setActivePeople: (people: Person[]) => void;
  callActive: boolean;
}

export default function MultiPersonFriendsSection({
  friends,
  requestedPeople,
  setRequestedPeople,
  activePeople,
  callActive,
}: Props) {
  const handleToggle = (person: Person) => {
    setRequestedPeople((prev: Person[]) =>
      prev.find((p) => p.uid === person.uid)
        ? prev.filter((p) => p.uid !== person.uid)
        : [...prev, person]
    );
  };

  const isRequested = (uid: string) =>
    requestedPeople.some((p) => p.uid === uid);

  const isActive = (uid: string) =>
    activePeople.some((p) => p.uid === uid);

  return (
    <section className="w-full max-w-fit p-4 flex flex-col gap-4  border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">Friends List</h2>

      {friends.map((friend) => {
        const selected = isRequested(friend.uid);

        return (
          <div
            key={friend.uid}
            onClick={() => callActive && handleToggle(friend)}
            className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer
              ${
       
                  selected
                  ? "bg-green-700 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              }`}
          >
            <Image
              src={friend.image || "/placeholder-user.jpeg"}
              alt={friend.name || friend.uid}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="">{friend.name?.substring(0,13) }...</span>

            {callActive && isActive(friend.uid) && (
              <span className="text-xs text-green-400">In Call</span>
            )}
            {!callActive && selected && (
              <span className="text-xs text-green-300">Selected</span>
            )}
          </div>
        );
      })}
    </section>
  );
}
