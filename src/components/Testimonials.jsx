import Person from '../assets/heroImage.jpg'
import quote from '../assets/quote1.svg'


const Testimonials = () => {
  return (
    <div className="w-full bg-[#E8E8E8] flex items-center justify-evenly mb-20 p-10">
      <div className="flex flex-col gap-4 mt-18">
        <h4 className="text-black text-2xl font-semibold">Testimonials</h4>
        <h1 className="text-4xl w-96 font-[600]">Dont believe us.Check what client Think of Us</h1>
        <span className="bg-yellow-600 rounded-full w-6 h-6"></span>
      </div>
      {/* cards */}
      <div className="flex gap-28 ">
        <div className='flex flex-col items-center gap-2 bg-slate-600 p-2 py-4 shadow-3xl rounded-xl'>
          <img src={Person} width={50} height={100}  className='rounded-full w-20 h-20 object-cover'/>
          <img src={quote} width={20} className='mt-6' />
          <h1 className='text-xl font-semibold text-yellow-600'>Lingu Maria</h1>
          <p className=' text-fuchsia-100 -mt-2'>Web Design</p>
          <p className='w-60 leading-4 text-[12px] text-white p-4 -mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias</p>
        </div>
        <div className='flex flex-col items-center gap-2 bg-slate-600 p-2 py-4 shadow-3xl rounded-xl'>
          <img src={Person} width={50} height={100}  className='rounded-full w-20 h-20 object-cover'/>
          <img src={quote} width={20} className='mt-6' />
          <h1 className='text-xl font-semibold text-yellow-600'>Lingu Maria</h1>
          <p className=' text-fuchsia-100 -mt-2'>Web Design</p>
          <p className='w-60 leading-4 text-[12px] text-white p-4 -mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
