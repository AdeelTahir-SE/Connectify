"use client";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useUser } from "@/utils/context";
import Link from "next/link";
import { setUserDB } from "@/db/users";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

interface PaymentScreenProps {
  data?: {
    tier: "free" | "pro" | "enterprise";
    purpose: string;
  };
}

export default function PaymentScreen({ data }: PaymentScreenProps) {
    const router=useRouter();
  const {user,setUser} = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  const tierPriceMap: Record<string, string> = {
    free: "price_1RjFI9RTbZCvEUeoDGtZt1kN",
    pro: "price_1RjFJVRTbZCvEUeoqRNcHVco",
    enterprise: "price_1RjFL8RTbZCvEUeoI3udSQOM",
  };



useEffect(() => {
  if (data?.tier === "free" && user) {
    const updatedUser = {
      ...user,
      tier: data.tier,
      daysRemaining: "30",
      dateOfPurchase: new Date().toLocaleDateString(),
    };

    setUserDB(updatedUser);
    setUser(updatedUser);
    setCookie("user", JSON.stringify(updatedUser));
    router.push("/dashboard");
    
  }
}, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setInvoiceUrl(null);

    if (!stripe || !elements || !user || !data?.tier) {
      setError("Stripe, user, or tier data missing.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      return;
    }

    const priceId = tierPriceMap[data.tier];
    if (!priceId) {
      setError("Invalid pricing tier.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/create-subscription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId,
            name: user.name,
            email: user.email,
            purpose: data.purpose,
          }),
        }
      );

      const serverRes = await response.json();
      console.log("Server response:", serverRes);
      const { clientSecret, invoiceId } = serverRes;

      if (!clientSecret || !invoiceId) {
        throw new Error("Failed to create subscription or retrieve invoice.");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name || "Guest",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment failed.");
      }

      const invoiceRes = await fetch(
        `http://localhost:3001/payment/invoice/${invoiceId}`
      );
      const invoiceData = await invoiceRes.json();

      setInvoiceUrl(invoiceData.hosted_invoice_url);

      setUserDB({
        ...user,
        tier: data.tier,
        daysRemaining: "30",
        dateOfPurchase: new Date().toLocaleDateString(),
      });
      setUser({
        ...user,
        tier: data.tier,
        daysRemaining: "30",
        dateOfPurchase: new Date().toLocaleDateString(),
      });
      setCookie(
        "user",
        JSON.stringify({
          ...user,
          tier: data.tier,
          daysRemaining: "30",
          dateOfPurchase: new Date().toLocaleDateString(),
        })
      );
    } catch (err:Error | unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const cardStyleOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#fff",
        fontFamily: "monospace",
        backgroundColor: "transparent",
        "::placeholder": { color: "#aaa" },
      },
      invalid: { color: "#fa755a" },
    },
  };

  return (
    <section className="hero-section-card p-6 bg-gray-900 text-white max-w-md mx-auto h-full w-full rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-2">Complete Payment</h1>
      <p className="text-md text-gray-400 mb-4">
        Tier: <span className="text-white">{data?.tier}</span> | Purpose:{" "}
        <span className="text-white">{data?.purpose}</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
        <div className="p-3 border border-gray-600 bg-gray-800 rounded w-full">
          <CardElement options={cardStyleOptions} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300 disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {invoiceUrl && (
        <div className="mt-4">
          <p className="text-green-400 font-medium">✅ Payment successful!</p>
          <Link
            href={invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 block mt-1"
          >
            View Invoice
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            Your subscription will be active for 30 days.
          </p>
          <Link
            href="/dashboard"
            className="text-blue-400 underline mt-2 block"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </section>
  );
}
