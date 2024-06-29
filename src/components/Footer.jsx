import Logo from '../assets/logo.png'
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Footer = () => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10">
        <div className="mb-4 lg:mb-0">
          <img src={Logo} alt="logo" width={150} />
        </div>
        <div className="mb-4 lg:mb-0">
          <ul className='flex flex-col lg:flex-row gap-3 text-center lg:text-left'>
            <AnchorLink href='#hero' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Home</AnchorLink>
            <AnchorLink href='#about' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>About Us</AnchorLink>
            <AnchorLink href='#serivce' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Services</AnchorLink>
            <AnchorLink href='#program' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Program</AnchorLink>
            <AnchorLink href='#testimonials' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Testimonials</AnchorLink>
            <AnchorLink href='blog' className='text-black hover:text-yellow-700 transition delay-100 cursor-pointer'>Blogs</AnchorLink>
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
      <div className='bg-yellow-600 w-full p-5'>
        <div className='m-auto bg-slate-900 w-full md:w-fit flex flex-col md:flex-row justify-center items-center'>
          <input type="text" placeholder="Enter Your Mail" className='border-none px-8 bg-transparent text-white py-2 outline-none mb-4 md:mb-0 md:mr-4 w-full md:w-auto' />
          <button className='bg-white py-4 px-8 rounded-r-sm hover:bg-slate-200 transition delay-100 w-full md:w-auto'>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Footer;