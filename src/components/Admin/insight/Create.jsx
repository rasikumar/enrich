import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import CreateBlog from "./blog/CreateBlog";
import CreateChangeaBit from "./changeabit/CreateChangeaBit";
import CreateSafetyNet from "./safetynet/CreateSafetyNet";

const Create = () => {
  const [selectedList, setSelectedList] = useState("CreateBlog");

  return (
    <div className="flex flex-col gap-4 p-4">
      <Select onValueChange={setSelectedList} defaultValue={selectedList}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CreateBlog">Blog</SelectItem>
          <SelectItem value="CreateChangeaBit">ChangeABit</SelectItem>
          <SelectItem value="CreateSafetyNet">Safety Net</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="mt-4">
        {selectedList === "CreateBlog" && <CreateBlog />}
        {selectedList === "CreateChangeaBit" && <CreateChangeaBit />}
        {selectedList === "CreateSafetyNet" && <CreateSafetyNet />}
      </div>
    </div>
  );
};

export default Create;
