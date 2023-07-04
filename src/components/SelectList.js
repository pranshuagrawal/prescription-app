import React from "react";
import { CheckMark } from "../icons";
import { MED_TYPE } from "../constants";
const SelectList = ({
  list = [],
  selectedDays = "",
  selectedData = { data: [], emptyLines: 0 },
  onChange = () => {},
  onChangeDays = () => {},
  onChangeEmptyLines = () => {},
  onApply,
  showFilter = false,
  showEmptyLines = true,
  showApply = true,
  eraseText = "Erase",
  additionalFilters = [],
  filterAssociations = {},
}) => {
  const changeHandler = (item) => {
    if (selectedData.data.includes(item)) {
      const _s = [...selectedData.data];
      const index = _s.indexOf(item);
      _s.splice(index, 1);
      onChange([..._s]);
    } else {
      onChange([...selectedData.data, item]);
    }
  };

  const [appliedFilter, setAppliedFilters] = React.useState("");

  const handleFilterChange = (filter) => {
    if (appliedFilter === filter) {
      setAppliedFilters("");
    } else {
      setAppliedFilters(filter);
    }
  };

  const onErase = () => {
    onChange([]);
    onChangeEmptyLines(0);
    onApply();
  };

  return (
    <>
      <div className="select-list-container">
        <div className="select-list">
          {showFilter && (
            <div className="select-list-filters">
              {[...MED_TYPE, ...additionalFilters].map((filter) => (
                <button
                  className={`sm mr-4 mb-4 ${
                    appliedFilter === filter ? "primary" : "grey"
                  }`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {list
            .filter((item) => {
              if (!appliedFilter) return true;
              if (MED_TYPE.includes(appliedFilter))
                return item.includes(appliedFilter);
              return (
                filterAssociations?.[appliedFilter]?.medicines || []
              ).includes(item);
            })
            .map((item) => (
              <div
                className="select-list-item"
                key={item}
                onClick={() => changeHandler(item)}
              >
                {item} {selectedData.data.includes(item) && <CheckMark />}
              </div>
            ))}

          <div className="list-cta-container">
            <div style={{ flex: 1 }}>
              {[
                "",
                "3 Days",
                "5 Days",
                "7 Days",
                "10 Days",
                "15 Days",
                "1 Month",
              ].map((day) => (
                <button
                  className={`${
                    day === selectedDays ? "primary" : "grey"
                  } mr-8 mb-4 sm`}
                  onClick={() => onChangeDays(day)}
                >
                  {day === "" ? "None" : day}
                </button>
              ))}
            </div>
            <div className="list-cta-container-singlerow">
              <div>
                {showEmptyLines && (
                  <>
                    <button
                      className="grey mr-8 sm"
                      onClick={() =>
                        onChangeEmptyLines(+selectedData.emptyLines + 1)
                      }
                    >
                      +
                    </button>
                    <span className="mr-8">
                      {selectedData.emptyLines} Empty Lines
                    </span>
                    <button
                      className="grey sm"
                      onClick={() =>
                        onChangeEmptyLines(+selectedData.emptyLines - 1)
                      }
                    >
                      -
                    </button>
                  </>
                )}
              </div>

              <div>
                <button className="grey mr-4" onClick={onErase}>
                  {eraseText}
                </button>
                {showApply && (
                  <button className="primary" onClick={onApply}>
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectList;
