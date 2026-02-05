import React from "react";
import { FiMail, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full mt-16">
      <div className="footer-panel mx-auto w-full max-w-6xl -translate-y-6 px-4 py-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-1 shadow-xl rounded-2xl backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between sm:justify-around gap-10">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="sm:w-full flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-14">
                  <p className="text-lg sm:text-2xl sm:tracking-[1.5px] font-bold">
                    Charles Joma
                  </p>
                  <div className="flex items-center">
                    <FiMail size={20} className="mr-2" />
                    <a
                      href="mailto:charlesjoma@outlook.com"
                      className="footer-link"
                    >
                      charlesjoma@outlook.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FiLinkedin size={18} className="mr-2" />
                    <a
                      href="https://www.linkedin.com/in/charlesjoma/"
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center p-3 footer-text">
          <p>
            All right reserved | Rocker Power Tech &#128640; | &copy; Jsphere Pty
            Ltd, 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
