import { useEffect, useState } from "react";
// import Lenis from 'lenis';
import { SquareLoader } from "react-spinners";
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Heart from './components/Heart';
import BlogDetails from './components/blogpages/BlogDetails';
import ProgramDisplay from './components/allprogram/ProgramDisplay';
import AboutUs from './components/AboutUs';
import BlogDisplay from './components/blogpages/BlogDisplay';
import Navbar from './components/Navbar';
import ScrollTop from './components/ScrollTop';
import ServiceDetails from "./components/allservice/ServiceDetails";

const App = () => {
  const location = useLocation();

  // Smooth scrolling using Lenis
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  // Preloading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="scroll-smooth">
      {loading ? (
        <SquareLoader
          color={'yellow'}
          loading={loading}
          size={50}
          className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full h-full z-[1000]"
        />
      ) : (
        <>
          <AnimatePresence>
            <Navbar />
            <ScrollTop />
            <Routes location={location} key={location.pathname}>
              <Route index path='/' element={<Heart />} />
              <Route path='/BlogsList/:id' element={<BlogDetails />} />
              <Route path='/Aboutus' element={<AboutUs />} />
              <Route path='/ProgramDisplay' element={<ProgramDisplay />} />
              <Route path='/BlogDisplay' element={<BlogDisplay />} />
              {/* blogarticles */}
              <Route path='/BlogsList/:id' element={<BlogDetails />} />
              {/* service */}
              <Route path="/ServiceList/:id" element={<ServiceDetails/>}/>
            </Routes> 
          </AnimatePresence>
        </>
      )} 
    </div>
  );
};

export default App;
