import React from "react";
import AddLayout from "./AddLayout";
import SelectList from "./SelectList";
import Header from "./Header";
import Sidebar from "./Sidebar";
const ENUM = {
  COMPLAINTS: "complaints",
  MEDICINES: "medicines",
  DIAGNOSIS: "diagnosis",
};

const Prescription = ({ data }) => {
  const [addType, setAddType] = React.useState("");

  const [selectedData, setSelectedData] = React.useState({
    [ENUM.COMPLAINTS]: [],
    [ENUM.DIAGNOSIS]: [],
    [ENUM.MEDICINES]: [],
  });

  const updateSelectedData = (list, type) => {
    setSelectedData((d) => ({
      ...d,
      [type]: [...(list || [])],
    }));
  };

  const closeSelectList = () => {
    setAddType("");
  };

  const initiatePrint = () => {
    window.print();
  };

  return (
    <>
      {addType && (
        <SelectList
          list={data[addType]}
          selected={selectedData[addType]}
          onChange={(l) => updateSelectedData(l, addType)}
          onApply={closeSelectList}
          showFilter={addType === ENUM.MEDICINES}
        />
      )}
      <div>
        <Header />
      </div>
      <div className="main-container">
        <div>
          <Sidebar />
        </div>
        <div className="main-prescription">
          <div className="prescription-cta">
            <button className="primary" onClick={initiatePrint}>
              Print
            </button>
          </div>
          <div>
            <strong>Complaints</strong>
            {selectedData[ENUM.COMPLAINTS].map((complaint) => (
              <div>{complaint}</div>
            ))}
            <AddLayout
              title="Complaints"
              onClick={() => {
                setAddType(ENUM.COMPLAINTS);
              }}
            />
          </div>

          <div>
            <strong>Diagnosis</strong>
            {selectedData[ENUM.DIAGNOSIS].map((diagnosis) => (
              <div>{diagnosis}</div>
            ))}
            <AddLayout
              title="Diagnosis"
              onClick={() => {
                setAddType(ENUM.DIAGNOSIS);
              }}
            />
          </div>

          <div>
            <strong>Rx</strong>
            {selectedData[ENUM.MEDICINES].map((medicines) => (
              <div>{medicines}</div>
            ))}
            <AddLayout
              title="Medicines"
              onClick={() => {
                setAddType(ENUM.MEDICINES);
              }}
            />
          </div>
        </div>
      </div>

      <div id="section-to-print">
        <div className="sep-section">
          {selectedData[ENUM.COMPLAINTS].map((complaint) => (
            <div>{complaint}</div>
          ))}
        </div>

        <div className="sep-section">
          <strong>Diagnosis</strong>
          {selectedData[ENUM.DIAGNOSIS].map((diagnosis) => (
            <div>{diagnosis}</div>
          ))}
        </div>

        <div className="sep-section">
          <strong>Rx</strong>
          {selectedData[ENUM.MEDICINES].map((medicines) => (
            <div>{medicines}</div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Prescription;
