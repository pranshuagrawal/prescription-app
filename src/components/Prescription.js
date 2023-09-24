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
