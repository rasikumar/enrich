/* eslint-disable react/prop-types */
import { Suspense, useState, lazy } from "react";
// import Lenis from "lenis";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BookSession from "./components/BookSession";
import CookieBanner from "./components/CookieBanner";
import CookiePolicy from "./components/Cookie-policy";

const Loader = () => {
  <div>
    <Loader />
  </div>;
};

const Heart = lazy(() => import("./components/Heart"));
// const BlogDetails = lazy(() => import("./components/blogpages/BlogDetails"));
const ProgramDisplay = lazy(() =>
  import("./components/allprogram/ProgramDisplay")
);
// import AboutUs from "./components/AboutUs";
const Aboutus = lazy(() => import("./components/aboutus/Aboutus"));
// const BlogDisplay = lazy(() => import("./components/blogpages/BlogDisplay"));
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

const Login = lazy(() => import("./components/auth/Login"));
const Admindashboard = lazy(() => import("./components/Admin/Admindashboard"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/Admin/resetPassword"));

// blogPages
const InsightPage = lazy(() => import("./components/feature/InsightPage"));
const BlogDetail = lazy(() => import("./components/feature/blog/BlogDetails"));
const BlogDetails = lazy(() =>
  import("./components/feature/safetynet/BlogDetails")
);
const BlogDetailss = lazy(() =>
  import("./components/feature/changeabit/BlogDetails")
);

// testing
// import Apps from "./components/Apps";
const Termsandcondtions = lazy(() =>
  import("./components/forms/Terms-and-condtions")
);
const PrivacyPolicy = lazy(() => import("./components/Policy"));
const BlogPage = lazy(() => import("./components/feature/blog/BlogPage"));
const ChangeABit = lazy(() =>
  import("./components/feature/changeabit/ChangeABitPage")
);
const SafetyNetPage = lazy(() =>
  import("./components/feature/safetynet/SafetyNetPage")
);
const FlotingApps = lazy(() => import("./components/FlotingApps"));
const EditBlog = lazy(() => import("./components/Admin/insight/blog/EditBlog"));
const EditChangABit = lazy(() =>
  import("./components/Admin/insight/changeabit/EditChangeABit")
);
const EditSafetyNet = lazy(() =>
  import("./components/Admin/insight/safetynet/EditBlog")
);
const Dashboard = lazy(() => import("./components/Admin/dashboard/dashboard"));
const Create = lazy(() => import("./components/Admin/insight/Create"));
const List = lazy(() => import("./components/Admin/insight/List"));
const CreateNewsLetter = lazy(() =>
  import("./components/Admin/newsletter/CreateNewsLetter")
);
const Members = lazy(() => import("./components/Admin/newsletter/Members"));
const ContactList = lazy(() => import("./components/Admin/contactList"));
const Comment = lazy(() => import("./components/Admin/insight/Comment"));
const Appointment = lazy(() =>
  import("./components/Admin/appointment/Appointment")
);
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const NotAuthorized = lazy(() => import("./components/auth/NotAuthorized"));
const SessionExpired = lazy(() => import("./components/auth/SessionExpired"));

// import Cursor from "./components/Cursor";

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
    location.pathname.startsWith("/resetPassword") ||
    location.pathname.startsWith("/dashboard")||
    location.pathname.startsWith("/session-expired")

  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  const handleOpenPolicy = () => setShowCookiePolicy(true);
  const handleClosePolicy = () => setShowCookiePolicy(false);

  return (
    <div className="scroll-smooth">
      <>
        {/* <Cursor /> */}
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader />}>
            {!hideHeaderAndFooter && (
              <Suspense fallback={<Loader />}>
                <Navbar onOpenPolicy={handleOpenPolicy} />
                <BookSession />
                <FlotingApps />
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* Admin */}
              <Route path="/admin" element={<Login />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Admindashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="createInsights" element={<Create />} />
                <Route path="listInsighs" element={<List />} />
                <Route path="Comment" element={<Comment />} />
                <Route path="createNewsLetter" element={<CreateNewsLetter />} />
                <Route path="members" element={<Members />} />
                <Route path="contactList" element={<ContactList />} />
                <Route path="Appointment" element={<Appointment />} />
              </Route>
              {/* editContent */}
              <Route path="/blog/edit/:id" element={<EditBlog />} />
              <Route path="/changeABit/edit/:id" element={<EditChangABit />} />
              <Route path="/safetyNet/edit/:id" element={<EditSafetyNet />} />
              {/* <Route path="/:type/delete/:id" element={<DeleteConfirmation />} /> */}

              {/* blogarticles */}
              <Route path="/insights" element={<InsightPage />} />

              <Route path="/insights/blog/:id" element={<BlogDetail />} />
              <Route path="/insights/blog" element={<BlogPage />} />

              <Route
                path="/insights/changeABit/:changeAbit_title"
                element={<BlogDetailss />}
              />
              <Route path="/insights/changeABit" element={<ChangeABit />} />

              <Route path="/insights/safetyNet/:id" element={<BlogDetails />} />
              <Route path="/insights/safetyNet" element={<SafetyNetPage />} />

              {/* service */}
              <Route path="/individuals" element={<Individuals />} />
              <Route path="/corporates" element={<Corporates />} />
              <Route path="/compliance-training" element={<Compliance />} />
              <Route path="/psychometric" element={<Psychometric />} />
              {/* <Route path="/Apps" element={<Apps />} /> */}
              {/* terms and conditions */}
              <Route
                path="/terms-and-conditions"
                element={<Termsandcondtions />}
              />

              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />

              <Route path="*" element={<NotFound />} />
              <Route path="not-authorized" element={<NotAuthorized />} />
              <Route path="session-expired" element={<SessionExpired />} />
            </Routes>
            {!hideHeaderAndFooter && (
              <Suspense fallback={<Loader />}>
                <Footer />
              </Suspense>
            )}
          </Suspense>
        </AnimatePresence>
      </>
    </div>
  );
};

export default App;
