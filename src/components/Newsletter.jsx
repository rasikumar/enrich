import { newsletter } from "../assets";
import { News_letter } from "../constant";

const Newsletter = () => {
  const { title, content, para1, para2, btn } = News_letter[0];
  return (
    <div className="mx-auto py-4 px-4 lg:px-20 flex flex-col lg:flex-row items-center max-md:gap-5">
      <div className="w-[50%]">
        <img src={newsletter} alt="newsLetter" width={400} height={400} />
      </div>
      <div className="w-[50%]">
        <h1 className="text-3xl font-medium text-primary">{title}</h1>
        <div className="flex flex-col gap-4">
            <h2>{content}</h2>
            <p>{para1}</p>
            <p>{para2}</p>
            <a href=""  className="btn-primary">{btn}</a>

        </div>
      </div>
    </div>
  );
};

export default Newsletter;
