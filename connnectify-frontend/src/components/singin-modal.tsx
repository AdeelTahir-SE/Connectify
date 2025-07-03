"use client"
import { useState } from "react";
import { signinUser } from "@/db/users";
 
export default function SignInModal(){
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      await signinUser(
        
        email,
        password
      );
      alert("User login successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error lggin user:", error);
      alert("Failed to register user. Check console for details.");
    }
  };

return (
    <section className="fixed max-w-fit top-1/2 left-1/2 bg-white flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-4"
      >
     
        <div className="flex flex-col items-start justify-center">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="hero-section-button">
          Submit
        </button>
      </form>
    </section>
  );
}
