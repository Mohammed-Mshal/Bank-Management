"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function ButtonLogin({
  signinWith,
  logoButton,
}: {
  signinWith: string;
  logoButton: React.ReactNode;
}) {
  return (
    <button
      onClick={() => {
        signIn(signinWith, {
          redirect: true,
          callbackUrl: "/",
        });
      }}
      className="py-2 w-full bg-white flex justify-center items-center gap-2 rounded-lg duration-500 transition-all hover:shadow-gray-600 hover:shadow-lg"
    >
      {logoButton} Login With {signinWith.toUpperCase()}
    </button>
  );
}
