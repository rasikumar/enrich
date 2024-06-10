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
    <div id="program" className="flex flex-col items-center p-10 bg-slate-50">
      <h2 className="text-2xl font-bold mt-2 xl:text-4xl mb-8">Programs</h2>
      <p className="text-sm text-gray-500 split">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic esse adipisci itaque amet quam dicta quia, doloribus nisi harum maxime non </p>
      <Programlist/>
    </div>
  )
}

export default Program