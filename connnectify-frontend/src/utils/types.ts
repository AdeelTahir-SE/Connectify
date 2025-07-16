import { Dispatch, SetStateAction } from "react";

export type message = {
  role: "user" | "bot";
    content: string;
};

export type friend={
  uid: string;
  email: string;
  name: string;
 image:string
}
export type User= {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: number;
  image: string;
  tier: string;
  daysRemaining: string;
  dateOfPurchase: string;

}

export type UserCtx = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
};

export type SignalingChannelMessage = {
  senderId: string;
  receiverId: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  iceCandidate?: RTCIceCandidateInit;
  callClosed?: boolean;
};

export type BoardingData = {
  purpose: string| null;
  tier:string|null;
};

export type  Person = {
  uid: string;
  name?: string;
  image?: string;
  email?: string;
  role?: string;
  tier?: string;
  daysRemaining?: string;
  dateOfPurchase?: string;
  createdAt?: number;
};