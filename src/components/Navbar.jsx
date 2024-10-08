import { Link } from "react-router-dom";
import { logo } from "../assets";
import { Navigation } from "../constant";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sticky top-6 w-[90%] md:w-[80%] text-sm ml-auto mr-auto z-[1000] rounded-md shadow-lg transition duration-500 bg-white`}
    >
      <nav className="flex items-center justify-between p-4 md:p-5 rounded-md shadow-md border-[1px] border-yellow-600">
        {/* Logo Section */}
        <div className="logo flex gap-1 cursor-pointer">
          <Link to="/">
            <img src={logo} width={140} height="auto" alt="logo" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={handleToggle}
          className="md:hidden text-3xl text-gray-700 focus:outline-none flex justify-end w-full"
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
                <li className="bg-gradient-to-r  from-purple-500 to-purple-500 bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-in-out py-1">
                  <Link
                    to={nav.path}
                    className="primary-color hover:text-purple-500 font-medium hidden md:flex"
                  >
                    {nav.title}
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden h-screen w-screen rounded-md p-4 mt-2 transition duration-300 relative ">
          {Navigation.map((nav) => {
            return (
              <ul key={nav.id}>
                <li className="py-2">
                  <Link
                    to={nav.path}
                    className="block text-gray-700 hover:text-purple-500 font-medium"
                  >
                    {nav.title}
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
