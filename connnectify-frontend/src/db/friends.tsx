"use server"

import { db } from "./db";

import { updateDoc, doc, arrayUnion, getDoc,arrayRemove } from "firebase/firestore";

export async function addFriend(userId: string, friend: string) {
  try {
    if(!userId || !friend) {
      return { data: null, error: "UserId and Friend are required" };
    }
    if(friend === userId) {
      return { data: null, error: "You cannot add yourself as a friend" };
    }

    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { friends: arrayUnion(friend) });
    return { data: "successfully added friend to friendslist", error: null };
  } catch (error) {
    return { data: null, error: `Failed to add friend ${error}` };
  }
}

export async function getFriends(userId: string|undefined|null) {
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
        friends?.push(friend.data());
      }
    } else {
      return { data: null, error: "failed to get user from userId" };
    }

    return {data:friends,error :null};
  } catch (error) {
    return {
      data: null,
      error: `Error occured while getting friends ${error}`,
    };
  }
}
export async function removeFriend(userId: string, friendId: string) {
  if (!userId || !friendId) {
    return { data: null, error: "UserId and FriendId are required" };
  }
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { friends: arrayRemove(friendId) });
    return { data: "successfully removed friend from friendslist", error: null };
  } catch (error) {
    return { data: null, error: `Failed to remove friend ${error}` };
  }
}
export async function userExists( userId: string) {
  if (!userId ) {
    return { data: null, error: "UserId is required" };
  }
  try {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);
    if (user?.exists()) {
      const userData = user?.data();
      return { data: userData, error: null };
    } else {
      return { data: null, error: "User does not exist" };
    }
  } catch (error) {
    return { data: null, error: `Error checking friend existence ${error}` };
  }
}