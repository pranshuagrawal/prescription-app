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

const Prescription = ({ data, APP_VERSION }) => {
  const [addType, setAddType] = React.useState("");
  const defaultData = {
    [ENUM.COMPLAINTS]: { data: [], emptyLines: 0 },
    [ENUM.DIAGNOSIS]: { data: [], emptyLines: 0 },
    [ENUM.MEDICINES]: { data: [], emptyLines: 0 },
  };
  const [selectedData, setSelectedData] = React.useState({ ...defaultData });

  const updateSelectedData = (list, type) => {
    setSelectedData((d) => ({
      ...d,
      [type]: {
        ...d[type],
        data: [...(list || [])],
      },
    }));
  };

  const updateEmptyLines = (emptyLines, type) => {
    setSelectedData((d) => ({
      ...d,
      [type]: {
        ...d[type],
        emptyLines,
      },
    }));
  };

  const closeSelectList = () => {
    setAddType("");
  };

  const initiatePrint = () => {
    window.print();
  };

  const erasePrescription = () => {
    setSelectedData({ ...defaultData });
  };

  return (
    <>
      {addType && (
        <SelectList
          list={data[addType]}
          selectedData={selectedData[addType]}
          onChange={(l) => updateSelectedData(l, addType)}
          onChangeEmptyLines={(emptyLines) =>
            updateEmptyLines(emptyLines, addType)
          }
          onApply={closeSelectList}
          showFilter={addType === ENUM.MEDICINES}
        />
      )}
      <div>
        <Header APP_VERSION={APP_VERSION} />
      </div>
      <div className="main-container">
        <div>
          <Sidebar />
        </div>
        <div className="main-prescription">
          <div className="prescription-cta">
            <button className="grey mr-4" onClick={erasePrescription}>
              Erase
            </button>
            <button className="primary" onClick={initiatePrint}>
              Print
            </button>
          </div>
          <div>
            <strong>Complaints</strong>
            {(selectedData?.[ENUM.COMPLAINTS]?.data || []).map((complaint) => (
              <div>{complaint}</div>
            ))}
            {Array(selectedData[ENUM.COMPLAINTS].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
              ))}
            <AddLayout
              title="Complaints"
              onClick={() => {
                setAddType(ENUM.COMPLAINTS);
              }}
            />
          </div>

          <div>
            <strong>Diag.</strong>
            {(selectedData?.[ENUM.DIAGNOSIS]?.data || []).map((diagnosis) => (
              <div>{diagnosis}</div>
            ))}
            {Array(selectedData[ENUM.DIAGNOSIS].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
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
            {(selectedData?.[ENUM.MEDICINES]?.data || []).map((medicines) => (
              <div>{medicines}</div>
            ))}
            {Array(selectedData[ENUM.MEDICINES].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
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
          {(selectedData?.[ENUM.COMPLAINTS]?.data || []).map((complaint) => (
            <div>{complaint}</div>
          ))}
          {Array(selectedData[ENUM.COMPLAINTS].emptyLines)
            .fill("")
            .map((el) => (
              <div className="empty-lines">_________________________</div>
            ))}
        </div>

        <div className="sep-section">
          <strong>Diag.</strong>
          {(selectedData?.[ENUM.DIAGNOSIS]?.data || []).map((diagnosis) => (
            <div>{diagnosis}</div>
          ))}
          {Array(selectedData[ENUM.DIAGNOSIS].emptyLines)
            .fill("")
            .map((el) => (
              <div className="empty-lines">_________________________</div>
            ))}
        </div>

        <div className="sep-section">
          <strong>Rx</strong>
          {(selectedData?.[ENUM.MEDICINES]?.data || []).map((medicines) => (
            <div>{medicines}</div>
          ))}
          {Array(selectedData[ENUM.MEDICINES].emptyLines)
            .fill("")
            .map((el) => (
              <div className="empty-lines">_________________________</div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Prescription;
