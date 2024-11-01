import { useState } from "react";
// import axios from "axios";
import Instance from "./Admin/Instance";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [file, setFile] = useState();
  // const [msg, setMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file); // Set image to state
  };

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("salary", salary);
    formData.append("file", file);

    try {
      const response = await Instance.post("/appointments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };
  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="row">
        <h1>React JS Node Express JS Upload File with Mysql Insert data</h1>
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter salary"
            autoComplete="off"
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Upload File</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={upload}
          style={{ marginTop: "20px" }}
        >
          Upload
        </button>
        <h1
          style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}
        >
          {/* {msg} */}
        </h1>
      </div>
    </div>
  );
}

export default App;
