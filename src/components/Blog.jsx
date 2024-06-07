import BlogsList from './BlogsList';

const App = () => {
  return (
    <div id='blog' className="App xl:h-[700px]">
      <header className=" text-white p-4 text-center">
        <h1 className="text-3xl text-black xl:text-4xl xl:font-bold">BlogsList</h1>
      </header>
      <main>
        <BlogsList />
      </main>
    </div>
  );
};

export default App;