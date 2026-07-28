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
      <header className="bg-white px-4 py-3 flex items-center justify-between w-full md:hidden border-b border-gray-200">
        <h1 className="text-lg font-bold text-blue-600">Group Video Chat</h1>
        <button onClick={() => setDrawerOpen(true)}>
          <Users2 className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      <section className="flex w-full min-h-screen overflow-hidden bg-gray-50 text-gray-900">
        <aside className="hidden md:block w-72 bg-white border-r border-gray-200 overflow-y-auto">
          <SideContent />
        </aside>

        <main className="flex-1 flex flex-col p-4 overflow-y-auto relative">
          <div className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-blue-400/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[20vw] h-[20vw] rounded-full bg-purple-400/10 blur-3xl pointer-events-none"></div>
          
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6 drop-shadow-sm z-10">
            Multi Person Video Room
          </h1>
          <div className="flex-1 z-10 w-full max-w-6xl mx-auto clay-card p-4 overflow-hidden flex flex-col">
            <MultiPersonVideoSection
              callActive={callActive}
              setCallActive={setCallActive}
              setChannel={setChannel}
              setToken={setToken}
            />
          </div>
        </main>
      </section>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm">
          <aside className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-blue-600">Contacts</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <SideContent />
          </aside>
        </div>
      )}
    </>
  );
}
