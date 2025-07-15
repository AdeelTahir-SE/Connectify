import Image from "next/image";
import { friend } from "@/utils/types";
export default function DashboardFriendsSection({friends}: {friends: friend[]}) {
  return (
    <section className="flex flex-col items-start justify-center bg-slate-950 hide-scrollbar overflow-y-scroll max-h-screen gap-[10px] py-8">
      {friends &&
        friends?.map((friend, index) =>
         
            <section
              key={index}
              className="flex flex-row items-center justify-center gap-[20px] p-2 hover:opacity-35 cursor-pointer"
              onClick={() => {
              }}
            >
              <Image
                src={(friend?.image)?friend?.image:"/placeholder-user.jpeg"}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
              <p className="text-white">{friend?.name}</p>
            </section>
          )
}
    </section>
  );
}
