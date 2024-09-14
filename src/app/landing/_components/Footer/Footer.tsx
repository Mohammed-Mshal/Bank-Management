import Link from "next/link";
import React from "react";
import { IoLogoFacebook, IoLogoGithub, IoLogoGoogle } from "react-icons/io";

export default function Footer() {
  return (
    <div className="bg-[var(--dark-violet)]">
      <div className="container max-w-screen-xl mx-auto py-10 px-4 justify-between">
        <ul className="flex  flex-wrap justify-between gap-x-10 gap-y-4">
          <li className="sm:max-w-xs w-full">
            <div className="flex flex-col sm:text-start text-center sm:items-start items-center">
              <div className="logo w-fit">
                <h2 className="">
                  <Link href="/landing">Golden Bank</Link>
                </h2>
              </div>
              <p className="text-gray-400 text-lg mb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <ul className="flex gap-4 items-center">
                <li>
                  <a href="#">
                    <IoLogoFacebook className="text-xl text-white" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IoLogoGoogle className="text-xl text-white" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <IoLogoGithub className="text-xl text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="max-w-xs w-[calc(100%/2-20px)] sm:w-auto ">
            <h3 className="text-2xl text-white font-semibold">Links</h3>
            <ul className="">
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Services
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Features
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </li>
          <li className="max-w-xs w-[calc(100%/2-20px)] sm:w-auto ">
            <h3 className="text-2xl text-white font-semibold">Support</h3>
            <ul className="">
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Blog
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Help
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </li>
          <li className="max-w-xs w-[calc(100%/2-20px)] sm:w-auto ">
            <h3 className="text-2xl text-white font-semibold">About Us</h3>
            <ul className="">
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Our Team
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Career
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Prices
                </Link>
              </li>
            </ul>
          </li>
          <li className="max-w-xs w-[calc(100%/2-20px)] sm:w-auto ">
            <h3 className="text-2xl text-white font-semibold">Join Our Us</h3>
            <ul className="">
              <li className="my-2">
                <Link
                  href="/auth/signup"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Sign Up
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/auth/login"
                  className="text-gray-400 hover:text-white transition-all duration-500"
                >
                  Login
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
