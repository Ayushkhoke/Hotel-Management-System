import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Grand Stay Hotel</h3>
          <p className="text-sm leading-relaxed">
            Experience luxury and comfort at Grand Stay Hotel. We offer world-class accommodations, exceptional dining, and premium services for a memorable stay.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-green-600 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-green-600 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-green-600 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-green-600 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard/room" className="hover:text-green-500 transition duration-300">
                Rooms
              </a>
            </li>
            <li>
              <a href="/dashboard/menu" className="hover:text-green-500 transition duration-300">
                Menu
              </a>
            </li>
            <li>
              <a href="/dashboard/table" className="hover:text-green-500 transition duration-300">
                Table Booking
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Events
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Room Booking
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Fine Dining
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Spa & Wellness
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Conference Halls
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Tour Packages
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-500 transition duration-300">
                Transport Services
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-500 mt-1 shrink-0" />
              <p>
                Grand Stay Hotel<br />
                123 Luxury Avenue<br />
                New York, NY 10001
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-green-500 shrink-0" />
              <a href="tel:+1234567890" className="hover:text-green-500 transition duration-300">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-500 shrink-0" />
              <a href="mailto:info@grandstayhotel.com" className="hover:text-green-500 transition duration-300">
                info@grandstayhotel.com
              </a>
            </div>
            <div className="pt-2">
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {/* Copyright */}
          <div className="flex items-center justify-center sm:justify-start">
            <p>
              &copy; {currentYear} Grand Stay Hotel. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-6">
            <a href="/" className="hover:text-green-500 transition duration-300">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-green-500 transition duration-300">
              Terms of Service
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center justify-center sm:justify-end gap-4">
            <span className="text-gray-500">We Accept:</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-gray-800 rounded text-xs">Visa</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-xs">Mastercard</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-xs">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
