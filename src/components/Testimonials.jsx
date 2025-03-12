// import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderCard from "./SliderCard";

const testimonials = [
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
  return (
    <div
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
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2} // Show 2 slides at a time
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 }, // Mobile view: 1 slide
          375: { slidesPerView: 1 }, // Mobile view: 1 slide
          320: { slidesPerView: 1 }, // Mobile view: 1 slide
          1024: { slidesPerView: 2 }, // Larger screens: 2 slides
        }}
        className="md:w-1/2 w-full"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="px-4">
            <SliderCard
              name={testimonial.name}
              position={testimonial.position}
              feedback={testimonial.feedback}
              img={testimonial.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
