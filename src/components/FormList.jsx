import { useState } from "react";
import PsychometricForm from "./forms/PsychometricForm";
import Discovery from "./forms/Discovery";

const FormList = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      {!selectedForm || selectedForm === "" ? (
        <button
          onClick={() => setSelectedForm("discoveryCall")}
          className="bg-slate-400 w-64 h-36 flex items-center justify-center rounded-xl"
        >
          Book a Discovery Call
        </button>
      ) : null}

      {!selectedForm || selectedForm === "" ? (
        <button
          onClick={() => setSelectedForm("assessment")}
          className="bg-slate-400 w-64 h-36 flex items-center justify-center rounded-xl"
        >
          Book an Assessment
        </button>
      ) : null}

      {selectedForm === "discoveryCall" && (
        <div className="w-full flex justify-center">
          {/* <h1 className="hidden sm:flex">Psychometric Form</h1> */}
          <PsychometricForm />
        </div>
      )}

      {selectedForm === "assessment" && (
        <div className="w-full flex justify-center">
          {/* <h1 className="hidden sm:flex">Discovery Form</h1> */}
          <Discovery />
        </div>
      )}
    </div>
  );
};

export default FormList;
