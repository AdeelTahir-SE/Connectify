import Image from "next/image";
import { Camera } from "lucide-react";
import * as motion from "motion/react-client";
export default function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full ">
      <h1 className="dashboard-title">Dashboard</h1>
      <section className="flex flex-row items-center justify-start w-full h-full ">
        <section className="flex flex-col items-center justify-center gap-[20px]">
          <section className="relative flex flex-col  max-w-[200px] max-h-[200px] overflow-hidden rounded-xl">
            <Image
              src="/erasebg-transformed.webp"
              alt="Dashboard Image"
              width={200}
              height={200}
              
            />
            <motion.section
              className="absolute  w-[200px] h-[200px] flex flex-col items-center justify-center bg-gray-700"
              whileHover={{ opacity: 0.5 }}
              initial={{ opacity: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-[40px] h-[40px]" />
            </motion.section>
          </section>
          <section className="flex flex-col items-center justify-center gap-[10px]">
            <h2>Adeel Tahir</h2>
            <h2>userid:1jndnf913h41reass</h2>
          </section>
        </section>

        <section className="flex flex-col items-center justify-center gap-[20px] ">

        </section>
      </section>
    </section>
  );
}
