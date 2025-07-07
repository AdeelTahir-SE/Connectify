import Image from "next/image";
export default function FriendsSectionSingleRoom({
  activePerson,
  setActivePerson,
  friends,
}: {
  activePerson: string | undefined;
  setActivePerson: (value: string) => void;
  friends: any[]
}) {
  return (
    <section className="flex flex-col items-start justify-center bg-slate-950 hide-scrollbar overflow-y-scroll max-h-screen gap-[10px] py-8">
      {friends && friends&&
        friends?.map((friend, index) =>
          friend.name === activePerson?.name ? (
            <section
              key={index}
              className="flex flex-row items-center justify-center bg-slate-800 rounded-xl p-2 gap-[20px] opacity-75 cursor-pointer"
            >
              <Image
                src={(friend.image)?(friend.image):"/placeholder-user.jpeg"}
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
                src={(friend.image)?(friend.image):"/placeholder-user.jpeg"}
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
