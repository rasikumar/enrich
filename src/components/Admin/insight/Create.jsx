import { useState } from "react";
import CreateBlog from "./blog/CreateBlog";
import CreateChangeaBit from "./changeabit/CreateChangeaBit";
import CreateSafetyNet from "./safetynet/CreateSafetyNet";

const Create = () => {
  // State to hold the selected component
  const [selectedList, setSelectedList] = useState("CreateBlog");

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
        <option value="CreateBlog">Blog List</option>
        <option value="CreateChangeaBit">ChangeABit List</option>
        <option value="CreateSafetyNet">Safety Net List</option>
      </select>

      {/* Conditionally render the selected component */}
      {selectedList === "CreateBlog" && <CreateBlog />}
      {selectedList === "CreateChangeaBit" && <CreateChangeaBit />}
      {selectedList === "CreateSafetyNet" && <CreateSafetyNet />}
    </div>
  );
};

export default Create;
