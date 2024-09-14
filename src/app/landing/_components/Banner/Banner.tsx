import React from "react";
import "./Banner.css";
import Image from "next/image";
import * as motion from "framer-motion/client";
function createStar() {
  return (
    <li>
      <Image
        alt="star"
        src={"/static/images/star.svg"}
        width={14}
        height={14}
      />
    </li>
  );
}
const variant = {
  hidden: {
    opacity: 0,
    translateX: "-100px",
  },
  show: {
    opacity: 1,
    translateX: "0",
  },
};
export default function Banner() {
  return (
    <div className="banner">
      <div className="container max-w-screen-xl mx-auto px-4 h-screen flex items-center justify-between gap-12">
        <div className="banner_presentation ">
          <motion.ul
            variants={variant}
            initial={"hidden"}
            whileInView="show"
            className="ratingStars flex gap-2 mb-4"
          >
            {createStar()}
            {createStar()}
            {createStar()}
            {createStar()}
            {createStar()}
          </motion.ul>
          <motion.p
            variants={variant}
            initial={"hidden"}
            whileInView="show"
            className="mb-8"
          >
            Lorem ipsum dolor sit amet consectetur..
          </motion.p>
          <motion.h2
            variants={variant}
            initial={"hidden"}
            whileInView="show"
            className="titleBanner"
          >
            Modern <span>Banking</span> Experience
          </motion.h2>
        </div>
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 2, type: "spring", stiffness: 50 }}
          className="bannerImage flex-1 lg:flex hidden justify-center"
        >
          <div className="backgroundCircle">
            <div className="boxShadow small"></div>
            <div className="boxShadow medium"></div>
            <div className="boxShadow large"></div>
            <div className="boxShadow white"></div>
          </div>
          <div className="containerImage">
            <Image
              alt="money bag"
              src={"/static/images/money_bag_bank_icon_231478.png"}
              height={50}
              width={50}
              className="bagMoney"
            />
            <Image
              alt="money bag"
              src={"/static/images/money.png"}
              height={50}
              width={50}
              className="money"
            />
            <Image
              alt="Money"
              src={"/static/images/Banking_00019_A_icon-icons.com_59819.svg"}
              width={400}
              height={400}
              className="mainImageBanner"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
