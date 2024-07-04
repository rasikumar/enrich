import backgroundImage from '../assets/about.png'; // Add an appropriate background image in the assets folder

const AboutUs = () => {
  return (
    <section 
      className="relative bg-cover bg-center py-20"
      id='about'
      style={{ backgroundImage : `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center bg-white bg-opacity-90 rounded-lg shadow-lg py-10">
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0 p-6">
          <h2 className="text-4xl font-bold text-black leading-tight mb-4">
            Welcome to Enrich
          </h2>
          <p className="text-gray-600 text-sm mb-4 text-justify">
            A division of Evvi Solutions dedicated to delivering transformative training and skill development services. Our vision is to empower individuals and organizations by focusing on essential behavioral skills.
          </p>
          <p className="text-gray-600 text-sm mb-4 text-justify">
            At Enrich, we understand the profound impact of mastering behavioral skills on personal and professional growth. Our expert-led programs enhance communication, leadership, teamwork, emotional intelligence, and more, catering to businesses, professionals, students, and individuals seeking growth.
          </p>
          <p className="text-gray-600 text-sm mb-4 text-justify">
            Our commitment to this field drives us to provide comprehensive training solutions that make a positive difference. Explore more about Evvi Solutions and our team at 
            <a href="https://evvisolutions.com" className="text-blue-500 after:content-['_↗'] ... ml-1" target='_blank'>
              evvisolutions.com
            </a>.
          </p>
        </div>
        <div className="lg:w-1/2 w-full p-6">
          <div className="rounded-lg drop-shadow-4xl overflow-hidden">
            <img src={backgroundImage} alt="About Us" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
