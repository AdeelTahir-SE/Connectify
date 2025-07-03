import Image from "next/image";

export default function FriendsSectionSingleRoom({
  activePerson,
  setActivePerson,
}: {
  activePerson: string|undefined;
  setActivePerson: (value:string) => void;
}) {
  const friends = [
    {
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob Smith",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Carol Williams",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "David Brown",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Carol Williams",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "David Brown",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Bob Smith",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      name: "Carol Williams",
      image: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      name: "David Brown",
      image: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      name: "Carol Williams",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "David Brown",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  return (
    <section className="flex flex-col items-start justify-center bg-slate-950 overflow-y-hidden max-h-screen gap-[10px] py-8">
      {friends &&
        friends.map((friend, index) =>
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
