import React from "react";
import { CheckMark } from "../icons";
import { MED_TYPE } from "../constants";
const SelectList = ({
  list = [],
  selectedData = { data: [], emptyLines: 0 },
  onChange = () => {},
  onChangeEmptyLines = () => {},
  onApply,
  showFilter = false,
  showEmptyLines = true,
  showApply = true,
  eraseText = "Erase",
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
              {MED_TYPE.map((filter) => (
                <button
                  className={`sm mr-4 ${
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
            .filter((item) =>
              appliedFilter ? item.includes(appliedFilter) : true
            )
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
    </>
  );
};

export default SelectList;
