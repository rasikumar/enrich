import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Footer = () => {
  return (
    <div className="bg-slate-100 ">
      <div className="py-6 px-2 m-auto w-[35rem] gap-3 flex flex-col">
        <h1 className="text-center xl:text-lg md:text-sm  ">
          Subscribe for Insights, Updates, and More!
        </h1>
        <div className="flex border border-gray-300 focus-within:border-primary rounded-lg gap-3 bg-white px-4 py-2">
          <input
            type="text"
            placeholder="Enter Your Mail"
            className="mt-1 block bg-none w-full px-3 py-2 rounded-md focus:outline-none  xl:text-lg sm:text-sm "
          />
          <button className="py-2 px-5 max-md:text-xs bg-yellow-600 transition delay-75 text-white font-semibold rounded-md hover:shadow-md hover:bg-white hover:text-yellow-600 cursor-none">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex bg-gray-300 flex-col gap-4 lg:flex-row items-center justify-between p-6 lg:p-10 lg:py-6">
        <div className="mb-4 lg:mb-0">
          <img src={logo} alt="logo" width={150} loading="lazy" />
        </div>
        <div className="mb-4 lg:mb-0">
          <ul className="flex md:gap-3 xl:text-lg md:text-sm text-xs text-center lg:text-left ">
            <AnchorLink
              href="#hero"
              className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex"
            >
              Home
            </AnchorLink>
            <Link
              to={"/Aboutus"}
              className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex"
            >
              About Us
            </Link>
            <AnchorLink
              href="#service"
              className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex"
            >
              Services
            </AnchorLink>
            <AnchorLink
              href="#program"
              className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex"
            >
              Program
            </AnchorLink>
            <AnchorLink
              href="#testimonials"
              className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex"
            >
              Testimonials
            </AnchorLink>
            <AnchorLink
              href="#blog"
              className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer h-5 items-center flex"
            >
              Blogs
            </AnchorLink>
          </ul>
        </div>
        <div>
          <ul className="flex justify-center lg:justify-end gap-4 text-3xl">
            <li>
              <a
                href=""
                className="text-black-700 hover:text-yellow-600 transition delay-100"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-black-700 hover:text-yellow-600 transition delay-100"
              >
                <FaWhatsapp />
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-black-700 hover:text-yellow-600 transition delay-100"
              >
                <CiLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
