
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-router-dom';
import { logo } from "../assets";

const Footer = () => {
  return (
    <div className="bg-slate-100 ">
      <div className='py-6 px-2 m-auto xl:w-96 md:w-96 gap-3 flex flex-col'>
        <h1 className="text-center xl:text-lg md:text-sm  ">Subcribe and get Our Newsletters</h1>
          <input type="text" placeholder="Enter Your Mail" className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm'/>
          <button className='delay-75 px-4 py-2 w-full btn-primary rounded text-slate-100 xl:text-sm bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600 m-auto'>Subscribe</button>
        </div>
      <div className="flex bg-gray-300 flex-col gap-4 lg:flex-row items-center justify-between p-6 lg:p-10 lg:py-6">
        <div className="mb-4 lg:mb-0">
          <img src={logo} alt="logo" width={150} />
        </div>
        <div className="mb-4 lg:mb-0">
          <ul className='flex flex-col lg:flex-row gap-3 xl:text-lg text-sm text-center lg:text-left '>
            <AnchorLink href='#hero' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer border-r-2 border-primary pr-2 h-5 items-center flex'>Home</AnchorLink>
            <Link to={'/Aboutus'} className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer border-r-2 border-primary pr-2 h-5 items-center flex'>About Us</Link>
            <AnchorLink href='#service' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer border-r-2 border-primary pr-2 h-5 items-center flex'>Services</AnchorLink>
            <AnchorLink href='#program' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer border-r-2 border-primary pr-2 h-5 items-center flex'>Program</AnchorLink>
            <AnchorLink href='#testimonials' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer border-r-2 border-primary pr-2 h-5 items-center flex'>Testimonials</AnchorLink>
            <AnchorLink href='#blog' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer h-5 items-center flex'>Blogs</AnchorLink>
          </ul>
        </div>
        <div>
          <ul className='flex justify-center lg:justify-end gap-4 text-3xl'>
            <li><a href='' className='text-black-700 hover:text-yellow-600 transition delay-100'><FaInstagram /></a></li>
            <li><a href='' className='text-black-700 hover:text-yellow-600 transition delay-100'><FaWhatsapp /></a></li>
            <li><a href='' className='text-black-700 hover:text-yellow-600 transition delay-100'><CiLinkedin /></a></li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Footer;