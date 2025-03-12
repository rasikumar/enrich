/* eslint-disable react/prop-types */
import { Quote } from "lucide-react"; // Importing Lucide-react for a quote icon

const SliderCard = ({ name, position, feedback, img }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border  max-w-sm mx-auto">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <img
          src={img}
          alt={name}
          className="w-16 h-16 rounded-full border-2 border-primary shadow-md"
        />
        <p className="mt-3 text-lg font-semibold text-gray-800">{name}</p>
        {position && <p className="text-sm text-primary">{position}</p>}
      </div>

      {/* Feedback Section */}
      <div className="relative mt-4 bg-gray-100 p-4 rounded-lg text-center">
        <Quote className="absolute -top-3 left-3 text-gray-400 w-5 h-5" />
        <p className="text-sm text-gray-700 leading-relaxed max-md:line-clamp-4">
          {feedback}
        </p>
      </div>
    </div>
  );
};

export default SliderCard;
