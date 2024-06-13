
import heroImage from '../assets/heroimg.png';

const Hero = () => {
    

    return (
        <div id='hero' className="bg-Hero bg-no-repeat bg-cover  bg-center p-4 md:p-10 py-26 flex flex-col-reverse md:flex-row justify-evenly items-center min-h-64 z-0 relative md:h-[520px] xl:h-[620px]">
            <div className='w-full md:w-[480px] flex flex-col gap-6 hero-content bg-opacity-30'>
                <h1 className='text-2xl md:text-4xl font-semibold xl:text-4xl'>Enrich Your Life, One Skill at a Time
                </h1>
                <p className='text-xs md:text-sm text-gray-600'>Discover the limitless possibilities when people and processes work in perfect harmony. Join us to explore a world of HR and IT Web services under one roof.  Are you an individual looking for growth or a business aiming for success?</p>
                <button className='btn-primary'>Get Started</button>
            </div>
            <div className="relative">
                <img 
                    src={heroImage} 
                    className='w-full md:w-80 h-auto md:h-80 object-cover rounded-lg drop-shadow-2xl hover:drop-shadow-none hover:scale-95 xl:w-[420px] xl:h-96 transition delay-75 -z-20 hero-image' 
                    alt="" 
                />
            </div>
        </div>
    );
}

export default Hero;