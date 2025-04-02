import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
// import { TiArrowRightThick } from "react-icons/ti";
// import { TiArrowLeftThick } from "react-icons/ti";

const testimonialsData = [
  {
    id: 1,
    name: "Shrikant Hegde",
    position: "Master Trainer, Leadership Coach, and Motivational Speaker",
    feedback:
      "I had the privilege of attending various webinars conducted by Ms. Shanthi Subramani. All those webinars were very informative and educative, and were true testimonies of her thorough knowledge, rich experience and authentic professional expertise.",
    img: "https://ui-avatars.com/api/?name=sh&background=fadadd",
  },
  {
    id: 2,
    name: "Shiva Kumar .B",
    position: "HR & Business Operations Professional",
    feedback:
      "A transformative workshop that significantly enhanced our CRM team's behavioral skills for customer service. The tailored approach empowered participants, refreshing their mindset and effectiveness in their roles. Highly recommended for organizations aiming to elevate team performance and individual growth.",
    img: "https://ui-avatars.com/api/?name=sk&background=ffe5d9",
  },
  {
    id: 3,
    name: "Zahira Pereira",
    position: "Training & Coaching Professional",
    feedback:
      "I must compliment Shanthi Subramani for such an amazing representation of my Psychometric report.  She took me through every phase of it very articulately, I now understand myself much better.  The psychometric results are very accurate , and served as an exact mirror to what my actual personality is.",
    img: "https://ui-avatars.com/api/?name=zp&background=cde7b0",
  },
  { 
    id: 4,
    name: "Ashwini Murthy",
    position: "Teacher",
    feedback:
      "Had a great experience with ma'am.She motivated us in positive way. After attending this workshop my self confidence increased and l started to love myself, which is the great tool to improve my career.",
    img: "https://ui-avatars.com/api/?name=am&background=a5d8ff",
  },
  {
    id: 5,
    name: "Archana V Kurli",
    position: "Presentation Skills",
    feedback:
      "Session was really worth to learn balancing life.... dear mam.We got to know Loving one self is not being selfish but self respect . Thank you 🙏🏻",
    img: "https://ui-avatars.com/api/?name=ak&background=d4a5ff",
  },
  {
    id: 6,
    name: "Sai Sharan",
    position: "IT Professional",
    feedback:
      "Personal development session was very nice and helpful. Session has improved me a lot in planning and up skilling in my daily activity of work and learning.",
    img: "https://ui-avatars.com/api/?name=ss&background=ffcad4",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef(null);
  const cardsRef = useRef([]);

  // const handlePrev = () => {
  //   const newIndex =
  //     (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
  //   animateCards(newIndex);
  // };

  // const handleNext = () => {
  //   const newIndex = (currentIndex + 1) % testimonialsData.length;
  //   animateCards(newIndex);
  // };

  const animateCards = (newIndex) => {
    const currentCards = cardsRef.current;
    gsap.to(currentCards, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.fromTo(
          currentCards,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power1.inOut",
          }
        );
      },
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = (currentIndex + 1) % testimonialsData.length;
      animateCards(newIndex);
    }, 3000); // Change every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div
      ref={testimonialsRef}
      id="testimonials"
      className="w-full bg-gradient-to-r from-primary to-primary/90 flex flex-col lg:flex-row items-center justify-center md:p-10 px-4 py-8"
    >
      <div className="content items-center flex flex-col lg:flex-row gap-4">
        <div className="text-content flex flex-col gap-4">
          <h4 className="text-white md:text-4xl text-2xl font-semibold ">
            Testimonials
          </h4>
          <h1 className="xl:text-2xl md:text-lg sm:text-sm w-full font-[600] text-white">
            Echoes of Success: Hear from Our Clients
          </h1>
          <p className=" xl:text-lg text-sm text-white max-w-2xl mx-auto">
            Hear from those who have transformed their skills and lives with
            Enrich. Our client&apos;s success stories speak volumes about the
            impact of our training programs.
          </p>
          {/* <span className="bg-yellow-600 rounded-full w-6 h-6  mt-4 flex text-start"></span> */}
        </div>
        <div className="card flex flex-col lg:flex-row items-center gap-4 lg:gap-10 mt-10 lg:mt-16">
          {/* <button
            onClick={handlePrev}
            className="bg-yellow-600 text-white p-4 rounded-full hover:bg-yellow-700 transition duration-300"
          >
            <TiArrowLeftThick />
          </button> */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
            {[0, 1].map((i) => (
              <div
                key={
                  testimonialsData[(currentIndex + i) % testimonialsData.length]
                    .id
                }
                ref={(el) => (cardsRef.current[i] = el)}
                className="testimonial-card flex flex-col items-center gap-4 bg-white p-6 shadow-lg rounded-xl transform transition-transform duration-500 hover:scale-105 w-full lg:w-80 mx-auto justify-between"
              >
                <p className="w-full leading-5 text-sm text-justify">
                  {
                    testimonialsData[
                      (currentIndex + i) % testimonialsData.length
                    ].feedback
                  }
                </p>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-[#203B93]">
                      {
                        testimonialsData[
                          (currentIndex + i) % testimonialsData.length
                        ].name
                      }
                    </h1>
                    <p className="text-gray-500 text-[12px] italic">
                      {
                        testimonialsData[
                          (currentIndex + i) % testimonialsData.length
                        ].position
                      }
                    </p>
                  </div>
                  <img
                    src={
                      testimonialsData[
                        (currentIndex + i) % testimonialsData.length
                      ].img
                    }
                    // width={30}
                    // height={30}
                    className="rounded-full w-16 h-16 object-cover ml-2"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* <button
            onClick={handleNext}
            className="bg-yellow-600 text-white p-4 rounded-full hover:bg-yellow-700 transition duration-300"
          >
            <TiArrowRightThick />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
