import { motion } from "framer-motion";
import { Communicationmastery } from "../../assets";

const ProgramDisplay = () => {
  const programs = [
    {
      id: 1,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 2,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 3,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 4,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 5,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 6,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 7,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 8,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 9,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 10,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 11,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },{
      id: 12,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },
    // Repeat for other programs...
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100"
    >
      <h1 className="bg-yellow-500 p-10 text-center font-semibold text-3xl text-gray-800 shadow-md">
        Programs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 py-10 gap-10">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img src={program.img} alt={program.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{program.title}</h2>
              <p className="text-gray-700 mb-4">{program.content}</p>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProgramDisplay;
