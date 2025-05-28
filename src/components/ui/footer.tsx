"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null; 

  return (
    <footer className="bg-gray-700 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h2 className="text-xl font-semibold text-white">About Us</h2>
            <p className="mt-2 text-sm">
              We connect patients with medical assistance, donors, and volunteers, ensuring fast and reliable support for those in need.
            </p>
          </div>

          
          <div>
            <h2 className="text-xl font-semibold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="/user/about-us" className="hover:text-white">About</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/user/donationHome" className="hover:text-white">Donate</Link></li>
              <li><Link href="/user/about-us" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-2 text-sm">Email: vitalaidnsr@gmail.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        
        <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} VitalAid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
