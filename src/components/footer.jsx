import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm py-4 bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Quality Management System.
          <span className="ml-2 text-indigo-400">
            Organize, Debug, Succeed.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
