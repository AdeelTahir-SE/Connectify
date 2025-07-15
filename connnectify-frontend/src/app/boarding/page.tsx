"use client";
import SelectionScreen from "@/components/selection-screen";
import PaymentScreen from "@/components/payment-screen";
import { useState } from "react";
import * as motion from "motion/react-client";
import { Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import { stripe } from "@/utils/stripe";
export default function PaymentPage() {
  const [state, setState] = useState(0);
  const [data, setData] = useState({
    tier: "free",
    purpose: "",
  });
  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen  bg-black gap-8 p-8">
      {state === 0 ? (
        <motion.div className="flex flex-col items-center justify-center w-full gap-8">
          <SelectionScreen setData={setData} data={data} />
        </motion.div>
      ) : (
        <motion.div className="flex flex-col items-center justify-center w-full  gap-8">
          <h1 className="text-4xl font-bold text-white">Payment</h1>
          <Elements stripe={stripe}>
            <PaymentScreen data={data} />
          </Elements>
        </motion.div>
      )}

      <section className="flex flex-row items-center justify-center gap-[20px]">
        {" "}
        {state !== 0 && (
          <button
            className="flex flex-row items-center justify-center gap-[10px] bg-slate-950 px-4 rounded-full hover:scale-110 transition duration-200 cursor-pointer  text-white"
            disabled={state === 0}
            onClick={() => {
              setState((prev) => prev - 1);
            }}
          >
            <Image
              src={"next-long-right-arrow.svg"}
              alt=""
              width={40}
              height={40}
              className="rotate-y-180"
            />
            prev
          </button>
        )}
        {state !== 1 && (
          <button
            className="flex flex-row items-center justify-center gap-[10px] bg-slate-950 px-4 rounded-full hover:scale-110 transition duration-200 cursor-pointer  text-white"
            disabled={state === 1}
            onClick={() => {
              setState((prev) => prev + 1);
            }}
          >
            Next
            <Image
              src={"next-long-right-arrow.svg"}
              alt=""
              width={40}
              height={40}
            />
          </button>
        )}
      </section>
    </section>
  );
}
