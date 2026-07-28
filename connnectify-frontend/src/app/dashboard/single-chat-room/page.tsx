"use client";

import { useState, useEffect } from "react";
import SinglePersonVideoSection from "@/components/single-person-video-section";
import FriendsSecitonSingleRoom from "@/components/friends-section-single-room";
import { getFriendsList } from "@/actions/friends";
import type { friend } from "@/utils/types";
import { Users2, X } from "lucide-react";

export default function SingleChat() {
  const [activePerson, setActivePerson] = useState<friend>();
  const [friendsList, setFriendsList] = useState<friend[]>([]);
  const [personLocked, setPersonLocked] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  /* Fetch friends once */
  useEffect(() => {
    (async () => {
      const { data } = await getFriendsList();
      if (data) setFriendsList(data as friend[]);
    })();
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4 md:hidden w-full">
        <h1 className="text-lg font-bold text-blue-600">Video Chat</h1>
        <button onClick={() => setOpenDrawer(true)}>
          <Users2 className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      {/* Main area */}
      <section className="flex flex-col md:flex-row w-full h-[calc(100svh-64px)] md:h-screen bg-gray-50 overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-blue-400/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[20vw] h-[20vw] rounded-full bg-purple-400/10 blur-3xl pointer-events-none"></div>
        
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-72 bg-white border-r border-gray-200 overflow-y-auto z-10 shadow-sm">
          <FriendsSecitonSingleRoom
            activePerson={activePerson}
            setActivePerson={setActivePerson}
            friends={friendsList}
            personLocked={personLocked}
          />
        </aside>

        {/* Video area */}
        <main className="flex-1 flex flex-col items-center justify-start p-6 gap-6 overflow-y-auto z-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 drop-shadow-sm">
            Single Person Video Room
          </h1>
          
          <div className="flex-1 w-full max-w-5xl clay-card overflow-hidden p-2 rounded-3xl bg-white border border-gray-100 flex flex-col items-center justify-center">
            <SinglePersonVideoSection
              activePerson={activePerson}
              setPersonLocked={setPersonLocked}
            />
          </div>
        </main>
      </section>

      {openDrawer && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm">
          <aside className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-blue-600">Contacts</h2>
              <button onClick={() => setOpenDrawer(false)}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <FriendsSecitonSingleRoom
              activePerson={activePerson}
              setActivePerson={(p) => {
                setActivePerson(p);
                setOpenDrawer(false); // close drawer when selecting
              }}
              friends={friendsList}
              personLocked={personLocked}
            />
          </aside>
        </div>
      )}
    </>
  );
}
