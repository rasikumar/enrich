import { useEffect, useState } from "react";
// import Lenis from 'lenis';
import { SquareLoader } from "react-spinners";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy } from "react";

const Heart = lazy(() => import("./components/Heart"));
import BlogDetails from "./components/blogpages/BlogDetails";
import ProgramDisplay from "./components/allprogram/ProgramDisplay";
// import AboutUs from "./components/AboutUs";
import Aboutus from "./components/aboutus/Aboutus";
import BlogDisplay from "./components/blogpages/BlogDisplay";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import Individuals from "./components/allservice/individuals/Individuals";
import Corporates from "./components/allservice/businesses/Businesses";
import Compliance from "./components/allservice/complianceTraining/Compliance";
import Footer from "./components/Footer";
import Services from "./components/allservice/Services";
import GetIn from "./components/GetIn";
import Psychometric from "./components/allservice/psychometric/Psychometric";
import NotFound from "./components/NotFound";

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
    }, 10);
  }, []);

  return (
    <div className="scroll-smooth">
      {loading ? (
        <SquareLoader
          color={"yellow"}
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
              <Route index path="/" element={<Heart />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ourprogram" element={<ProgramDisplay />} />
              <Route path="/contactus" element={<GetIn />} />

              <Route path="/ProgramDisplay" element={<ProgramDisplay />} />
              {/* blogarticles */}
              <Route path="/BlogsList/:id" element={<BlogDetails />} />
              <Route path="/BlogDisplay" element={<BlogDisplay />} />
              <Route path="/BlogsList/:id" element={<BlogDetails />} />
              {/* service */}
              <Route path="/individuals" element={<Individuals />} />
              <Route path="/corporates" element={<Corporates />} />
              <Route path="/compliance-training" element={<Compliance />} />
              <Route path="/psychometric" element={<Psychometric />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;
