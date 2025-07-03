"use server"
import { db } from "./db";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
export async function addFriend(userId: string, friend: string) {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { friends: arrayUnion(friend) });
    return { data: "successfully added friend to friendslist", error: null };
  } catch (error) {
    return { data: null, error: `Failed to add friend ${error}` };
  }
}

export async function getFriends(userId: string) {
  if (!userId) {
    return { data: null, error: "UserId is required" };
  }
  try {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);
    const friends = [];
    if (user?.exists()) {
      const friendIds = user?.data().friends;
      for (const friendId of friendIds) {
        const friendRef = doc(db, "users", friendId);
        const friend = await getDoc(friendRef);
        friends?.push(friend);
      }
    } else {
      return { data: null, error: "failed to get user from userId" };
    }

    return friends;
  } catch (error) {
    return {
      data: null,
      error: `Error occured while getting friends ${error}`,
    };
  }
}
