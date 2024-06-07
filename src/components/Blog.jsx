import BlogsList from './BlogsList';

const App = () => {
  return (
    <div id='blog' className="App">
      <header className=" text-white p-4 text-center">
        <h1 className="text-3xl text-black">BlogsList</h1>
      </header>
      <main>
        <BlogsList />
      </main>
    </div>
  );
};

export default App;