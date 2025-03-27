import ListBlog from "./blog/ListBlogs";
import ListChangeABit from "./changeabit/ListChangeaBit";
import ListSafetyNet from "./safetynet/ListSafetyNet";
const AllList = () => {
  return (
    <div>
      <ListBlog />
      <ListChangeABit />
      <ListSafetyNet />
    </div>
  );
};

export default AllList;
/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import Instance from "../Instance";
// import { FaPencilAlt } from "react-icons/fa";
// import { MdDateRange } from "react-icons/md";
// import DOMPurify from "dompurify";
// import EditBlog from "./blog/EditBlog";
// import EditChangeBit from "./changeabit/EditChangeABit";
// import EditSafetyNet from "./safetynet/EditBlog";

// const EditModal = ({ isOpen, onClose, item, updateItem }) => {
//   if (!isOpen || !item) return null;

//   const renderEditForm = () => {
//     switch (item.linkPrefix) {
//       case "blog":
//         return (
//           <EditBlog blog={item} setEditing={updateItem}  setBlogs={onClose} />
//         );
//       case "changeABit":
//         return (
//           <EditChangeBit
//             changeBit={item}
//             setEditing={updateItem}
//             onClose={onClose}
//           />
//         );
//       case "safetyNet":
//         return (
//           <EditSafetyNet
//             safetyNet={item}
//             updateItem={updateItem}
//             onClose={onClose}
//           />
//         );
//       default:
//         return <p>No valid form to render.</p>;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem] relative max-h-[30rem] overflow-y-scroll">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-700 text-2xl"
//         >
//           &times;
//         </button>
//         {renderEditForm()}
//       </div>
//     </div>
//   );
// };

// const AllList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     const fetchAllContent = async () => {
//       try {
//         const responses = await Promise.allSettled([
//           Instance.get("/getAllBlogs"),
//           Instance.get("/getallChangeAbitList"),
//           Instance.get("/getAllSafetyList"),
//         ]);

//         const blogs =
//           responses[0].status === "fulfilled" &&
//           responses[0].value.data.blogs?.length
//             ? responses[0].value.data.blogs.map((item) => ({
//                 id: item.id,
//                 title: item.blog_title,
//                 body: item.blog_body,
//                 author: item.blog_author,
//                 date: item.blog_date,
//                 visit: item.blog_visitors_count,
//                 category: item.blog_category,
//                 thumbnail: item.blog_thumbnail,
//                 linkPrefix: "blog",
//               }))
//             : [];

//         const changeBits =
//           responses[1].status === "fulfilled" &&
//           responses[1].value.data.changeAbits?.length
//             ? responses[1].value.data.changeAbits.map((item) => ({
//                 id: item.id,
//                 title: item.changeAbit_title,
//                 body: item.changeAbit_content,
//                 author: item.changeAbit_author,
//                 date: item.createdAt,
//                 visit: item.changeAbit_visit_count,
//                 category: item.changeAbit_category,
//                 thumbnail: item.changeAbit_thumbnail,
//                 linkPrefix: "changeABit",
//               }))
//             : [];

//         const safetyNets =
//           responses[2].status === "fulfilled" &&
//           responses[2].value.data.safetyRecords?.length
//             ? responses[2].value.data.safetyRecords.map((item) => ({
//                 id: item.id,
//                 title: item.safety_title,
//                 body: item.safety_body,
//                 author: item.safety_author,
//                 date: item.updated_at,
//                 visit: item.safety_visitors_count,
//                 category: item.safety_category,
//                 thumbnail: item.safety_thumbnail,
//                 linkPrefix: "safetyNet",
//               }))
//             : [];

//         const combinedData = [...blogs, ...changeBits, ...safetyNets].sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );

//         setBlogs(combinedData);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load content");
//         setLoading(false);
//       }
//     };

//     fetchAllContent();
//   }, []);

//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const updateItem = (updatedItem) => {
//     setBlogs((prevBlogs) =>
//       prevBlogs.map((blog) =>
//         blog.id === updatedItem.id ? { ...blog, ...updatedItem } : blog
//       )
//     );
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div>
//       <div className="flex flex-wrap gap-3">
//         {blogs.map((item) => {
//           const imagePath = `http://localhost:5001/${
//             item.linkPrefix === "blog"
//               ? "blog_images"
//               : item.linkPrefix === "changeABit"
//               ? "changeAbit_images"
//               : "safety_images"
//           }/`;

//           return (
//             <div
//               key={item.id}
//               className="even:bg-white odd:bg-zinc-100 border border-teal-800 rounded-lg p-4 mb-1 flex gap-6 max-h-32 sm:max-h-36 min-w-full"
//             >
//               <div className="w-full">
//                 <div className="flex text-sm">
//                   <h2 className="text-md font-semibold">{item.title}</h2>
//                 </div>
//                 <div className="flex gap-4">
//                   <p className="text-gray-600 inline-flex items-center text-xs gap-2">
//                     <FaPencilAlt />
//                     {item.author}
//                   </p>
//                   <p className="text-gray-500 inline-flex items-center text-xs gap-2">
//                     <MdDateRange />
//                     {new Date(item.date).toLocaleDateString("en-IN", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>

//                 <div
//                   className="line-clamp-2 text-xs"
//                   dangerouslySetInnerHTML={{
//                     __html: DOMPurify.sanitize(item.body),
//                   }}
//                 />
//                 <div className="inline-flex gap-4 mt-3">
//                   <button
//                     onClick={() => handleEditClick(item)}
//                     className="h-8 px-4 bg-blue-500 text-white rounded-md"
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </div>
//               {item.thumbnail && (
//                 <img
//                   src={`${imagePath}${item.thumbnail}`}
//                   alt={item.title}
//                   className="rounded-lg w-24 object-cover"
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Edit Modal */}
//       <EditModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         item={selectedItem}
//         updateItem={updateItem}
//       />
//     </div>
//   );
// };

// export default AllList;
