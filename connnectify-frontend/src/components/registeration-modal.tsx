"use client";
import * as motion from "motion/react-client";
import { useState } from "react";
import { registerUser, signinUser } from "@/db/users";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/context";
export default function RegisterationModal() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpActive, setSignUpActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {setUser} = useUser();
  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.email || !form.password || (signUpActive && !form.username)) {
      setError("Please fill all required fields.");
      return;
    }

    if (signUpActive && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    if (signUpActive) {
      const { data, error } = await registerUser(
        form.username,
        form.email,
        form.password
      );
      if (error) {
        setError(error.message as string|| "Registration failed.");
      } else {
        setUser(data);
        setSuccess("Registration successful!");
        router.push("/boarding");
      }
    } else {
      const { data, error } = await signinUser(form.email, form.password);
      if (error) {
        setError(error.message as string || "Login failed.");
      } else {
        setUser(data);
        setSuccess("Login successful!");
        router.push("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
<motion.form
  drag
  dragConstraints={{ top: 12, left: 12, right: 12, bottom: 12 }}
  onSubmit={handleSubmit}
  className="flex flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-80 gap-4 p-6 bg-slate-900 rounded-2xl shadow-2xl "
>
  <h1 className="text-white text-2xl font-bold text-center tracking-wide mb-1">
    {signUpActive ? "Sign Up" : "Login"}
  </h1>

  {signUpActive && (
    <InputField
      label="Name*"
      id="username"
      type="text"
      value={form.username}
      onChange={(val) => handleInputChange("username", val)}
    />
  )}

  <InputField
    label="Email*"
    id="email"
    type="email"
    value={form.email}
    onChange={(val) => handleInputChange("email", val)}
  />

  <InputField
    label="Password*"
    id="password"
    type="password"
    value={form.password}
    onChange={(val) => handleInputChange("password", val)}
  />

  {signUpActive && (
    <InputField
      label="Confirm Password*"
      id="confirmPassword"
      type="password"
      value={form.confirmPassword}
      onChange={(val) => handleInputChange("confirmPassword", val)}
    />
  )}

  <button
    type="submit"
    className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 text-white py-2 mt-1 font-medium transition duration-200"
    disabled={loading}
  >
    {loading ? "Loading..." : signUpActive ? "Register" : "Login"}
  </button>

  <p
    className="text-sm text-cyan-400 hover:text-cyan-300 text-center cursor-pointer underline mt-1 transition"
    onClick={() => {
      setSignUpActive((prev) => !prev);
      setError(null);
      setSuccess(null);
    }}
  >
    {signUpActive ? "Already have an account? Login" : "New here? Sign Up"}
  </p>

  {error && (
    <p className="text-red-400 text-sm text-center whitespace-pre-wrap">
      {error}
    </p>
  )}
  {success && (
    <p className="text-green-400 text-sm text-center">{success}</p>
  )}
</motion.form>
  );
}

function InputField({
  label,
  id,
  type,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={id} className="text-sm text-gray-300 font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-slate-800 text-white p-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
      />
    </div>
  );
}
