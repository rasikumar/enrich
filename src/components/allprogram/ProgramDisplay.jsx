import { motion } from "framer-motion";
import { Communicationmastery } from "../../assets";

const ProgramDisplay = () => {
  const programs = [
    {
      id: 1,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img: Communicationmastery
    },
    {
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
      title: '11Executive Leadership Mastery',
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
      
    >
      <h1 className="bg-yellow-500 p-10 text-center font-semibold text-3xl">
        Our Programs
      </h1>
      <div className="px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <motion.img
              src={program.img}
              alt={program.title}
              className="w-full h-64 object-cover rounded-t-lg"
              whileHover={{ scale: 1.1 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 text-white p-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{program.title}</h2>
              <p className="text-gray-300">{program.content}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProgramDisplay;