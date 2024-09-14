"use client";

import { signIn } from "next-auth/react";

export const SigninButton = () => {
  return (
    <button
      onClick={() => {
        signIn("google", {
          redirect: true,
          callbackUrl: "/",
        });
      }}
    >
      SignIn with google
    </button>
  );
};
