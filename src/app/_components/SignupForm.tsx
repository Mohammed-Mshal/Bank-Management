"use client";
import { register } from "@/action/user";
import { useActionState } from "react";
const initialState = {
  errors: "",
};
export default function SignupForm() {
  const [state, action, pending] = useActionState(register, initialState);
  return (
    <form action={action} className="flex flex-col gap-4 mb-4">
      <div className="containerInput w-full">
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter Your First Name"
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter Your Last Name"
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      <div className="containerInput w-full">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          className="px-4 py-2 outline-none w-full rounded-lg text-white placeholder:text-gray-300 bg-transparent border border-1  border-gray-600"
        />
      </div>
      {state?.errors && (
        <p className="text-red-400 text-center">{state.errors}</p>
      )}
      <button
        disabled={pending}
        type="submit"
        className={`w-full max-w-40 ${
          pending
            ? "bg-slate-400 shadow-none cursor-not-allowed"
            : "bg-[#A263F3] hover:shadow-[#a163f33c]"
        } py-2 rounded-lg mx-auto text-white transition-all duration-500 hover:shadow-lg`}
      >
        {pending ? "Loading..." : "Create Account"}
      </button>
    </form>
  );
}
