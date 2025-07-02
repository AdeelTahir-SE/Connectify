"use server";
import { GoogleGenAI, Modality } from "@google/genai/node";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyD4D_6FKspUn87ZCbfogOJ6wpONGtzv6s4",
});
import db from "@/db/chatbot";

export async function getChatBot(id: string) {
  if (!id || id.trim() === "") {
    return { error: "ID cannot be empty", data: null };
  }
  try {
    const data = await db.getChatWithBot(id);
    if (!data) {
      return { error: "No chat data found", data: null };
    }
    return { error: null, data: data };
  } catch (error) {
    return { error: error?.message as string, data: null };
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
    return { error: null, data: response?.text  };
  } catch (error) {
    console.error("Error generating content:", error);
    return { error: error?.message as string, data: null };
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
    return { error: error?.message as string, data: null };
  }
}
