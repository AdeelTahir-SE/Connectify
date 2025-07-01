import * as motion from "motion/react-client"
export default function TierCard({heading,price,features,tagline}:{heading:string,price:string,features:string[],tagline?:string}) {
    return (
        <motion.section className="hero-section-card" >
            <h1 className="text-4xl font-bold">{heading}</h1>
            <h2 className="text-2xl font-semibold">{price}</h2>
            <ul className="list-disc gap-[10px]">
                {features.map((feature, index) => (
                    <li key={index} className="text-lg">{feature}</li>
                ))}

            </ul>
            {tagline && <p className="text-md font-semibold text-purple-300">{tagline}</p>}
           

        </motion.section>
    )
}