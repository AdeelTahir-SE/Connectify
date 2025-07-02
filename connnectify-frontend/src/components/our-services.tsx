import { Video, Users, Shuffle, Smile, File, Monitor } from "lucide-react";
import { JSX } from "react";

export default function OurServices() {
  const services = [
    {
      text: "Live 1:1 video calls for instant private conversations",
      icon: <Video className="w-6 h-6 text-purple-500" />,
    },
    {
      text: "Group video conferencing with up to 10 participants",
      icon: <Users className="w-6 h-6 text-purple-500" />,
    },
    {
      text: "Random matchmaking to meet new people worldwide",
      icon: <Shuffle className="w-6 h-6 text-purple-500" />,
    },
    {
      text: "Interactive emojis and live reactions during calls",
      icon: <Smile className="w-6 h-6 text-purple-500" />,
    },
    {
      text: "File sharing and real-time collaboration tools",
      icon: <File className="w-6 h-6 text-purple-500" />,
    },
    {
      text: "Screen sharing to present and collaborate visually",
      icon: <Monitor className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-[20px] p-12">
      <h1 className="hero-section-title">Our Services</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {services.map((service, index) => (
          <ServicesCard key={index} text={service.text} icon={service.icon} />
        ))}
      </section>
    </section>
  );
}

function ServicesCard({ text, icon }: { text: string; icon: JSX.Element }) {
  return (
    <section className="hero-section-card ">
      <section
        className="scale-200"
                  
      >
        {icon}
      </section>
      <h1 className="text-2xl font-bold text-white">{text}</h1>
    </section>
  );
}
