"use client";
import { signOut } from "next-auth/react";
export default function ClientComponent() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/auth/signin" })}
    >
      Sign Out
    </button>
  );
}
