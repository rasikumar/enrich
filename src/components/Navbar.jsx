import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { logo } from '../assets';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 520) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`sticky top-6 w-[80%] text-sm ml-auto mr-auto z-[1000] rounded-md ${scroll ? 'bg-white' : 'bg-white/50'}`}>
      <nav className="xl:text-lg flex items-center justify-between p-5 rounded-md shadow-md border-[1px] border-yellow-600">
        <div className="logo flex gap-1 cursor-pointer">
          <Link to={'/'}>
            <img src={logo} width={100} alt="logo" />
          </Link>
        </div>
        <div className="list-items hidden lg:flex">
          <ul>
            <li className="flex gap-6 text-black tracking-wide">
              <Link to={'/'} className='hover:text-yellow-600 transition delay-75 xl:text-lg md:text-sm' onClick={closeMenu}>Home</Link>
              <Link to={'/Aboutus'} className='hover:text-yellow-600 transition delay-75 md:text-sm xl:text-lg' onClick={closeMenu}>About us</Link>
              <AnchorLink href='#service'><Link to={'/'} className='hover:text-yellow-600 transition delay-75 md:text-sm xl:text-lg' onClick={closeMenu}>Services</Link> </AnchorLink>
              <Link to={'/ProgramDisplay'} className='hover:text-yellow-600 transition delay-75 md:text-sm xl:text-lg' onClick={closeMenu}>Program</Link>
              <AnchorLink href='#testimonials'><Link to={'/'}  className='hover:text-yellow-600 transition delay-75 md:text-sm xl:text-lg' onClick={closeMenu}>Testimonials</Link></AnchorLink>
            </li>
          </ul>
        </div>
        <div className="cta-btn hidden lg:flex items-center justify-center gap-4">
          <Link to={'/BlogDisplay'} className='hover:text-yellow-600 transition delay-75 border-[1px] py-[0.10rem] px-[1.5rem] rounded-sm border-yellow-700 md:text-sm xl:text-lg' onClick={closeMenu}>Blogs</Link>
          <AnchorLink href='#getIn'><Link to={'/'} className='delay-75 px-4 py-1 rounded text-slate-100 bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600 md:text-sm xl:text-lg'>Get In Touch</Link></AnchorLink>
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
          <li><Link to={'/'} className='hover:text-yellow-600 transition delay-75' onClick={closeMenu}>Home</Link></li>
          <li><Link to={'/Aboutus'} className='hover:text-yellow-600 transition delay-75 md:text-sm' onClick={closeMenu}>About us</Link></li>
          <li><AnchorLink href='#service'><Link to={'/'} className='hover:text-yellow-600 transition delay-75 md:text-sm xl:text-lg' onClick={closeMenu}>Services</Link> </AnchorLink></li>
          <li><Link to={'/ProgramDisplay'} className='hover:text-yellow-600 transition delay-75' onClick={closeMenu}>Program</Link></li>
          <li><AnchorLink href='#testimonials'><Link to={'/'}  className='hover:text-yellow-600 transition delay-75 md:text-sm xl:text-lg' onClick={closeMenu}>Testimonials</Link></AnchorLink></li>
          <li><Link to={'/BlogDisplay'} className='hover:text-yellow-600 transition delay-75 border-[1px] py-[0.10rem] px-[1.5rem] rounded-sm border-yellow-700' onClick={closeMenu}>Blogs</Link></li>
          <li><AnchorLink href='#getIn'><Link to={'/'} className='delay-75 px-4 py-1 rounded text-slate-100 bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600 md:text-sm xl:text-lg'>Get In Touch</Link></AnchorLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
