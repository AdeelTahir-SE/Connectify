import { Socket } from "socket.io";
export interface WaitingUser {
  uid: string;
  socket: Socket;
}

 export interface CallSignalData  {
  senderId: string;
  receiverId: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  iceCandidate?: RTCIceCandidateInit;
  callClosed?: boolean;
};

export interface People{
  uid: string;
  name?: string;
  image?: string;
  email?: string;
  role?: string;
  tier?: string;
  daysRemaining?: string;
  dateOfPurchase?: string;
  createdAt?: number;
}
export interface GroupCallData  {
  requestedPeople: People[];   
  sender: {
    uid: string;
    name?: string;
    image?: string;
  };
  channel: string;             
  token: string;            

};

export interface GroupCallResponseData {

  acceptor?: People;
  requestedPeople: People[];
  sender: string;
  rejector?: People;
}
