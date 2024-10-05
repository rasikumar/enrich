// Ensure you have an image in the assets folder
import { Link } from "react-router-dom";
import { intro } from "../assets";

const Introduction = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-[400px] w-full lg:mr-10">
          <img
            src={intro}
            alt="Corporate Training"
            className="rounded-lg transition delay-100 hover:shadow-2xl"
          />
        </div>
        <div className="lg:w-[50vw] w-full flex flex-col gap-5">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Welcome to EnrichMinds!
          </h2>
          <p className="mt-2 text-gray-600 xl:text-lg text-sm flex flex-col gap-3 text-justify ">
            <div>
              At EnrichMinds, we specialize in behavioral skills training,
              psychometric assessments, and counseling for both corporate
              businesses and individuals. Our transformative programs are
              designed to elevate team performance, enhance individual
              capabilities, and promote compliance in a dynamic work
              environment.
            </div>
            <div>
              Whether you&apos;re a business looking to strengthen communication
              and leadership or an individual seeking to upskill for career
              advancement, our expert-led sessions and assessments are
              customized to meet your unique needs. Join EnrichMinds to empower
              yourself with essential skills for lasting success and personal
              growth.
            </div>
          </p>
          <Link to={"/Aboutus"}>
            <button className="btn-primary xl:text-sm">Discover More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
