import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
// import { TiArrowRightThick } from "react-icons/ti";
// import { TiArrowLeftThick } from "react-icons/ti";

const testimonialsData = [
  {
    id: 1,
    name: "Shrikant Hegde",
    position: "Emotional Intelligence",
    feedback:
      "I had the privilege of attending various webinars conducted by Ms. Shanthi Subramani. All those webinars were very informative and educative, and were true testimonies of her thorough knowledge, rich experience and authentic professional expertise. ",
    img: "https://ui-avatars.com/api/?name=sh&background=random",
  },
  {
    id: 2,
    name: "Shiva Kumar .B",
    position: "Master Trainer, Leadership Coach,",
    feedback:
      "A transformative workshop that significantly enhanced our CRM team's behavioral skills for customer service. The tailored approach empowered participants, refreshing their mindset and effectiveness in their roles. Highly recommended for organizations aiming to elevate team performance and individual growth.",
    img: "https://ui-avatars.com/api/?name=sk&background=random",
  },
  {
    id: 3,
    name: "Zahira Pereira",
    // position: "Time Management",
    feedback:
      "I must compliment Shanthi Subramani for such an amazing representation of my Psychometric report.  She took me through every phase of it very articulately, I now understand myself much better.  The psychometric results are very accurate , and served as an exact mirror to what my actual personality is.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjXqHGfZ5g8Y0fsAVw6ddN-gysfO8mb15LOyqYBeBTosvXJTZJsXRQ=w90-h90-p-rp-mo-br100",
  },
  {
    id: 4,
    name: "Ashwini Murthy",
    // position: "Presentation Skills",
    feedback:
      "Had a great experience with ma'am.She motivated us in positive way. After attending this workshop my self confidence increased and l started to love myself, which is the great tool to improve my career.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVuX6KIRwaVRPn1mNVlTtzaVJiLDihZb8Tv7dHzCg59BUZal1qF=w90-h90-p-rp-mo-br100",
  },
  {
    id: 5,
    name: "Archana V Kurli",
    // position: "Presentation Skills",
    feedback:
      "Session was really worth to learn balancing life.... dear mam.We got to know Loving one self is not being selfish but self respect . Thank you 🙏🏻",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVEBlcWObYVv1HD2BcxXyTL6LvLshkN82TsE9VOz1fq1_2cxgsX=w90-h90-p-rp-mo-br100",
  },
  {
    id: 6,
    name: "Sai Sharan",
    // position: "Presentation Skills",
    feedback:
      "Personal development session was very nice and helpful. Session has improved me a lot in planning and up skilling in my daily activity of work and learning.",
    img: "https://lh3.googleusercontent.com/a/ACg8ocLmRwsLkolXXjb-1wSPHlk6q70PnKa8R-cxHZuQ34a8b2bhqg0=w90-h90-p-rp-mo-br100",
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
                className="testimonial-card flex flex-col items-center gap-4 bg-white p-6 py-8 shadow-lg rounded-xl transform transition-transform duration-500 hover:scale-105 w-full lg:w-80 mx-auto"
              >
                <img
                  src={
                    testimonialsData[
                      (currentIndex + i) % testimonialsData.length
                    ].img
                  }
                  width={50}
                  height={50}
                  className="rounded-full w-20 h-20 object-cover"
                />
                <h1 className="text-xl font-semibold text-gray-800">
                  {
                    testimonialsData[
                      (currentIndex + i) % testimonialsData.length
                    ].name
                  }
                </h1>
                <p className="text-gray-500">
                  {
                    testimonialsData[
                      (currentIndex + i) % testimonialsData.length
                    ].position
                  }
                </p>
                <p className="w-full leading-5 text-sm text-gray-700 text-justify">
                  {
                    testimonialsData[
                      (currentIndex + i) % testimonialsData.length
                    ].feedback
                  }
                </p>
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
