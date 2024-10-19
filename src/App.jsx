/* eslint-disable react/prop-types */
import { Suspense, useEffect, useState, lazy } from "react";
import { SquareLoader } from "react-spinners";
// import Lenis from "lenis";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Cursor from "./components/Cursor";
import BookSession from "./components/BookSession";
import CookieBanner from "./components/CookieBanner";
import CookiePolicy from "./components/Cookie-policy";

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
// admin

const Login = lazy(() => import("./components/Admin/Login"));
const Admindashboard = lazy(() => import("./components/Admin/Admindashboard"));
const ForgotPassword = lazy(() => import("./components/Admin/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/Admin/resetPassword"));

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

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
  const hideHeaderAndFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/forgotpassword") ||
    location.pathname.startsWith("/resetPassword");

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("jwtToken") ? true : false;
  });

  const handleLogin = () => setIsAuthenticated(true);

  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  const handleOpenPolicy = () => setShowCookiePolicy(true);
  const handleClosePolicy = () => setShowCookiePolicy(false);

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
              {!hideHeaderAndFooter && (
                <Suspense fallback={<Loader />}>
                  <Navbar onOpenPolicy={handleOpenPolicy} />
                  <BookSession />
                </Suspense>
              )}
              {!hideHeaderAndFooter && (
                <Suspense fallback={<Loader />}>
                  <CookieBanner />
                </Suspense>
              )}
              <ScrollTop />

              {showCookiePolicy && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Suspense fallback={<Loader />}>
                      <CookiePolicy />
                    </Suspense>
                    <button
                      className="mt-4 p-2 bg-primary text-white rounded"
                      onClick={handleClosePolicy}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <Routes location={location} key={location.pathname}>
                <Route index path="/" element={<Heart />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/services" element={<Services />} />
                <Route path="/ourprogram" element={<ProgramDisplay />} />
                <Route path="/contactus" element={<GetIn />} />
                <Route path="/ProgramDisplay" element={<ProgramDisplay />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                {/* blogarticles */}
                <Route path="/BlogsList/:id" element={<BlogDetails />} />
                <Route path="/BlogDisplay" element={<BlogDisplay />} />
                <Route path="/BlogsList/:id" element={<BlogDetails />} />

                {/* service */}
                <Route path="/individuals" element={<Individuals />} />
                <Route path="/corporates" element={<Corporates />} />
                <Route path="/compliance-training" element={<Compliance />} />
                <Route path="/psychometric" element={<Psychometric />} />

                <Route
                  path="/admin"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/admindashboard" />
                    ) : (
                      <Login onLogin={handleLogin} />
                    )
                  }
                />
                <Route
                  path="/admindashboard"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Admindashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
              {!hideHeaderAndFooter && (
                <Suspense fallback={<Loader />}>
                  <Footer />
                </Suspense>
              )}
            </Suspense>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;
