import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Elegant Dictionary. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
