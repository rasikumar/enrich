import { Link } from 'react-router-dom';
import BlogsList from './BlogsList';

const App = () => {
  return (
    <div id='blog' className="m-8 App xl:h-full">
      <header className="p-4 flex flex-col gap-4 text-center ">
        <h1 className="text-black text-4xl font-semibold text-center">Blogs</h1>
        <h2 className='text-center xl:text-2xl text-lg w-full font-[600]'>In our pursuit of growth, giving back becomes our compass, guiding us to empower and elevate others along the way.</h2>
        <p className="xl:text-xl text-xs text-gray-500 md:w-[90%] m-auto">Stay informed with our latest blog posts. Discover expert tips, industry trends, and practical advice on behavioral skills, corporate training, and personal development.
        </p>
      </header>
      <main>
        <BlogsList />
      </main>
      <Link to={'/BlogDisplay'}>
        <button className='btn-primary'>More Blogs</button>
      </Link>
    </div>
  );
};

export default App;