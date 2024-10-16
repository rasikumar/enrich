import { Link } from "react-router-dom";
import { logo } from "../assets";
import { Navigation } from "../constant";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (title) => {
    setActiveNav(title);
    setIsOpen(false);
  };

  const listVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { opacity: 0.3 } },
    closed: { opacity: 0, y: -20, transition: { opacity: 0.3 } },
  };

  return (
    <div
      className={`sticky top-6 w-[90%] md:w-[86%] text-sm ml-auto mr-auto z-[1000] rounded-md transition duration-500 shadow-drop bg-white`}
    >
      <nav className="flex items-center justify-between p-4 rounded-md border-[1px] border-yellow-600">
        {/* Logo Section */}
        <div className="logo flex gap-1 cursor-pointer">
          <Link to="/">
            <img
              src={logo}
              width={140}
              height="auto"
              alt="logo"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={handleToggle}
          className="md:hidden md:text-3xl text-gray-700 focus:outline-none flex justify-end w-full"
        >
          {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>

        {/* Navigation Section */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-4 md:gap-8 text-base md:text-lg primary-color transition-all duration-500 ease-in-out`}
        >
          {Navigation.map((nav) => {
            return (
              <ul key={nav.id} className="md:flex">
                <li
                  className={`bg-gradient-to-r from-primary to-primary bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-in-out py-1 ${
                    activeNav === nav.title
                      ? "bg-[length:100%_2px] text-primary"
                      : ""
                  }`}
                >
                  <Link
                    to={nav.path}
                    onClick={() => handleNavClick(nav.title)} // Update active nav
                    className={`primary-color hover:text-primary font-medium hidden md:flex xl:text-base text-sm ${
                      activeNav === nav.title ? "text-primary" : ""
                    }`}
                  >
                    {nav.title}
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
      </nav>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, height: 0 }} // Initially hidden
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "100vh" : 0 }} // Animate visibility
        transition={{ duration: 0.01, ease: "easeInOut" }} // Smooth transition
        className="md:hidden w-screen rounded-md transition-all duration-500 overflow-hidden"
      >
        {Navigation.map((nav) => {
          return (
            <motion.ul variants={{ listVariants }} key={nav.id}>
              <motion.li variants={{ itemVariants }} className="py-2">
                <Link
                  to={nav.path}
                  onClick={() => handleNavClick(nav.title)}
                  className={`block text-gray-700 hover:text-primary font-medium ${
                    activeNav === nav.title ? "text-primary underline" : ""
                  }`}
                >
                  {nav.title}
                </Link>
              </motion.li>
            </motion.ul>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Navbar;
