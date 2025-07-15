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
      <header className="flex items-center justify-between bg-slate-950 p-4 md:hidden w-full">
        <h1 className="text-lg font-bold text-purple-600">Video Chat</h1>
        <button onClick={() => setOpenDrawer(true)}>
          <Users2 className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* Main area */}
      <section className="flex flex-col md:flex-row w-full h-[calc(100svh-64px)] md:h-screen bg-slate-950">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 border-r border-slate-800 overflow-y-auto">
          <FriendsSecitonSingleRoom
            activePerson={activePerson}
            setActivePerson={setActivePerson}
            friends={friendsList}
            personLocked={personLocked}
          />
        </aside>

        {/* Video area */}
        <main className="flex-1 flex flex-col items-center justify-start p-4 gap-8 overflow-y-auto">
          <h1 className="dashboard-title">
            Single Person Video Room
          </h1>

          <SinglePersonVideoSection
            activePerson={activePerson}
            setPersonLocked={setPersonLocked}
          />
        </main>
      </section>

      {openDrawer && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm">
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#00012c] p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-purple-600">Contacts</h2>
              <button onClick={() => setOpenDrawer(false)}>
                <X className="w-6 h-6 text-white" />
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
