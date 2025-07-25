"use client";
import { SetStateAction, useEffect, useState } from "react";
import MultiPersonFriendsSection from "@/components/multi-person-friends-section";
import MultiPersonVideoSection from "@/components/multi-person-video-section";
import { getFriends } from "@/db/friends";
import { useUser } from "@/utils/context";
import { signallingChannel } from "@/utils/signaling-channel";
import {  Users2, X } from "lucide-react";
import { Person } from "@/utils/types";
export default function MultiPersonChatRoom() {
  const { user } = useUser();

  const [friendsList, setFriendsList] = useState<Person[]>([]);
  const [activePeople, setActivePeople] = useState<Person[]>([]);
  const [requestedPeople, setRequestedPeople] = useState<Person[]>([]);
  const [callActive, setCallActive] = useState(false);
  const [channel, setChannel] = useState("");
  const [token, setToken] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false); 

  useEffect(() => {
    (async () => {
      const { data } = await getFriends(user?.uid);
    if (data) setFriendsList(data as SetStateAction<Person[]>);
    })();

    signallingChannel.on("group-call-join", ({ acceptor }) =>
      setActivePeople((prev) => [...prev, ...acceptor]),
    );
    signallingChannel.on("group-call-accept", ({ acceptor }) =>
      setActivePeople((prev) => prev.filter((p) => p.uid !== acceptor.uid)),
    );

    return () => {
      signallingChannel.off("group-call-join");
      signallingChannel.off("group-call-accept");
    };
  }, [user?.uid]);

  const SideContent = () => (
    <>
      <MultiPersonFriendsSection
        friends={friendsList}
        requestedPeople={requestedPeople}
        setRequestedPeople={setRequestedPeople}
        activePeople={activePeople}
        setActivePeople={setActivePeople}
        callActive={callActive}
      />
      {callActive && requestedPeople.length > 0 && (
        <div className="p-4">
          <button
            onClick={() => {
              signallingChannel.emit("group-call-join", {
                requestedPeople,
                sender: user?.uid,
                channel,
                token,
              });
              setRequestedPeople([]);
              setDrawerOpen(false);
            }}
            className="w-full rounded bg-indigo-600 py-2 hover:bg-indigo-700"
          >
            Ask to Join
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      <header className="bg-slate-950 px-4 py-3 flex items-center justify-between w-full  md:hidden">
        <h1 className="text-lg font-bold text-purple-600">Group Video Chat</h1>
        <button onClick={() => setDrawerOpen(true)}>
          <Users2 className="w-6 h-6 text-white" />
        </button>
      </header>

      <section className="flex  w-full min-h-screen overflow-y-auto bg-slate-950 text-white">
        <aside className="hidden md:block w-fit border-r border-slate-800 overflow-y-auto">
          <SideContent />
        </aside>

        <main className="flex-1  p-4">
          <h1 className="text-center dashboard-title">
            Multi Person Video Room
          </h1>
          <MultiPersonVideoSection
            callActive={callActive}
            setCallActive={setCallActive}
            setChannel={setChannel}
            setToken={setToken}
          />
        </main>
      </section>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm">
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#00012c] p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-purple-600">Contacts</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <SideContent />
          </aside>
        </div>
      )}
    </>
  );
}
