
import heroImage from '../assets/heroImage.jpg';

const Hero = () => {
    

    return (
        <div className="bg-gradient-to-r to-yellow-100 from-yellow-200 p-4 md:p-10 py-16 flex flex-col-reverse md:flex-row justify-evenly items-center min-h-64 z-0 relative">
            <div className='w-full md:w-[480px] flex flex-col gap-6 items-start hero-content'>
                <h1 className='text-2xl md:text-4xl font-semibold'>Enrich Your Life From Scratch</h1>
                <p className='text-xs md:text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt beatae nam dolorum excepturi eligendi, provident dicta in nihil mollitia. Nostrum architecto, sint quas nulla alias distinctio molestias corrupti aperiam quam!</p>
                <button className='px-4 py-1 rounded text-slate-100 bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600 transition delay-75'>Book Appointment</button>
            </div>
            <div className="relative">
                <img 
                    src={heroImage} 
                    className='w-full md:w-80 h-auto md:h-80 object-cover rounded-lg shadow-2xl hover:shadow-none hover:scale-95 transition delay-75 -z-20 hero-image' 
                    alt="" 
                />
            </div>
        </div>
    );
}

export default Hero;