"use server"
import {auth,db} from "@/db/db"
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc,getDoc,setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function registerUser({
  name,
  email,
  password,
  
}: {
  name: string;
  email: string;
  password: string;
}) {
    console.log(name,email,password)
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  const userDocRef = doc(db, "users", userCredential.user.uid);
  await setDoc(userDocRef, {
    uid: userCredential.user.uid,
    name: name,
    email: email,
    role:"free",
    createdAt: Date.now()
  });

  console.log("User registered successfully!");
}

export async function signinUser(email:string,password:string){
    try{
    const userCredential=await signInWithEmailAndPassword(auth,email,password);
    const userRef=doc(db,"users",userCredential?.user?.uid);
    const user=await getDoc(userRef)
    if(user?.exists()){
    return {data:user.data(),error:null};
    }
    else{
        return{data:null,error:"user does not exists.Sign Up first"}
    }
    }
    catch(error){
        return {data:null,error:error}
    }
}
