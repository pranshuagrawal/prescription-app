import React from "react";
import AddLayout from "./AddLayout";
import SelectList from "./SelectList";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ENUM, DURATIONS } from "../constants";

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
          // selectedDays={selectedData.days}
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
            {(selectedData?.[ENUM.MEDICINES]?.data || []).map((medicines) => {
              if (DURATIONS.includes(medicines)) {
                return (
                  <div className="individual-element num-of-days">
                    {medicines}
                  </div>
                );
              }
              return <div className="individual-element">{medicines}</div>;
            })}

            {Array(selectedData[ENUM.MEDICINES].emptyLines)
              .fill("")
              .map((el) => (
                <div className="empty-lines">_________________________</div>
              ))}
            {/* {selectedData.days && (
              <div className="individual-element num-of-days">
                {selectedData.days}
              </div>
            )} */}
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
          {(selectedData?.[ENUM.MEDICINES]?.data || []).map((medicines) => {
            if (DURATIONS.includes(medicines)) {
              return (
                <div className="individual-element num-of-days">
                  {medicines}
                </div>
              );
            }
            return <div className="individual-element">{medicines}</div>;
          })}

          {Array(selectedData[ENUM.MEDICINES].emptyLines)
            .fill("")
            .map((el) => (
              <div className="empty-lines">_________________________</div>
            ))}
          {/* {selectedData.days && (
            <div className="individual-element num-of-days">
              {selectedData.days}
            </div>
          )} */}

          <img
            alt="sign"
            className="signature"
            src={`data:image/jpeg;base64,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`}
          />
        </div>
      </div>
    </>
  );
};
export default Prescription;
