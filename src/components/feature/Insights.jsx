import { Link } from "react-router-dom";
import InsightList from "./InsightsLists";

const App = () => {
  return (
    <div className="md:m-8 px-4 py-6 App xl:h-full">
      <header className="md:p-4 flex flex-col gap-4 text-center ">
        <h1 className="text-black md:text-4xl text-2xl font-semibold text-center">
          Insights
        </h1>
        <h2 className="xl:text-xl md:text-lg w-full  font-[600] text-center">
          In our pursuit of growth, giving back becomes our compass, guiding us
          to empower and elevate others along the way.
        </h2>
        <p className="xl:text-lg text-sm text-gray-500 md:w-[80%] mx-auto text-justify">
          Stay informed with our latest blog posts. Discover expert tips,
          industry trends, and practical advice on behavioral skills, corporate
          training, and personal development.
        </p>
      </header>
      <main>
        <InsightList />
      </main>
      <Link to={"/insightpage"}>
        <button className="mt-10 btn-primary flex m-auto">More Insights</button>
      </Link>
    </div>
  );
};

export default App;
