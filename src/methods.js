import { ENUM, MED_TYPE } from "./constants";
export const sort = (data, type) => {
  const copiedList = [...data];
  if (type === ENUM.MEDICINES) {
    copiedList.sort((a, b) => {
      const atype = a.split(" ")[0];
      const btype = b.split(" ")[0];
      if (MED_TYPE.indexOf(atype) > MED_TYPE.indexOf(btype)) {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    });
    return copiedList;
  }

  copiedList.sort();
  return copiedList;
};
