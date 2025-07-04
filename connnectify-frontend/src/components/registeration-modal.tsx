"use client";
import * as motion from "motion/react-client";
import { useState } from "react";
import { registerUser, signinUser } from "@/db/users";
import { FacebookIcon, GithubIcon, ChromeIcon } from "lucide-react";

export default function RegisterationModal() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpActive, setSignUpActive] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
 <motion.form
  drag
  dragConstraints={{ top: 12, left: 12, right: 12, bottom: 12 }}
  className="flex flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  registaartion-modal z-30 w-80 gap-4 p-6 bg-slate-800 rounded-lg shadow-lg"
>

      <h1 className="text-white text-2xl font-semibold text-center mb-2">
        {signUpActive ? "Sign Up" : "Login"}
      </h1>

      {signUpActive && (
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="name" className="text-sm text-gray-300">Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-md bg-slate-700 text-white p-2"
            placeholder="Enter your name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
      )}

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="email" className="text-sm text-gray-300">Email*</label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full rounded-md bg-slate-700 text-white p-2"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="password" className="text-sm text-gray-300">Password*</label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full rounded-md bg-slate-700 text-white p-2"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {signUpActive && (
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="confirmPassword" className="text-sm text-gray-300">Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full rounded-md bg-slate-700 text-white p-2"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-cyan-600 hover:bg-cyan-700 text-white py-2 mt-2 font-medium"
        onClick={async (e) => {
          e.preventDefault();
          setError("");
          setSuccess("");

          if (signUpActive && form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
          }

          setLoading(true);
          if (signUpActive) {
            const { data, error } = await registerUser(
              form.username,
              form.email,
              form.password
            );
            if (error) setError(error);
            if (data) setSuccess("Registration successful");
          } else {
            const { data, error } = await signinUser(
              form.email,
              form.password
            );
            if (error) {
              setError(error || "Login failed");
            }
            if (data) setSuccess("Login successful");
          }
          setLoading(false);
        }}
      >
        {loading
          ? "Loading..."
          : signUpActive
          ? "Register"
          : "Login"}
      </button>

      <p
        className="text-sm text-cyan-400 cursor-pointer underline text-center mt-2"
        onClick={() => {
          setSignUpActive((prev) => !prev);
          setError("");
          setSuccess("");
        }}
      >
        {signUpActive
          ? "Switch to Login"
          : "Switch to Sign Up"}
      </p>

      {error && <p className="text-red-500 text-sm text-center">{error as string}</p>}
      {success && <p className="text-cyan-500 text-sm text-center">{success as  string}</p>}

      <div className="flex justify-center gap-4 mt-4">
        <FacebookIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <GithubIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        <ChromeIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </motion.form>
  );
}
