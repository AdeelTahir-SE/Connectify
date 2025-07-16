import { BoardingData } from "@/utils/types";
import { Dispatch } from "react";
export default function SelectionScreen({
  setData,
  data,
}: {
  setData: Dispatch<React.SetStateAction<BoardingData>>;
  data: BoardingData;
}) {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full gap-10">
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">Welcome to Connectify</h1>
        <p className="text-lg text-gray-400">Answer a few questions to get started</p>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold text-white">What do you aim to use Connectify for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Video Calls", "Group Calls", "Random Matchmaking"].map((purpose, index) => (
            <PurposeCard key={index} purpose={purpose} setData={setData} data={data} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Select a Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              heading: "Free",
              price: "₹0",
              features: ["1:1 Video Calls", "Group Calls (up to 5)", "Random Matchmaking"],
            },
            {
              heading: "Pro",
              price: "₹199/month",
              features: [
                "All Free Features",
                "Group Calls (up to 10)",
                "Screen Sharing",
                "File Sharing",
              ],
              tagline: "Best for small teams",
            },
            {
              heading: "Enterprise",
              price: "Contact Us",
              features: [
                "All Pro Features",
                "Custom Integrations",
                "Priority Support",
                "Advanced Security",
              ],
              tagline: "For large organizations",
            },
          ].map((tier, index) => (
            <TierCard key={index} tierDetails={tier} setData={setData} data={data} />
          ))}
        </div>
      </section>
    </section>
  );
}


function PurposeCard({
  purpose,
  setData,
  data,
}: {
  purpose: string;
  setData: Dispatch<React.SetStateAction<BoardingData>>;
  data: BoardingData;
}) {
  const lower = purpose.toLowerCase();
  const isChecked = data?.purpose === lower;
  const id = `purpose-${lower}`;

  return (
    <label
      htmlFor={id}
      className={`hero-section-card cursor-pointer border-2 p-4 rounded-xl ${
        isChecked ? "border-purple-500 bg-purple-100" : "border-gray-700"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={() =>
          setData((prev: BoardingData) => ({
            ...prev,
            purpose: isChecked ? null : lower,
          }))
        }
      />
      <span className="text-2xl font-bold">{purpose}</span>
    </label>
  );
}


function TierCard({
  tierDetails,
  setData,
  data,
}: {
  tierDetails: {
    heading: string;
    price: string;
    features: string[];
    tagline?: string;
  };
  setData: Dispatch<React.SetStateAction<BoardingData>>;
  data: BoardingData;
}) {
  const lower = tierDetails.heading.toLowerCase();
  const isChecked = data?.tier === lower;
  const id = `tier-${lower}`;

  return (
    <label
      htmlFor={id}
      className={`hero-section-card cursor-pointer border-2 p-4 rounded-xl space-y-2 ${
        isChecked ? "border-purple-500 bg-purple-100" : "border-gray-700"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={() =>
          setData((prev: BoardingData) => ({
            ...prev,
            tier: isChecked ? null : lower,
          }))
        }
      />
      <h1 className="text-2xl font-bold">{tierDetails.heading}</h1>
      <h2 className="text-lg font-semibold">{tierDetails.price}</h2>
      <ul className="text-sm list-disc pl-5 space-y-1 text-gray-800">
        {tierDetails.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      {tierDetails.tagline && (
        <p className="text-sm italic text-purple-600">{tierDetails.tagline}</p>
      )}
    </label>
  );
}
