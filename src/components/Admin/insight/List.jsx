import { useState } from "react";
import ListBlog from "./blog/ListBlogs";
import ListChangeaBit from "./changeabit/ListChangeaBit";
import ListSafetyNet from "./safetynet/ListSafetyNet";
import AllList from "./AllList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const List = () => {
  // State to hold the selected component
  const [selectedList, setSelectedList] = useState("All");

  // Function to handle changes in the select dropdown
  // const handleSelectChange = (e) => {
  //   setSelectedList(e.target.value);
  // };

  return (
    <div className="max-md:mt-16">
      <Select
        name="listSelector"
        id="listSelector"
        defaultValue={selectedList}
        onValueChange={setSelectedList}
      >
        <SelectTrigger className="w-64 bg-blue-500 text-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All List</SelectItem>
          <SelectItem value="ListBlog">Blog List</SelectItem>
          <SelectItem value="ListChangeaBit">Change a Bit List</SelectItem>
          <SelectItem value="ListSafetyNet">Safety Net List</SelectItem>
        </SelectContent>
      </Select>

      {/* Conditionally render the selected component */}
      {/* <option value="All">All List</option> */}
      {selectedList === "All" && <AllList />}
      {selectedList === "ListBlog" && <ListBlog />}
      {selectedList === "ListChangeaBit" && <ListChangeaBit />}
      {selectedList === "ListSafetyNet" && <ListSafetyNet />}
    </div>
  );
};

export default List;
