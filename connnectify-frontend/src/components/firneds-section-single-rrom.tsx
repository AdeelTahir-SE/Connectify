import { DocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import {use} from "react"
export default function FriendsSectionSingleRoom({
  activePerson,
  setActivePerson,
  friendsList,
}: {
  activePerson: string | undefined;
  setActivePerson: (value: string) => void;
  friendsList: Promise<
    | {
        data: null;
        error: string;
      }
    | {
        data: DocumentSnapshot<DocumentData, DocumentData>[] | null;
        error: null;
      }
  >;
}) {
  const friends = use(friendsList);
  return (
    <section className="flex flex-col items-start justify-center bg-slate-950 hide-scrollbar overflow-y-scroll max-h-screen gap-[10px] py-8">
      {friends && friends?.data&&
        friends?.data.map((friend, index) =>
          friend.name === activePerson?.name ? (
            <section
              key={index}
              className="flex flex-row items-center justify-center bg-slate-800 rounded-xl p-2 gap-[20px] opacity-75 cursor-pointer"
            >
              <Image
                src={friend.image}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
              <p className="text-white">{friend.name}</p>
            </section>
          ) : (
            <section
              key={index}
              className="flex flex-row items-center justify-center gap-[20px] p-2 hover:opacity-35 cursor-pointer"
              onClick={() => {
                setActivePerson(friend);
              }}
            >
              <Image
                src={friend.image}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
              <p className="text-white">{friend.name}</p>
            </section>
          )
        )}
    </section>
  );
}
