// // import { motion, useMotionValue, useSpring } from "framer-motion";
// import { motion, useMotionValue } from "framer-motion";
// import { useEffect } from "react";

// const Cursor = () => {
//   const cursorsize = 20;
//   const mouse = {
//     x: useMotionValue(0),
//     y: useMotionValue(0),
//   };

//   // const smoothMouse = {
//   //   x: useSpring(mouse.x),
//   //   y: useSpring(mouse.y),
//   // };

//   const manageMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     mouse.x.set(clientX - cursorsize / 1);
//     mouse.y.set(clientY - cursorsize / 4);
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", manageMouseMove);
//     return () => window.removeEventListener("mousemove", manageMouseMove);
//   });

//   // const variants = {
//   //   default: {
//   //     x: mousePosition.x - 16,
//   //     y: mousePosition.y - 16,
//   //     transition: {
//   //       type: "spring",
//   //       damping: 20,
//   //       stiffness: 150,
//   //       delay: 0.2,
//   //       ease: "easeInOut",
//   //     },
//   //   },
//   // };

//   return (
//     <motion.div
//       className="cursor z-[9999]"
//       style={{ left: mouse.x, top: mouse.y }}
//     />
//   );
// };

// export default Cursor;
