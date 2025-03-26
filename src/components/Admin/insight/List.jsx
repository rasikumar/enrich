import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useList } from "@/providers/ListProvider";
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
  const { selectedList, setSelectedList } = useList();
  const location = useLocation();

  // Set selected list from navigation state
  useEffect(() => {
    if (location.state?.selectedList) {
      setSelectedList(location.state.selectedList);
    }
  }, [location.state, setSelectedList]);

  return (
    <div className="max-md:mt-16">
      <Select value={selectedList} onValueChange={setSelectedList}>
        <SelectTrigger className="w-64 bg-blue-500 text-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All List</SelectItem>
          <SelectItem value="ListBlog">Blog List</SelectItem>
          <SelectItem value="ListChangeABit">ChangeABit List</SelectItem>
          <SelectItem value="ListSafetyNet">Safety Net List</SelectItem>
        </SelectContent>
      </Select>

      <div className="mt-6">
        {selectedList === "All" && <AllList />}
        {selectedList === "ListBlog" && <ListBlog />}
        {selectedList === "ListChangeABit" && <ListChangeaBit />}
        {selectedList === "ListSafetyNet" && <ListSafetyNet />}
      </div>
    </div>
  );
};

export default List;
