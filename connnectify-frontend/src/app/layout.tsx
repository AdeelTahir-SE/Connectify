import { Geist, Geist_Mono } from "next/font/google";
import { UserContextProvider } from "@/utils/context";
import ChatBot from "@/components/chatbot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Connectify",
  description: "Connect with world",
  icons: {
    icon: "/favicon.ico",
  },
  
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContextProvider>
          {children}
          <ChatBot />
        </UserContextProvider>
      </body>
    </html>
  );
}
