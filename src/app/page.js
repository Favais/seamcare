import Image from "next/image";
import Navbar from "../../components/home/Navbar";
import Hero from "../../components/home/Hero";
import Experience from "../../components/home/Experience";
import AboutUs from "../../components/home/AboutUs";
import Features from "../../components/home/Features";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Experience />
      <AboutUs />
      <Features />
    </div>
  );
}
