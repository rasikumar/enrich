import { motion } from "framer-motion"
import { Communicationmastery } from "../../assets"
const ProgramDisplay = () => {
  const programs=[
    {
      id:1,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:2,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:3,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:4,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:5,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:6,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:7,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:8,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:9,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:10,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:11,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
    {
      id:12,
      title: 'Executive Leadership Mastery',
      content: 'Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.',
      img:Communicationmastery
    },
  ]
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}>
      <h1 className="bg-yellow-500 p-10 text-center font-semibold text-3xl">Programs</h1>
      <div className="grid grid-cols-3 p-20 gap-20 m-auto ">
        {programs.map((program, index)=>{
          return(
            <div key={index} className="w-96 m-auto">
              <h1>{program.title}</h1>
              <p>{program.content}</p>
              <img src={program.img} alt="" width={250} />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default ProgramDisplay
