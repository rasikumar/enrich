import { useState } from "react";
import ListBlog from "./blog/ListBlogs";
import ListChangeaBit from "./changeabit/ListChangeaBit";
import ListSafetyNet from "./safetynet/ListSafetyNet";

const List = () => {
  // State to hold the selected component
  const [selectedList, setSelectedList] = useState("ListBlog");

  // Function to handle changes in the select dropdown
  const handleSelectChange = (e) => {
    setSelectedList(e.target.value);
  };

  return (
    <div>
      <select
        name="listSelector"
        id="listSelector"
        onChange={handleSelectChange}
      >
        <option value="ListBlog">Blog List</option>
        <option value="ListChangeaBit">Change a Bit List</option>
        <option value="ListSafetyNet">Safety Net List</option>
      </select>

      {/* Conditionally render the selected component */}
      {selectedList === "ListBlog" && <ListBlog />}
      {selectedList === "ListChangeaBit" && <ListChangeaBit />}
      {selectedList === "ListSafetyNet" && <ListSafetyNet />}
    </div>
  );
};

export default List;
