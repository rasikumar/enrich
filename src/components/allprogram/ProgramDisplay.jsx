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
      title: 'Strategic Thinking and Toolbox',
      content: 'Customized for decision makers and problem solvers eager to sharpen their strategic thinking abilities and drive organizational success.',
      img: Communicationmastery
    },{
      id: 3,
      title: 'Faculty Development Program:',
      content: 'Equip educators with advanced teaching methods, counseling skills, and techniques for managing work-life balance to enhance their effectiveness and well-being.',
      img: Communicationmastery
    },{
      id: 4,
      title: 'Goal Setting and Planning:',
      content: 'Develop strategic goal-setting abilities and effective planning techniques for achieving personal and professional goals.',
      img: Communicationmastery
    },{
      id: 5,
      title: 'POSH Awareness',
      content: 'Ensure workplace respect and compliance through knowledge and skills for preventing sexual harassment.',
      img: Communicationmastery
    },{
      id: 6,
      title: 'Time Management',
      content: 'Optimize productivity and work-life balance with practical strategies for task prioritization and goal achievement.',
      img: Communicationmastery
    },{
      id: 7,
      title: 'Stress and Anxiety Management',
      content: 'Learn effective techniques to manage stress and anxiety for improved mental health and well-being.',
      img: Communicationmastery
    },{
      id: 8,
      title: 'Women Empowerment',
      content: 'Empower girl students with skills and strategies for personal growth, self-confidence, and career success.',
      img: Communicationmastery
    },{
      id: 9,
      title: 'Empowering Habit Formation',
      content: 'Cultivate positive habits to support personal growth and success with practical habit-building strategies.',
      img: Communicationmastery
    },{
      id: 10,
      title: 'Global Wisdom for Self-Improvement',
      content: 'Explore diverse cultural insights, including Japanese techniques, for enhancing personal and workplace efficiency.',
      img: Communicationmastery
    },{
      id: 11,
      title: 'Mid-Life/Mid-Career Identity Crisis Management',
      content: 'Navigate and overcome mid-life or mid-career challenges with confidence. Gain insights and strategies to redefine your goals, embrace change, and achieve personal fulfillment.',
      img: Communicationmastery
    },{
      id: 12,
      title: 'Brain Optimization',
      content: 'Enhance cognitive function and mental performance. Learn techniques for improving memory, focus, and overall brain health to boost personal and professional productivity.',
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
      <div className="px-4 py-8 grid w-[70%] m-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <h2 className="text-2xl text-white mb-2 leading-[26px] font-bold">{program.title}</h2>
              <p className="text-gray-300 leading-[20px] font-medium">{program.content}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProgramDisplay;