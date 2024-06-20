import { useParams } from 'react-router-dom';

const BlogRouter = () => {
  let { id } = useParams(1);

  // Fetch your blog post data based on the id, or use it directly

  return (
    <div>
      <h2>Blog Post {id}</h2>
      {/* Render your blog post content here */}
    </div>
  );
};

export default BlogRouter;
