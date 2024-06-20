/* eslint-disable react/no-unknown-property */

export default function Content() {
  return (
    <div className='bg-gradient-to-r to-[#D4F2D2] from-[#f3fff3] py-8 px-12 h-[100%]  w-full flex flex-col justify-between '>
        <Section1 />
        <Section2 />
        <Section3 />
    </div>
  )
  }
  
  const Section1 = () => {
      return (
        <div>
            <Nav />
        </div>
    )
    }
    
const Section2 = () => {
    return (
        <div className='flex justify-between items-end'>
            <h1 className='text-[6vw]   '>Enrich your Mind</h1>
            <p>©copyright</p>
        </div>
    )
    }
    const Section3 =()=>{
        return(
            <button className="group btn-primary relative inline-flex h-12 w-40 items-center justify-center rounded-md bg-yellow-600 px-6 font-medium text-neutral-200"><span>Free Trail</span><div className="ml-1 -rotate-45 transition-all duration-200 group-hover:rotate-0"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
        )
}
const Nav = () => {
    return (
        <div className='flex shrink-0 mt-[300px]'>
            <div className='flex  gap-2'>
                <a className=' uppercase text-black'>About</a>
                <a className="hover:text-white transition delay-75">Home</a>
                <a className="hover:text-white transition delay-75">Projects</a>
                <a className="hover:text-white transition delay-75">Our Mission</a>
                <a className="hover:text-white transition delay-75">Contact Us</a>
            </div>
            
        </div>
    )
}