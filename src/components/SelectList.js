import React from "react";
import { CheckMark } from "../icons";
import { MED_TYPE } from "../constants";
import { sort } from "../methods";
import { ENUM, DURATIONS } from "../constants";

// import { SearchIcon } from "./SearchIcon";
const SelectList = ({
  list = [],
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
  showSearch = false,
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

  const handleDayChange = (item) => {
    if (selectedData.data.includes(item)) {
      let lastDayIndex = -1;
      let currentClickedDayIndex = -1;
      selectedData.data.forEach((dataItem, dataItemIndex) => {
        if (dataItem === item) {
          currentClickedDayIndex = dataItemIndex;
        }
        if (DURATIONS.includes(dataItem)) {
          lastDayIndex = dataItemIndex;
        }
      });
      const _s = [...selectedData.data];
      const removedElements = _s.splice(lastDayIndex + 1);
      _s.splice(currentClickedDayIndex, 0, ...removedElements);
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

  const [isSearchShow, setShowSearch] = React.useState(false);
  const [searchString, setSearchString] = React.useState("");
  const searchRef = React.useRef();

  const initSearch = () => {
    if (isSearchShow) {
      setShowSearch(false);
      setSearchString("");
    } else {
      setShowSearch(true);
      handleFilterChange("");
      setSearchString("");
    }
  };

  const filteredList = React.useMemo(() => {
    let sortedData = [...list];
    if (!appliedFilter || MED_TYPE.includes(appliedFilter)) {
      sortedData = sort(sortedData, ENUM.MEDICINES, []);
    }

    if (
      appliedFilter &&
      !MED_TYPE.includes(appliedFilter) &&
      appliedFilter !== "showSelected"
    ) {
      sortedData = filterAssociations?.[appliedFilter]?.medicines || [];
    }
    return sortedData
      .filter((item, index, arr) => {
        if (!appliedFilter) return true;
        if (index !== arr.lastIndexOf(item)) return false;
        if (MED_TYPE.includes(appliedFilter))
          return item.includes(appliedFilter);
        if (appliedFilter === "showSelected") {
          return selectedData.data.includes(item);
        }
        return true;
      })
      .filter((item) =>
        (item || "").toLowerCase().includes((searchString || "").toLowerCase())
      );
  }, [list, appliedFilter, searchString, filterAssociations, selectedData]);

  return (
    <>
      <div className="select-list-container">
        <div className="select-list">
          {showFilter && (
            <div className="select-list-filters">
              {showSearch && (
                <button
                  className={`sm mr-4 mb-4 ${
                    isSearchShow ? "primary" : "grey"
                  }`}
                  onClick={initSearch}
                >
                  Search
                </button>
              )}
              <button
                className={`sm mr-4 mb-4 ${
                  appliedFilter === "showSelected" ? "primary" : "grey"
                }`}
                onClick={() => handleFilterChange("showSelected")}
              >
                Selected
              </button>
              {[...MED_TYPE, ...additionalFilters].map((filter) => {
                if (["Tab.", "Cap."].includes(filter)) return <></>;

                return (
                  <button
                    className={`sm mr-4 mb-4 ${
                      appliedFilter === filter ? "primary" : "grey"
                    }`}
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter}
                  </button>
                );
              })}

              {isSearchShow && showSearch && (
                <div>
                  <input
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    ref={searchRef}
                    autoFocus
                    placeholder="Search Medicines..."
                    className="search-input"
                  />
                </div>
              )}
            </div>
          )}
          <div className="select-list-items">
            {filteredList.map((item, itemIndex) => {
              const selectedDay =
                selectedData.data.includes(item) &&
                selectedData.data.find(
                  (d, i, arr) => i > arr.indexOf(item) && DURATIONS.includes(d)
                );
              return (
                <div
                  className="select-list-item"
                  onClick={() => changeHandler(item)}
                  // key={item}
                >
                  {item}{" "}
                  {selectedData.data.includes(item) && (
                    <span>
                      {selectedDay && (
                        <span className="selected-day-label">
                          {selectedDay}
                        </span>
                      )}{" "}
                      {<CheckMark />}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="list-cta-container">
            <div style={{ flex: 1 }}>
              {DURATIONS.map((day) => (
                <button
                  className={`${
                    selectedData.data.includes(day) ? "primary" : "grey"
                  } mr-8 mb-4 sm`}
                  // onClick={() => changeHandler(day)}
                  onClick={() => handleDayChange(day)}
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
