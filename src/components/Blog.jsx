import BlogsList from './BlogsList';

const App = () => {
  return (
    <div id='blog' className="m-10 App xl:h-full">
      <header className="p-4 flex flex-col gap-4 text-center ">
        <h1 className="text-black text-4xl font-semibold text-center">BlogsList</h1>
        <h2 className='text-center text-2xl w-full font-[600]'>In our pursuit of growth, giving back becomes our compass, guiding us to empower and elevate others along the way.</h2>
        <p className="text-sm text-gray-500 md:w-[90%] m-auto">Stay informed with our latest blog posts. Discover expert tips, industry trends, and practical advice on behavioral skills, corporate training, and personal development.
        </p>
      </header>
      <main>
        <BlogsList />
      </main>
    </div>
  );
};

export default App;