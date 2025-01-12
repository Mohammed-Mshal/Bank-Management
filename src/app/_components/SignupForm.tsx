"use client";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function SignupForm() {
  const { signup, error, loading } = useSignup();
  const [user, setUser] = useState<{
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
  }>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });
  return (
    <form className="flex flex-col gap-4 mb-4">
      <div className="containerInput w-full">
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter Your First Name"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, firstName: e.target.value }))
          }
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter Your Last Name"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, lastName: e.target.value }))
          }
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      {error && <p className="text-red-400 text-center">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await signup(
            user.firstName,
            user.lastName,
            user.email,
            user.password
          );
        }}
        className={`w-full max-w-40 ${
          loading
            ? "bg-slate-400 shadow-none cursor-not-allowed"
            : "bg-[#A263F3] hover:shadow-[#a163f33c]"
        } py-2 rounded-lg mx-auto text-white transition-all duration-500 hover:shadow-lg`}
      >
        {loading ? "Loading..." : "Create Account"}
      </button>
    </form>
  );
}
