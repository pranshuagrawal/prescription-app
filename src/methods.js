import { ENUM, MED_TYPE } from "./constants";
const TOP_MEDS = ["RRD", "Bestozyme", "Supra Plus"];
export const sort = (data, type) => {
  // console.log("TOP_MEDS:", TOP_MEDS);
  const copiedList = [...data];
  if (type === ENUM.MEDICINES) {
    copiedList.sort((a, b) => {
      const atype = a.split(" ")[0];
      const aName = a.split(" ")[1];
      const btype = b.split(" ")[0];
      if (TOP_MEDS.find((TOPMED) => aName.includes(TOPMED))) return -1;
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
