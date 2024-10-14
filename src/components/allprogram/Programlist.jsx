import "./Program.css";
import {
  Communicationmastery,
  Emotionalintelligence,
  launchpad,
  personaleffective,
} from "../../assets";
import { Suspense } from "react";
const Skeleton = () => {
  return (
    <div className="w-full h-64 bg-gray-50 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    </div>
  );
};

const program = [
  {
    title: "Personal Effectiveness Power Pack",
    content:
      "Tailored for professionals seeking to enhance their personal and professional effectiveness and make a lasting impact",
    bgImg: personaleffective,
  },
  {
    title: "Communication Mastery Suite",
    content:
      "Designed for individuals aiming to improve their communication skills and cultivate meaningful connections in both personal and professional settings.",
    bgImg: Communicationmastery,
  },
  {
    title: "Emotional Intelligence Essentials",
    content:
      "Geared towards individuals looking to develop their emotional intelligence for greater self-awareness, resilience, and success in all areas of life.",
    bgImg: Emotionalintelligence,
  },
  {
    title: "Launchpad to Corporate Success",
    content:
      "Exclusive program to transform academic knowledge into professional skills, ensuring graduates are ready for the campus-to-corporate transition.",
    bgImg: launchpad,
  },
];

const Programlist = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <div className="flex flex-wrap w-full items-center m-auto gap-14 py-10 justify-center">
        {program.map((value, index) => {
          return (
            <div key={index} className="card-container">
              <img src={value.bgImg} alt={value.title} className="card-image" />
              <div className="card-icons"></div>
              <div className="card-content">
                <h1 className="text-[18px] text-white leading-5 mb-2 font-semibold text-center">
                  {value.title}
                </h1>
                <p className="text-[12px] text-white text-justify  ">
                  {value.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Suspense>
  );
};

export default Programlist;
