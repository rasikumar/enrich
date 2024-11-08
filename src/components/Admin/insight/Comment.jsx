// import { useState } from "react";
import BlogCommentList from "./blog/BlogCommentList";
// import ChangeaBitCommentList from "./changeabit/ChangeaBitCommentList";
// import SafetyNetCommentList from "./safetynet/SafetyNetCommentList";

const Comment = () => {
  // State to hold the selected component
  // const [selectedList, setSelectedList] = useState("BlogCommentList");

  // Function to handle changes in the select dropdown
  // const handleSelectChange = (e) => {
  //   setSelectedList(e.target.value);
  // };

  return (
    <div>
      <BlogCommentList/>
      {/* <select
        name="listSelector"
        id="listSelector"
        onChange={handleSelectChange}
      > */}
        {/* <option value="BlogCommentList">Blog List</option> */}
        {/* <option value="ChangeaBitCommentList">Change a Bit List</option>
        <option value="SafetyNetCommentList">Safety Net List</option> */}
      {/* </select> */}

      {/* Conditionally render the selected component */}
      {/* {selectedList === "BlogCommentList" && <BlogCommentList />} */}
      {/* {selectedList === "ChangeaBitCommentList" && <ChangeaBitCommentList />}
      {selectedList === "SafetyNetCommentList" && <SafetyNetCommentList />} */}
    </div>
  );
};

export default Comment;
