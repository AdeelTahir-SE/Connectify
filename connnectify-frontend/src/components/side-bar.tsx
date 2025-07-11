import { Home, User, Users, Shuffle } from "lucide-react";
import Link from "next/link";
export default function SideBar() {
  const items = [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: <Home className="w-6 h-6 text-purple-600" />,
    },
    {
      text: "1:1 Chat",
      link: "/dashboard/single-chat-room",
      icon: <User className="w-6 h-6 text-purple-600" />,
    },
    {
      text: "Group Chat",
      link: "/dashboard/chat-group",
      icon: <Users className="w-6 h-6 text-purple-600" />,
    },
    {
      text: "Random Match",
      link: "/dashboard/chat-random",
      icon: <Shuffle className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#00012c]  p-8">
      <h1 className="text-2xl font-bold text-purple-600 mb-8">Connectify</h1>
      <section className="flex flex-col gap-4">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-900  transition-colors"
          >
            {item.icon}
            <span className="text-md text-purple-600 font-semibold">{item.text}</span>
          </Link>
        ))}
      </section>
    </section>
  );
}
