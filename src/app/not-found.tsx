"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const route = useRouter();
  return (
    <main className="grid min-h-screen place-items-center bg-[#060026] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-300 max-w-xs">
          Sorry, This Features Not Available for Now, We are Working On It
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            name="Go Back"
            onClick={() => {
              route.back();
            }}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
