// import { FaInstagram } from "react-icons/fa";
// import { FaWhatsapp } from "react-icons/fa";
// import { CiLinkedin } from "react-icons/ci";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { logo } from "../assets";

import "react-toastify/ReactToastify.css";

const Footer = () => {
  return (
    <div className="bg-slate-100 ">
      <div className="flex flex-col bg-slate-300">
        {/* <div className="flex flex-col gap-4 lg:flex-row items-center justify-between p-6 lg:p-10 lg:py-6"> */}
        <div className="flex flex-col gap-4 -mb-4 items-center justify-between p-6 lg:p-10 lg:py-6">
          <img src={logo} alt="logo" width={150} loading="lazy" />
        </div>

        {/* <div>
            <ul className="flex justify-center lg:justify-end gap-4 text-3xl">
              <li>
                <a
                  href="https://www.instagram.com/enrichminds4u/"
                  target="_blank"
                  className="text-black-700 hover:text-yellow-600 transition delay-100"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+919900976464?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20your%20company."
                  target="_blank"
                  className="text-black-700 hover:text-yellow-600 transition delay-100"
                >
                  <FaWhatsapp />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/enrichminds-consulting/"
                  target="_blank"
                  className="text-black-700 hover:text-yellow-600 transition delay-100"
                >
                  <CiLinkedin />
                </a>
              </li>
            </ul>
          </div> */}
        {/* </div> */}

        <div className="md:flex items-center justify-between mx-[30px]">
          <h1 className="text-center p-4 text-sm">
            Copyright © {new Date().getFullYear()} EnrichMinds Consulting{" "}
            {/* <Link to={"/privacy-policy"} className="text-primary">
              Privacy & Policy
            </Link> */}
          </h1>
          <div className="mb-4 lg:mb-0 flex items-center justify-center">
            <ul className="md:flex md:gap-3 xl:text-lg md:text-sm text-xs text-center lg:text-left ">
              <AnchorLink
                href="/#hero"
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex text-sm"
              >
                Home
              </AnchorLink>
              <Link
                to={"/Aboutus"}
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex text-sm"
              >
                About Us
              </Link>
              <Link
                to={"/services"}
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex text-sm"
              >
                Services
              </Link>
              <Link
                to={"/ourprogram"}
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex text-sm"
              >
                Our Programs
              </Link>
              {/* <AnchorLink
                href="#testimonials"
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex"
              >
                Testimonials
              </AnchorLink> */}
              <Link
                to={"/insights"}
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer md:border-r-2 border-primary pr-2 h-5 items-center flex text-sm"
              >
                Insights Hub
              </Link>
              <Link
                to={"/privacy-policy"}
                className="text-black hover:text-yellow-700 transition delay-100 cursor-pointer h-5 items-center flex text-sm"
              >
                Privacy & Policy
              </Link>
            </ul>
          </div>
          <h1 className="text-center p-4 text-sm">
            Powered By{" "}
            <a
              href="https://evvisolutions.com/"
              className="text-primary"
              target="_blank"
            >
              Evvi Solutions
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
