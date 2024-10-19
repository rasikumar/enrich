import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [isCookieRejected, setIsCookieRejected] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieAccepted");
    const cookieRejection = Cookies.get("cookieRejected");
    if (cookieConsent) {
      setIsCookieAccepted(true);
    } else if (cookieRejection) {
      setIsCookieRejected(true);
    }
  }, []);

  const acceptCookies = () => {
    const expireSeconds = 1; // Set the number of seconds until the cookie expires
    const expireDays = expireSeconds / (60 * 60 * 24); // Convert seconds to days for js-cookie
    Cookies.set("cookieAccepted", "true", { expires: expireDays });
    setIsCookieAccepted(true);
  };

  const rejectCookies = () => {
    const expireSeconds = 1; // Set the number of seconds until the cookie expires
    const expireDays = expireSeconds / (60 * 60 * 24); // Convert seconds to days for js-cookie
    Cookies.set("cookieRejected", "true", { expires: expireDays });
    setIsCookieRejected(true);
  };

  if (isCookieAccepted || isCookieRejected) return null;

  return (
    <div className="z-[100] fixed bottom-0 left-0 right-0 bg-primary text-white p-4 gap-4 flex flex-col">
      <p>
        We use cookies for the best user experience on our website, including to
        personalize content & offerings, to provide social media features and to
        analyze traffic. By clicking “Accept Cookies” you agree to our use of
        cookies.
        <Link
          to="/cookie-policy"
          title="Learn more about our Cookie Policy"
          className="underline"
        >
          Learn more about our Cookie Policy
        </Link>
      </p>
      <div className="flex gap-4">
        <button className="btn-primary w-fit" onClick={acceptCookies}>
          Accept Cookies
        </button>
        <button
          className="btn-secondary text-white w-fit"
          onClick={rejectCookies}
        >
          Reject All Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
