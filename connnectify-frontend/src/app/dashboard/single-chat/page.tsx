import SinglePersonVideoSection from "@/components/single-person-video-section"
export default function SingleChat() {
    return(
        <section className="flex flex-col items-center justify-center w-full h-full bg-[#673778] p-8">
            <h1 className="dashboard-title">1:1 Chat room</h1>
            <section className="flex flex-row items-center justify-center w-full h-full ">
                friendssectionsinglechat
                <SinglePersonVideoSection/>
            </section>

        </section>
    )
}