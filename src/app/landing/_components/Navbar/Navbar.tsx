"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./Navbar.css";
import LinkMenu from "./LinkMenu/LinkMenu";
import { IoIosMenu } from "react-icons/io";
import * as motion from "framer-motion/client";
import { useMotionValueEvent, useScroll } from "framer-motion";

const variant = {
  hidden: {
    opacity: 0,
    translateY: "-100px",
  },
  show: {
    opacity: 1,
    translateY: "0",
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const toggleMenu = (): void => {
    setIsMenuOpen(false);
  };
  useMotionValueEvent(scrollY, "change", (latest) => {
    latest > 20 ? setIsScrolling(true) : setIsScrolling(false);
  });
  return (
    <nav className={`fixed top-0 left-0 w-full ${isScrolling && "scrolling"}`}>
      <motion.div
        variants={variant}
        initial={"hidden"}
        animate={"show"}
        className={`container max-w-screen-xl mx-auto py-2 flex justify-between items-center px-4`}
      >
        <div className="logo">
          <h2>
            <Link href="/landing">Golden Bank</Link>
          </h2>
        </div>
        <LinkMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="containerButtons">
          <Link href={"/auth/login"} className="login">
            Login
          </Link>
          <Link href={"/auth/signup"} className="signup">
            Sign Up
          </Link>
          <IoIosMenu
            className="flex md:hidden text-3xl ms-auto cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </motion.div>
    </nav>
  );
}
