import ButtonLogin from "@/app/_components/buttonLogin";
import Link from "next/link";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function LoginPage() {
  return (
    <div className="login_page overflow-x-hidden relative px-4 flex justify-center items-center min-h-screen min-w-full before:absolute before:top-0 before:left-0 before:h-full before:w-full bg-[#0C0C0C] before:bg-[#1919191f]  before:-z-10 before:backdrop-filter before:backdrop-blur-3xl z-0">
      <div className="bg-[#351560] shadow-2xl shadow-[#060026] -z-20 s absolute lg:h-72 lg:w-72 h-52 w-52 rounded-full -top-10 -start-10"></div>
      <div className="bg-[#351560] shadow-2xl shadow-[#060026] -z-20 s absolute lg:h-72 lg:w-72 h-52 w-52 rounded-full -bottom-10 -end-10"></div>
      <div className="container max-w-md mx-auto px-8 bg-[var(--normal-black)] p-8 rounded-xl">
        <div className="headerForm text-center  text-white mb-8">
          <h2 className="lg:text-4xl md:text-3xl text-2xl mb-2">Golden Bank</h2>
          <p className="md:text-lg text-base">Login To Your Account</p>
        </div>
        <form action="" className="flex flex-col gap-4 mb-4">
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
          <button
            type="submit"
            className=" w-full max-w-40 bg-[#A263F3] py-2 rounded-lg mx-auto text-white transition-all duration-500 hover:shadow-lg hover:shadow-[#a163f33c]"
          >
            Submit
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center">
          Haven&apos;t Account?{"  "}
          <Link href={"/auth/signup"} className="text-white">
            Sing Up
          </Link>
        </p>
        <p className="text-center my-4 relative text-white before:absolute before:w-full before:h-px before:-z-10 z-0  before:bg-white before:left-0 before:top-1/2 before:-translate-y-1/2 ">
          <span className="bg-[var(--normal-black)] px-4">OR</span>
        </p>
        <div className="flex flex-col gap-4">
          <ButtonLogin logoButton={<BsGoogle />} signinWith="google" />
          <ButtonLogin logoButton={<BsGithub />} signinWith="github" />
        </div>
      </div>
    </div>
  );
}
