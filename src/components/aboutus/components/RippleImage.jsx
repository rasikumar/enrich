/* eslint-disable react/prop-types */
import { useState } from "react";
import "./RippleEffect.css"; // Import the CSS for styling

const RippleImage = ({ src, alt }) => {
  const [ripples, setRipples] = useState([]);

  // Function to handle the mouse movement
  const handleMouseMove = (e) => {
    const image = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - image.left;
    const y = e.clientY - image.top;

    // Create a new ripple and add it to the state
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    // Remove the ripple after 600ms
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="ripple-effect" onMouseMove={handleMouseMove}>
      <img src={src} alt={alt} className="rounded-2xl" />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x - 20, // Offset by half the ripple size
            top: ripple.y - 20, // Offset by half the ripple size
          }}
        />
      ))}
    </div>
  );
};

export default RippleImage;
