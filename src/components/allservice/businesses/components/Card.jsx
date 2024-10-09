/* eslint-disable react/prop-types */

import { useState } from "react";

export const Card = ({ image, title, content }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex flex-col w-[16rem] h-72 m-auto p-5 bg-gradient-to-b from-primary to-black gap-4 md:mr-10 mr-2 rounded-sm mt-10 mb-28 border"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`flex items-center justify-center mt-4 `}>
        <img
          src={image}
          alt={title}
          width={100}
          height={100}
          className={`rounded-full transition-all ${
            hover ? "md:w-[200px]" : ""
          }`}
        />
      </div>
      <div
        className={`${
          hover ? "md:opacity-0" : "opacity-100"
        } flex flex-col gap-4`}
      >
        <h1 className="text-center font-medium text text-secondary">{title}</h1>
        <p className="text-justify text-sm text-white">{content}</p>
      </div>
    </div>
  );
};
