"use server";
import { auth, db } from "@/db/db";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const date=new Date()
    const user = {
      uid: userCredential.user.uid,
      name: name,
      email: email,
      role: "free",
      createdAt: Date.now(),
      image: "",
      tier:"normal",
      daysRemaining:"Infinity",
      dateOfPurchase:`${date?.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    };
    await setDoc(userDocRef, user);
    const cookie = await cookies();
    cookie.set("user", JSON.stringify(user));

    return { data: userCredential.user, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function signinUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userRef = doc(db, "users", userCredential?.user?.uid);
    const user = await getDoc(userRef);
    if (user?.exists()) {
      const userData = user?.data();
      const cookie = await cookies();
      cookie.set("user", JSON.stringify(userData));
      return { data: userData, error: null };
    } else {
      return { data: null, error: "user does not exists.Sign Up first" };
    }
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function getUserData(userId: string) {
  if (!userId) {
    return { data: null, error: "UserId is required" };
  }
  try {
    const userRef = doc(db, "users", userId);
    const user = await getDoc(userRef);
    if (user?.exists()) {
      const userData = user?.data();
      return { data: userData, error: null };
    } else {
      return { data: null, error: "User does not exist" };
    }
  } catch (error) {
    return { data: null, error: `Error fetching user data: ${error}` };
  }
}