import Image from "next/image";
import { friend } from "@/utils/types";
export default function DashboardFriendsSection({friends}: {friends: friend[]}) {
  return (
    <section className="flex flex-col items-start justify-center bg-transparent hide-scrollbar overflow-y-scroll max-h-screen gap-[10px] py-2 w-full">
      {friends &&
        friends?.map((friend, index) =>
         
            <section
              key={index}
              className="flex flex-row items-center justify-start w-full gap-[15px] p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100"
              onClick={() => {
              }}
            >
              <Image
                src={(friend?.image)?friend?.image:"/placeholder-user.jpeg"}
                alt=""
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <p className="text-gray-900 font-semibold">{friend?.name}</p>
            </section>
          )
}
    </section>
  );
}
