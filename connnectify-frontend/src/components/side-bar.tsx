import { Home, User, Users, Shuffle, Video, Settings } from "lucide-react";

export default function SideBar() {
  const items = [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: <Home className="w-6 h-6 text-purple-600" />,
    },
    {
      text: "1:1 Chat",
      link: "/dashboard/chat-single-person",
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
    <section className="flex flex-col items-center justify-center min-h-screen bg-purple-50 border-r border-purple-200 p-8">
      <h1 className="text-2xl font-bold text-purple-800 mb-8">Connectify</h1>
      <section className="flex flex-col gap-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-200 transition-colors"
          >
            {item.icon}
            <span className="text-md text-purple-900">{item.text}</span>
          </a>
        ))}
      </section>
    </section>
  );
}
