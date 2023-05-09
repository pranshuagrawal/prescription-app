import React from "react";
import { CheckMark } from "../icons";
import { MED_TYPE } from "../constants";
const SelectList = ({
  list = [],
  selected = [],
  onChange = () => {},
  onApply,
  showFilter = false,
}) => {
  const changeHandler = (item) => {
    if (selected.includes(item)) {
      const _s = [...selected];
      const index = _s.indexOf(item);
      _s.splice(index, 1);
      onChange([..._s]);
    } else {
      onChange([...selected, item]);
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
                {item} {selected.includes(item) && <CheckMark />}
              </div>
            ))}

          <div className="list-cta-container">
            <button className="grey mr-4" onClick={onErase}>
              Erase
            </button>
            <button className="primary" onClick={onApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectList;
