import { Link } from "react-router-dom"
import Programlist from "./Programlist"
import { motion } from "framer-motion"
// import gsap from "gsap";
// import { SplitText } from "gsap/all";
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(SplitText, ScrollTrigger);

// let mySplitText = new SplitText(".split",{type:"chars"})

// gsap.from(mySplitText,{
//   yPercent : 130,
//   stagger : 0.5,
//   ease : 'back.inOut',
//   duration : 1,
//   scrollTrigger : {
//     trigger : ".split",
//     start : "top 80%",
//     markers : true
//   }
// })

const Program = () => {
  return (
    <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
         id="program" className="flex flex-col items-center p-3 bg-slate-50">

      <div className='flex flex-col gap-4 px-10'>
        <h2 className="text-black text-4xl font-semibold text-center ">Programs</h2>
        <h2 className='text-center xl:text-2xl text-xl w-full font-[600]'>Explore our programs</h2>
        <p className="text-sm xl:text-lg text-gray-500 md:w-[80%] m-auto">Explore our bestselling programs designed to enhance your skills and empower your success. Click below to discover more about these transformative offerings.</p>
      </div>
      <Programlist/>
      <p className="p-4 text-gray-700 xl:text-base text-sm">Discover our full range of programs designed to meet your unique needs and goals.</p>
      <Link to={'/ProgramDisplay'}>
        <button className="btn-primary">Know more</button>
      </Link>
    </motion.div> 
  )
}

export default Program