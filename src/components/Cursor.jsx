import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const Cursor = () => {
  const cursorsize = 20;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorsize / 1);
    mouse.y.set(clientY - cursorsize / 4);
  };

  useEffect(() => {
    // Hide the default cursor
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  });

  return (
    <motion.div
      className="cursor z-[10000]"
      style={{
        left: mouse.x,
        top: mouse.y,
      }}
    />
  );
};

export default Cursor;
