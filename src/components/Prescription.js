import React from "react";
import AddLayout from "./AddLayout";
import SelectList from "./SelectList";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ENUM } from "../constants";

const Prescription = ({ data, APP_VERSION }) => {
  const [addType, setAddType] = React.useState("");
  const defaultData = {
    [ENUM.COMPLAINTS]: { data: [], emptyLines: 0 },
    [ENUM.DIAGNOSIS]: { data: [], emptyLines: 0 },
    [ENUM.MEDICINES]: { data: [], emptyLines: 0 },
    days: "",
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

  const updateDays = (days) => {
    setSelectedData((d) => ({
      ...d,
      days,
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

  const reloadData = () => {
    window.location.reload();
  };

  return (
    <>
      {addType && addType !== "GROUP" && (
        <SelectList
          list={data[addType]}
          selectedDays={selectedData.days}
          selectedData={selectedData[addType]}
          onChange={(l) => {
            updateSelectedData(l, addType);
          }}
          onChangeEmptyLines={(emptyLines) =>
            updateEmptyLines(emptyLines, addType)
          }
          onChangeDays={(days) => {
            updateDays(days);
          }}
          onApply={closeSelectList}
          showFilter={addType === ENUM.MEDICINES}
          showDays={addType === ENUM.MEDICINES}
          showSearch={addType === ENUM.MEDICINES}
          additionalFilters={data.groups}
          filterAssociations={data.groupAssociations}
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
            <button className="grey mr-4" onClick={reloadData}>
              Refresh
            </button>
            <button className="grey mr-4" onClick={erasePrescription}>
              Erase
            </button>
            <button className="primary" onClick={initiatePrint}>
              Print
            </button>
          </div>
          <div className="main-prescription-container">
            {/* <strong>Complaints</strong> */}
            {(selectedData?.[ENUM.COMPLAINTS]?.data || []).map((complaint) => (
              <div className="individual-element">{complaint}</div>
            ))}
            {Array(selectedData[ENUM.COMPLAINTS].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
              ))}
            {/* <AddLayout
              title="Complaints"
              onClick={() => {
                setAddType(ENUM.COMPLAINTS);
              }}
            /> */}
          </div>

          <div>
            <strong>Diag.</strong>
            {(selectedData?.[ENUM.DIAGNOSIS]?.data || []).map((diagnosis) => (
              <div className="individual-element">{diagnosis}</div>
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
              <div className="individual-element">{medicines}</div>
            ))}

            {Array(selectedData[ENUM.MEDICINES].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
              ))}
            {selectedData.days && (
              <div className="individual-element num-of-days">
                {selectedData.days}
              </div>
            )}
            <AddLayout
              title="Medicines"
              onClick={() => {
                setAddType(ENUM.MEDICINES);
              }}
            />
          </div>
        </div>
      </div>

      <div
        id="section-to-print"
        style={{
          top:
            (selectedData?.[ENUM.DIAGNOSIS]?.data || []).length === 0
              ? "380px"
              : "300px",
        }}
      >
        {/* <div className="sep-section">
          {sort(
            selectedData?.[ENUM.COMPLAINTS]?.data || [],
            ENUM.COMPLAINTS
          ).map((complaint) => (
            <div>{complaint}</div>
          ))}
          {Array(selectedData[ENUM.COMPLAINTS].emptyLines)
            .fill("")
            .map((el) => (
              <div className="empty-lines">_________________________</div>
            ))}
        </div>  */}

        {(selectedData?.[ENUM.DIAGNOSIS]?.data || []).length !== 0 && (
          <div className="sep-section">
            <strong>Diag.</strong>
            {(selectedData?.[ENUM.DIAGNOSIS]?.data || []).map((diagnosis) => (
              <div className="individual-element">{diagnosis}</div>
            ))}
            {Array(selectedData[ENUM.DIAGNOSIS].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
              ))}
          </div>
        )}

        <div className="sep-section">
          <strong>Rx</strong>
          {(selectedData?.[ENUM.MEDICINES]?.data || []).map((medicines) => (
            <div className="individual-element">{medicines}</div>
          ))}

          {Array(selectedData[ENUM.MEDICINES].emptyLines)
            .fill("")
            .map((el) => (
              <div className="empty-lines">_________________________</div>
            ))}
          {selectedData.days && (
            <div className="individual-element num-of-days">
              {selectedData.days}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Prescription;
