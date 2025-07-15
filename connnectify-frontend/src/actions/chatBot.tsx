"use server";
import { GoogleGenAI, Modality } from "@google/genai/node";
import { getChatWithBot,setChatWithBot } from "@/db/chatbot";
import {message} from "@/utils/types"
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getChatBot(id: string|null) {
  if (!id || id.trim() === "") {
    return { error: "ID cannot be empty", data: null };
  }
  try {
    const data = await getChatWithBot(id);
    if (!data?.data) {
      return { error: data?.error||"No chat data found", data: null };
    }
    return { error: null, data: data?.data };
  } catch (error) {
    return { error: error , data: null };
  }
}

export async function promptChatBot(prompt: string) {
  if (!prompt || prompt.trim() === "") {
    return { error: "Prompt cannot be empty", data: null };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `you are chatbot for my web app Connectify 
       a AI SAAS platform for live video communication with friends and strangers
       remember here is user prompt give answer according to it:${prompt}`,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    return { error: null, data: response?.text };
  } catch (error) {
    console.error("Error generating content:", error);
    return { error: error as string, data: null };
  }
}

export async function generateProfilePic(specs: string) {
  if (!specs || specs.trim() === "") {
    return { error: "specs cannot be empty", data: null };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `you are a AI image generator for my web app Connectify 
         a AI SAAS platform for live video communication with friends and strangers
         remember here is user prompt for generating their profile picture give answer according to it:${specs}`,
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });
    return { error: null, data: response };
  } catch (error) {
    console.error("Error generating profile picture:", error);
    return { error: error , data: null };
  }
}

export async function setUserChatWithBot(userId:string|null,chat:message[]){
  if(!userId || userId.trim() === "") {
    return { error: "User ID cannot be empty", data: null };
  }
await setChatWithBot(userId,{message:chat});
}