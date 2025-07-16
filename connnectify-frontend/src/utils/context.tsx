"use client";
import { createContext, useContext, ReactNode } from "react";
import type { User } from "./types";
import { useState } from "react";
import { useEffect } from "react";
import { UserCtx } from "./types";

export const UserContext = createContext<UserCtx | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  if (context === null) {
    throw new Error("UserContext is null, ensure UserContextProvider is used");
  }
  return context;
}

export function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
    if (userCookie) {
      const userData = userCookie.split('=')[1];
      try {
        setUser(JSON.parse(decodeURIComponent(userData)));
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  },[])
  
  return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>;
}
