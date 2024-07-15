import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { awarnessImage, listeningImage, retreatImage, valuableImage } from '../../assets';
import { useState } from 'react';

const updates = [
  {
    id: 1,
    title: "Retreat",
    description: "A retreat is a process of temporary break from one's usual life or routine to seek comfort, reflect on oneself. It often involves secluded environments, away from distractions, that promote the development of new skills.",
    imageUrl: retreatImage,
    author: 'Shanthi',
    date: "February 5, 2023",
  },
  {
    id: 2,
    title: "Valuable",
    description: "Valuable is the ultimate word which indicates that the Something that has worth is valuable. Often, valuable things are worth money, but a spy can provide valuable information that might save lives.",
    imageUrl: valuableImage,
    author: 'Shanthi',
    date: "February 5, 2023",
  },
  {
    id: 3,
    title: "Active listening",
    description: "Imagine this: you're in a pivotal team meeting. Your colleagues are sharing ideas, thoughts, and concerns. You're not just hearing their words; you're understanding their emotions, needs, and motivations.",
    imageUrl: listeningImage,
    author: 'Shanthi',
    date: "February 5, 2023",
  },
  {
    id: 4,
    title: "Self-Awareness",
    description: "Why Self-Awareness is Our Superpower: Imagine this: You're in a meeting, leading your team. The room buzzes with ideas, and emotions run high. In that moment, self-awareness is your compass.",
    imageUrl: awarnessImage,
    author: 'Shanthi',
    date: "February 5, 2023",
  },
];

// eslint-disable-next-line react/prop-types
const Card = ({ title, description, author, date, category, imageUrl }) => {
  return (
    <div className="max-w-4xl gap-2 w-full flex flex-col md:flex-row border rounded overflow-hidden m-2">
      <img className="w-full md:w-1/2 object-cover" src={imageUrl} alt={title} />
      <div className="w-full md:w-1/2 p-4">
        <div className="text-xs text-red-600 font-bold mb-2">{category}</div>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-4 line-clamp-5">{description}</p>
        <div className="text-gray-600 text-sm">
          <span className="block">{author}</span>
          <span className="block">{date}</span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % updates.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + updates.length) % updates.length);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center md:justify-start">
        <div className="flex flex-wrap md:flex-nowrap overflow-hidden">
          {updates.slice(currentIndex, currentIndex + 2).map((update, index) => (
            <Card key={index} {...update} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-center gap-4 mt-4">
        <GrFormPrevious className="cursor-pointer" onClick={prev} size={24} />
        <GrFormNext className="cursor-pointer" onClick={next} size={24} />
      </div>
    </div>
  );
};

export default App;
