import Image from "next/image";
import { use } from "react";
export default function DashboardFriendsSection({
  friendsList,
}: {
  friendsList?: any;
}) {

    const friends=use(friendsList)
  return (
    <section className="flex flex-col items-center justify-center gap-[10px]">
      {friends &&
        friends?.length > 0 &&
        friends?.map((friend: any, index: number) => (
          <section
            key={index}
            className="flex flex-row items-center justify-between w-full max-w-[500px] max-h-[70px] p-4 bg-white rounded-lg shadow-md"
          >
            <Image
              src=""
              alt="Friend Image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <section className="flex flex-row items-start">
              <h2 className="text-lg font-semibold">{friend.name}</h2>
              <h3 className="text-sm text-gray-500">
                User ID: {friend.userId}
              </h3>
            </section>
          </section>
        ))}
    </section>
  );
}
