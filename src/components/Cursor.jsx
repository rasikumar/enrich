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
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  });

  return (
    <motion.div
      className="cursor z-[9999]"
      style={{
        left: mouse.x,
        top: mouse.y,
        cursor: "none !important", // Ensure cursor is hidden with !important
      }}
    />
  );
};

export default Cursor;
