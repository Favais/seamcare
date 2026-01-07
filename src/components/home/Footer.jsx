import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-accent-foreground py-20 lg:py-25 px-6 sm:px-12 lg:px-15">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          {/* Company Section */}
          <div className="flex flex-col gap-10 max-w-md">
            <div className="flex flex-col gap-6">
              <p className="text-[#CCC] text-base leading-[1.8] tracking-[-0.32px]">
                MedEase simplifies healthcare with an easy-to-use platform for
                booking appointments, telehealth services, and managing patient
                records.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex text-accent gap-6">
              <Facebook />
              <Instagram />
              <X />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-20">
            {/* Services */}
            <div className="flex flex-col gap-6 min-w-[180px]">
              <h3 className="text-white text-xl font-medium leading-[1.5] tracking-[-0.4px]">
                Services
              </h3>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/services/primary-care"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Primary Care
                </Link>
                <Link
                  href="/services/specialist-care"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Specialist Care
                </Link>
                <Link
                  href="/services/mental-health"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Mental Health Services
                </Link>
                <Link
                  href="/services/telehealth"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Telehealth
                </Link>
              </nav>
            </div>

            {/* Find a Doctor */}
            <div className="flex flex-col gap-6 min-w-[180px]">
              <h3 className="text-white text-xl font-medium leading-[1.5] tracking-[-0.4px]">
                Find a Doctor
              </h3>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/doctors/top-rated"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Top-Rated Doctors
                </Link>
                <Link
                  href="/doctors/appointments"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Appointment Scheduling
                </Link>
                <Link
                  href="/doctors/reviews"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Patient Reviews
                </Link>
                <Link
                  href="/doctors/profiles"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Doctor Profiles
                </Link>
              </nav>
            </div>

            {/* About Us */}
            <div className="flex flex-col gap-6 min-w-[180px]">
              <h3 className="text-white text-xl font-medium leading-[1.5] tracking-[-0.4px]">
                About Us
              </h3>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/about/news"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  News and Updates
                </Link>
                <Link
                  href="/about/careers"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="/about/community"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Community Involvement
                </Link>
                <Link
                  href="/about/community"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Community Involvement
                </Link>
                <Link
                  href="/about/contact"
                  className="text-[#CCC] text-base leading-[1.5] tracking-[-0.32px] hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
