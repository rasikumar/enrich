import trainingImage from '../assets/intro.jpg'; // Ensure you have an image in the assets folder
import { Link } from 'react-router-dom';

const Introduction = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-[400px] w-full lg:mr-10">
          <img src={trainingImage} alt="Corporate Training" className="rounded-lg transition delay-100 hover:shadow-2xl" />
        </div>
        <div className="lg:w-[50vw] w-full flex flex-col gap-5">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Welcome to Enrich 
          </h2>
          <p className="mt-2 text-gray-600 text-sm flex flex-col gap-3 text-justify ">
            <div>
            At Enrich, we specialize in corporate training, behavioral skills, and soft skills development. Our transformative programs elevate team performance, enhance individual capabilities, and ensure compliance.
            </div>
            <div>
            Whether you&apos;re a business seeking to improve communication and leadership or an individual aiming to upskill for career advancement, our expert-led sessions are tailored to meet your needs.
            Join Enrich to empower yourself with essential skills for lasting success and growth.
            </div>
            
          </p>
          <Link to={'/Aboutus'} >
            <button className='btn-primary xl:text-sm'>Know More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
