"use client";
import { CookieValueTypes } from "cookies-next";
import { createContext, useContext, ReactNode } from "react";
interface User {
  id: string;
  name: string;
  email: string;
}
export const UserContext = createContext<User | null|CookieValueTypes>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserContextProvider({
  value,
  children,
}: {
  value: User | CookieValueTypes | null;
  children: ReactNode;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
