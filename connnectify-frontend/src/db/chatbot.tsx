"use server"
import { doc,setDoc ,getDoc} from "firebase/firestore"
import { db } from "./db"; 
import {message} from "@/utils/types"
export async function setChatWithBot(id: string, chat:{message:message[]}) {
  const userRef = doc(db, "chatsWithBot", id);

  try {
    await setDoc(userRef, chat, { merge: false });
    console.log("Chat saved successfully!");
    return { data: true,error:null };
  } catch (error) {
    console.error("Error saving chat:", error);
    return { data: null, error };
  }
}


export async function getChatWithBot(userId:string){
    try{
    const docRef=doc(db,"chatsWithBot",userId)
    const chat=await getDoc(docRef);
    if(!chat.exists()){
        return {data:null,error:"no chat found"}
    }
    return{data:chat?.data()?.message,error:null};
    }
    catch(error){
        return {data:null,error}
    }

}