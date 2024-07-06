
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-router-dom';
import { logo } from "../assets";

const Footer = () => {
  return (
    <div className="bg-slate-100 ">
      <div className="flex flex-col gap-4 lg:flex-row items-center justify-between p-6 lg:p-10">
        <div className="mb-4 lg:mb-0">
          <img src={logo} alt="logo" width={150} />
        </div>
        <div className="mb-4 lg:mb-0">
          <ul className='flex flex-col lg:flex-row gap-3 text-sm text-center lg:text-left'>
            <AnchorLink href='#hero' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Home</AnchorLink>
            <Link to={'/Aboutus'} className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>About Us</Link>
            <AnchorLink href='#service' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Services</AnchorLink>
            <AnchorLink href='#program' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Program</AnchorLink>
            <AnchorLink href='#testimonials' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Testimonials</AnchorLink>
            <AnchorLink href='#blog' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Blogs</AnchorLink>
          </ul>
        </div>
        <div className='flex gap-2 flex-wrap'>
          <input type="text" placeholder="Enter Your Mail for News Letter" className=' placeholder:text-slate-600 xl:placeholder:text-sm xl:p-1 xl:px-2 p-2 border-gray-400 border bg-transparent outline-none text-slate-900 bg-slate-200'/>
          <button className='delay-75 px-4 py-2 rounded text-slate-100 xl:text-sm bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600 m-auto'>Subscribe</button>
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