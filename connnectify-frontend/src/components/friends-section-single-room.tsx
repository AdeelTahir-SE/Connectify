import { friend } from "@/utils/types";
import Image from "next/image";
export default function FriendsSectionSingleRoom({
  activePerson,
  setActivePerson,
  friends,
  personLocked
}: {
  activePerson: friend|undefined;
  setActivePerson: (value: friend) => void;
  friends: friend[];
  personLocked: boolean;
}) {
  return (
    <section className="flex flex-col items-start justify-center min-w-fit hide-scrollbar overflow-y-scroll max-h-screen gap-[10px] py-4 px-2 w-full">
      {!personLocked&&friends && friends&&
        friends?.map((friend, index) =>
          friend.name === activePerson?.name ? (
            <section
              key={index}
              className="flex flex-row items-center justify-start w-full rounded-xl p-3 gap-[15px] bg-blue-50 border border-blue-100 cursor-pointer"
            >
              <Image
                src={(friend.image)?(friend.image):"/placeholder-user.jpeg"}
                alt=""
                width={40}
                height={40}
                className="rounded-full object-cover shadow-sm"
              />
              <p className="text-blue-700 font-bold">{friend.name?.substring(0,15)}..</p>
            </section>
          ) : (
            <section
              key={index}
              className="flex flex-row items-center justify-start w-full gap-[15px] p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100"
              onClick={() => {
                setActivePerson(friend);
              }}
            >
              <Image
                src={(friend.image)?(friend.image):"/placeholder-user.jpeg"}
                alt=""
                width={40}
                height={40}
                className="rounded-full object-cover shadow-sm"
              />
              <p className="text-gray-900 font-semibold">{friend.name?.substring(0,15)}..</p>
            </section>
          )
        )}
    </section>
  );
}
