
import AnchorLink from 'react-anchor-link-smooth-scroll';
import heroImage from '../assets/hero/heroimg.jpg';

const Hero = () => {
    

    return (
        <div id='hero' className="bg-Hero bg-no-repeat -mt-[5.4rem] bg-cover bg-center p-4 md:p-10 py-26 flex flex-col-reverse md:flex-row justify-evenly items-center min-h-64 z-0  md:h-[520px] xl:h-[620px]">
            <div className='w-full md:w-[480px] flex flex-col gap-10 hero-content '>
                <h1 className='text-2xl font-reggae md:text-4xl xl:text-4xl '>Enrich Your Life,<br /> One Skill at a Time</h1>
                <p className='xl:text-2xl md:text-sm text-gray-600 text-justify mb-3'>Comprehensive Training in Behavioral and People Skills</p>
                <AnchorLink href='#getIn' className='btn-primary text-center'>Get In Touch</AnchorLink>
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