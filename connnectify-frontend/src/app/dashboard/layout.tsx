import SideBar from "@/components/side-bar";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-row items-center justify-center h-screen ">
        <section className="flex flex-col items-center justify-center h-full sticky-left-0">
            <SideBar />
        </section>
        <section className="flex flex-col items-center justify-center w-full h-full bg-[#673778] p-8">
            {children}
        </section>
    
    </section>
  );
}
