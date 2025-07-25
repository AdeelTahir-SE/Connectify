import { auth, db } from "@/db/db";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next/client";
import { getCookie } from "cookies-next/client";
import {User} from "@/utils/types";
import { FirebaseError } from "firebase/app";

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
    const date = new Date();
    const user = {
      uid: userCredential.user.uid,
      name: name,
      email: email,
      role: "free",
      createdAt: Date.now(),
      image: "",
      tier: "normal",
      daysRemaining: "Infinity",
      dateOfPurchase: `${date?.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    };
    await setDoc(userDocRef, user);
    setCookie("user", JSON.stringify(user));

    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as FirebaseError  };
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
      setCookie("user", JSON.stringify(userData));
      return { data: userData, error: null };
    } else {
      return { data: null, error: {message:"user does not exists.Sign Up first"} };
    }
  } catch (error) {
    return { data: null, error: error as FirebaseError};
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

export async function setProfileImage(userId: string, imageurl: string) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { image: imageurl }, { merge: true });
    const userData = getCookie("user");
    const user = { ...JSON.parse(userData as string), image: imageurl };
    setCookie("user", JSON.stringify(user));
    return { data: userData, error: null };
  } catch (error) {
    return { data: null, error: `Error setting profile image: ${error}` };
  }
}

export async function setUserDB(data: User) {
  try {
    if (!data || !data.uid) {
      return { data: null, error: "Invalid user data" };
    }
    const userRef = doc(db, "users", data.uid);
    await setDoc(userRef, data, { merge: true });

    setCookie("user", JSON.stringify(data));
    return { data, error: null };
  } catch (error) {
    return { data: null, error: `Error setting user data: ${error}` };
  }
}

export async function signout() {
  try {
    await auth.signOut();
    deleteCookie("user");
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: `Error signing out: ${error}` };
  }
}
