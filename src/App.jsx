import { Suspense, useEffect, useState, lazy } from "react";
// import Lenis from 'lenis';
import { SquareLoader } from "react-spinners";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Cursor from "./components/Cursor";

const Loader = () => {
  <div>
    <Loader />
  </div>;
};

const Heart = lazy(() => import("./components/Heart"));
const BlogDetails = lazy(() => import("./components/blogpages/BlogDetails"));
const ProgramDisplay = lazy(() =>
  import("./components/allprogram/ProgramDisplay")
);
// import AboutUs from "./components/AboutUs";
const Aboutus = lazy(() => import("./components/aboutus/Aboutus"));
const BlogDisplay = lazy(() => import("./components/blogpages/BlogDisplay"));
const Navbar = lazy(() => import("./components/Navbar"));
const ScrollTop = lazy(() => import("./components/ScrollTop"));
const Individuals = lazy(() =>
  import("./components/allservice/individuals/Individuals")
);
const Corporates = lazy(() =>
  import("./components/allservice/businesses/Businesses")
);
const Compliance = lazy(() =>
  import("./components/allservice/complianceTraining/Compliance")
);
const Footer = lazy(() => import("./components/Footer"));
const Services = lazy(() => import("./components/allservice/Services"));
const GetIn = lazy(() => import("./components/GetIn"));
const Psychometric = lazy(() =>
  import("./components/allservice/psychometric/Psychometric")
);
const NotFound = lazy(() => import("./components/NotFound"));
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
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Cursor />
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
            </Suspense>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;
