import trainingImage from '../assets/1.png'; // Ensure you have an image in the assets folder

const Introduction = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 w-full mr-10">
          <img src={trainingImage} alt="Corporate Training" className="rounded-lg shadow-lg" />
        </div>
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Intro 
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            At Enrich, we specialize in corporate training, behavioral skills, and soft skills development. Our transformative programs elevate team performance, enhance individual capabilities, and ensure compliance.
            <br /> 
            Whether you&apos;re a business seeking to improve communication and leadership or an individual aiming to upskill for career advancement, our expert-led sessions are tailored to meet your needs.
            <br />
            Join Enrich to empower yourself with essential skills for lasting success and growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
