import BlogsList from './BlogsList';

const App = () => {
  return (
    <div id='blog' className="-mt-10 App xl:h-[700px]">
      <header className="p-4 flex flex-col gap-4 text-center ">
        <h1 className="text-black text-4xl font-semibold text-center">BlogsList</h1>
        <h2 className='text-center text-2xl w-full font-[600]'>In our pursuit of growth, giving back becomes our compass, guiding us to empower and elevate others along the way.</h2>
        <p className="text-sm text-gray-500 md:w-[90%] m-auto">Dive into our blog section, where we share our thoughts, insights, and valuable learnings to inspire and guide aspiring individuals and businesses. At Evvi, we believe that as we learn, it&apos;s our responsibility to contribute back to the universe. Because in our journey of growth, collective progress becomes our true measure of success.</p>
      </header>
      <main>
        <BlogsList />
      </main>
    </div>
  );
};

export default App;