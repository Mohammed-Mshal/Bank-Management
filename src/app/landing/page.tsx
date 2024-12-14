import React from "react";
import Navbar from "./_components/Navbar/Navbar";
import "./landing.css";
import Banner from "./_components/Banner/Banner";
import OurClients from "./_components/OurClients/OurClients";
import OurFeatures from "./_components/OurFeatures/OurFeatures";
import OurServices from "./_components/OurServices/OurServices";
import ContactUs from "./_components/ContactUs/ContactUs";
import Footer from "./_components/Footer/Footer";

export default function LandingPage() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <OurClients />
      <OurFeatures />
      <OurServices />
      <ContactUs />
      <Footer />
      <div className="text-center text-lg py-2 px-4 text-[var(--dark-violet)] bg-white">
        &copy;2024 - All Right Reversed To Mohammed Al Mashal
      </div>
    </div>
  );
}
