import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const ScrollAlert = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (!scrolling && !showAlert) {
        setScrolling(true);
        const newTimer = setTimeout(() => {
          setShowAlert(true);
          setScrolling(false);
        }, 1000); // 10 seconds
        setTimer(newTimer);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrolling(false);
        clearTimeout(timer);
        setTimer(null);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling, showAlert, timer]);

  const closeAlert = () => {
    setShowAlert(false);
    setScrolling(false);
    clearTimeout(timer);
    setTimer(null);
  };

  return (
    <div>
      {showAlert && (
        <div className="fixed bottom-20 right-10 flex flex-col gap-2 rounded-2xl shadow-custom border-4 bg-yellow-200 border-custom-white text-center p-4 w-[25%] z-50">
          <a className="flex justify-end cursor-pointer" onClick={closeAlert}>
            <IoCloseSharp />
          </a>
          <p className="font-bold">Want to take our Psychometric Webinar?</p>
          <a
            target="_blank"
            href="https://survey.evvisolutions.com/webinar/"
            className="bg-black text-yellow-500 px-4 py-2 rounded-lg mt-2 hover:bg-gray-200 hover:text-black transition"
          >
            Click me
          </a>
        </div>
      )}
    </div>
  );
};

export default ScrollAlert;
