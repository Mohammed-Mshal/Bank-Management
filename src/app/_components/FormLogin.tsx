"use client";
import React, {  useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function FormLogin() {
  const { login, error, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  return (
    <form className="flex flex-col gap-4 mb-4">
      <div className="containerInput w-full">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter Your Password"
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await login(email, password);
        }}
        className={`w-full max-w-40 ${
          loading
            ? "bg-slate-400 hover:shadow-none cursor-not-allowed"
            : "bg-[#A263F3] hover:shadow-[#a163f33c]"
        } py-2 rounded-lg mx-auto text-white transition-all duration-500 hover:shadow-lg `}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
