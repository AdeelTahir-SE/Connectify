"use client";

import { useEffect, useState } from "react";
import MultiPersonFriendsSection from "@/components/multi-person-friends-section";
import MultiPersonVideoSection from "@/components/multi-person-video-section";
import { getFriends } from "@/db/friends";
import { useUser } from "@/utils/context";
import { signallingChannel } from "@/utils/single-video-room";

export default function MultiPersonChatRoom() {
  const { user } = useUser();

  const [friendsList,       setFriendsList]       = useState<any[]>([]);
  const [activePeople,      setActivePeople]      = useState<any[]>([]);
  const [requestedPeople,   setRequestedPeople]   = useState<any[]>([]);
  const [callActive,        setCallActive]        = useState(false);
  const [channel,           setChannel]           = useState("");
  const [token,             setToken]             = useState("");

  /* ––– Load friends + socket listeners ––– */
  useEffect(() => {
    (async () => {
      const { data } = await getFriends(user?.uid);
      if (data) setFriendsList(data);
    })();

    signallingChannel.on("group-call-join", ({ acceptor }) =>
      setActivePeople((prev) => [...prev, ...acceptor])
    );

    signallingChannel.on("group-call-accept", ({ acceptor }) =>
      setActivePeople((prev) => prev.filter((p) => p.uid !== acceptor.uid))
    );
    return () => {
      signallingChannel.off("group-call-join");
      signallingChannel.off("group-call-accept");
    }
  }, [user?.uid]);

  return (
    <section className="flex h-screen w-full flex-col md:flex-row bg-slate-950 text-white overflow-hidden">
      {/*  LEFT SIDEBAR  */}
      <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-800 overflow-y-auto">
        <MultiPersonFriendsSection
          friends={friendsList}
          requestedPeople={requestedPeople}
          setRequestedPeople={setRequestedPeople}
          activePeople={activePeople}
          setActivePeople={setActivePeople}
          callActive={callActive}
        />

        {callActive && requestedPeople.length > 0 && (
          <div className="p-4 flex justify-center">
            <button
              onClick={() => {
                signallingChannel.emit("group-call-join", {
                  requestedPeople,
                  sender: user?.uid,
                  channel,
                  token,
                });
                setRequestedPeople([]);
              }}
              className="w-full rounded bg-indigo-600 py-2 hover:bg-indigo-700"
            >
              Ask to Join
            </button>
          </div>
        )}
      </aside>

      {/*  MAIN VIDEO AREA  */}
      <main className="flex-1 overflow-y-auto p-4">
        <MultiPersonVideoSection
          callActive={callActive}
          setCallActive={setCallActive}
          setChannel={setChannel}
          setToken={setToken}
        />
      </main>
    </section>
  );
}
