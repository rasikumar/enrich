import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useState } from "react";
import Instance from "./Admin/Instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting form data:", formData);

    try {
      const response = await Instance.post("/subscribe", formData);
      // if (response.status === true) {
      console.log(response);
      toast.success("You're in! Welcome aboard!");
      // } else {
      //   console.log(response);
      //   toast.error("Failed to subscribe");
      //   toast.error(
      //     response.error ||
      //       "Oops! We encountered an issue. Please retry in a bit."
      //   );
      // }
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        error.error || "Oops! We encountered an issue. Please retry in a bit."
      );
    }
  };

  return (
    <div className="bg-slate-100 ">
      <div className="py-6 px-2 m-auto lg:w-[35rem] gap-3 flex flex-col">
        <h1 className="text-center xl:text-lg md:text-sm  ">
          Subscribe for Insights, Updates, and More!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="lg:flex border border-gray-300 focus-within:border-primary rounded-lg gap-3 bg-white px-4 py-2 "
        >
          <input
            type="email"
            placeholder="Enter Your Mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block bg-none w-full px-3 py-2 rounded-md focus:outline-none  xl:text-lg sm:text-sm max-md:mb-4"
          />
          <button
            type="submit"
            className="py-2 px-5 max-md:text-xs bg-yellow-600 transition max-md:w-full delay-75 text-white font-semibold rounded-md hover:shadow-md hover:bg-white hover:text-yellow-600 cursor-none"
          >
            Subscribe
          </button>
        </form>
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
      <ToastContainer />
    </div>
  );
};

export default Footer;
