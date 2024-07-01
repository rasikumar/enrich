import Programlist from "./Programlist"

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
    <div id="program" className="flex flex-col items-center p-3 bg-slate-50">
      <div className='flex flex-col gap-4 px-10'>
        <h2 className="text-black text-4xl font-semibold text-center ">Programs</h2>
        <h2 className='text-center text-2xl w-full font-[600]'>Explore our programs</h2>
        <p className="text-sm text-gray-500 md:w-[80%] m-auto">Whether you&apos;re an individual looking to flourish or a company ready to empower, Evvi Solutions offers a range of programs that cater to your aspirations. To explore our programs, or to discuss how we can customize a solution for your unique needs, reach out to us. Our dedicated coordinators are here to guide you on a transformational journey that aligns with your goals and vision.</p>
      </div>
      <Programlist/>
      <p className="p-4 text-gray-500">Discover our full range of programs designed to meet your unique needs and goals.</p>
      <button className="btn-primary">Know more</button>
    </div>
  )
}

export default Program