import { newsletter } from "../assets";
import { News_letter } from "../constant";

const Newsletter = () => {
  const { title, content, para1, para2, btn } = News_letter[0];
  return (
    <div className="mx-auto p-10 lg:px-20 flex flex-col lg:flex-row items-center max-md:gap-5 shadow-empose w-[90%] mt-10">
      <div className="md:w-[50%]">
        <img
          src={newsletter}
          alt="newsLetter"
          width={400}
          height={400}
          className="rounded-lg hover:scale-105 transition-all"
        />
      </div>
      <div className="md:w-[50%]">
        <h1 className="text-3xl font-medium text-primary">{title}</h1>
        <div className="flex flex-col gap-4">
          <h2>{content}</h2>
          <p className="text-justify">{para1}</p>
          <p className="text-justify">{para2}</p>
          <a
            href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7190682466737680384"
            target="_blank"
            className="btn-primary text-center"
          >
            {btn}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
