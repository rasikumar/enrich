import Logo from '../assets/logo.png'
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-slate-100 ">
        <div className="flex items-center justify-between p-10">
            <div>
                <img src={Logo} alt="logo" width={200}  />
            </div>
            <div>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Program</li>
                    <li>Testimonials</li>
                    <li>Blogs</li>
                </ul>
            </div>
            <div>
                <div>
                    <ul>
                        <li><a href=''><FaInstagram/></a></li>
                        <li><a href=''><FaWhatsapp/></a></li>
                        <li><a href=''><CiLinkedin/></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='bg-yellow-600 p-5'>
            <div className=' m-auto  bg-black w-fit'>
                <input type="text" placeholder="Enter Your Mail" className='border-none px-8 bg-transparent text-white py-2 outline-none'  />
                <button className='bg-white py-4 px-8 rounded-r-sm'>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default Footer