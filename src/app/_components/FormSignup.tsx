import { register } from "@/action/user";
import React from "react";
// import { useFormState, useFormStatus } from "react-dom";
// const initialState = {
//   message: "",
// };
export default async function FormSignup() {
//   const { pending } = useFormStatus();
//   const [state, actionForm] = useFormState(register, initialState);

  return (
    <form action={register} className="flex flex-col gap-4 mb-4">
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
      {/* {state && <p className="text-red-500 text-center">{state?.message}</p>} */}
      <button
        type="submit"
        className=" w-full max-w-40 bg-[#A263F3] py-2 rounded-lg mx-auto text-white transition-all duration-500 hover:shadow-lg hover:shadow-[#a163f33c]"
      >
        {"Create Account"}
      </button>
    </form>
  );
}
