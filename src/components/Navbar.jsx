import AnchorLink from 'react-anchor-link-smooth-scroll';
import navLogo from '../assets/logo.svg'
import  { useState, useEffect } from 'react';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Adjust breakpoint as needed
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sticky top-6 w-[80%] text-sm ml-auto mr-auto z-[1000]">
      <nav className="xl:text-lg flex items-center justify-between p-5 rounded-md bg-white/70 shadow-md border-[1px] border-yellow-600">
        <div className="logo flex gap-1 cursor-pointer">
          <img src={navLogo} width={20} alt="logo" />
          Enrich
        </div>
        <div className="list-items hidden lg:flex ">
          <ul>
            <li className="flex gap-6  text-black tracking-wide">
              <AnchorLink href='#hero' className='hover:text-yellow-600 transition delay-75' >Home</AnchorLink>
              <AnchorLink href='#serivce' className='hover:text-yellow-600 transition delay-75' >Services</AnchorLink>
              <AnchorLink href='#' className='hover:text-yellow-600 transition delay-75' >Pricing</AnchorLink>
              <AnchorLink href='#testimonials' className='hover:text-yellow-600 transition delay-75' >Testimonials</AnchorLink>
            </li>
          </ul>
        </div>
        <div className="cta-btn hidden lg:flex items-center justify-center gap-4">
          <AnchorLink href='#blog' className='hover:text-yellow-600 transition delay-75 border-[1px] py-[0.10rem] px-[1.5rem] rounded-sm border-yellow-700' >Blogs</AnchorLink>
          <button className='delay-75 px-4 py-1 rounded text-slate-100 bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600'>Free Trial</button>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden`}>
        <ul className="flex flex-col gap-6 p-5 bg-white/70 border-[1px] border-yellow-600 rounded-md">
          <li><AnchorLink href='#hero' className='hover:text-yellow-600 transition delay-75' >Home</AnchorLink></li>
          <li><AnchorLink href='#serivce' className='hover:text-yellow-600 transition delay-75' >Services</AnchorLink></li>
          <li><AnchorLink href='#' className='hover:text-yellow-600 transition delay-75' >Pricing</AnchorLink></li>
          <li><AnchorLink href='#testimonials' className='hover:text-yellow-600 transition delay-75' >Testimonials</AnchorLink></li>
          <li><AnchorLink href='#blog' className='hover:text-yellow-600 transition delay-75 border-[1px] py-[0.10rem] px-[1.5rem] rounded-sm border-yellow-700' >Blogs</AnchorLink></li>
          <li><button className='delay-75 px-4 py-1 rounded text-slate-100 bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600'>Free Trial</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;