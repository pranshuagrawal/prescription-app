import useGoogleSheets from "use-google-sheets";
import Prescription from "./components/Prescription";
// import { sampleData } from "./data";
import { ENUM } from "./constants";
import "./App.css";
import { sort } from "./methods";

function App() {
  const APP_VERSION = "v0.1";
  const SHEETID = "1rceEFM19Ict10k1PGVcV_iqawL55V3YT2VmSLMWFafg";
  const APIKEY = "AIzaSyCYdBlnNPHHP31kM7D5-9MW9FeqOHfW_q0";

  const { data, loading, error } = useGoogleSheets({
    apiKey: APIKEY,
    sheetId: SHEETID,
  });

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="loader">Error...</div>;
  }

  const groupsData = (data || []).find((el) => el.id === "Groups")?.data || [];
  const groups = groupsData.map((el) => el.GroupId).sort();
  const groupAssociations = {};
  groups.forEach((group) => {
    groupAssociations[group] = {
      [ENUM.COMPLAINTS]: [],
      [ENUM.DIAGNOSIS]: [],
      [ENUM.MEDICINES]: [],
    };
  });

  const complaintsData =
    (data || []).find((el) => el.id === "Complaints")?.data || [];
  const complaints = complaintsData
    .map((el) => {
      if (el.Group) {
        const specificGroups = el.Group.split(",").map((el) => el.trim());
        specificGroups.forEach((specificGroup) => {
          if (groupAssociations[specificGroup]) {
            groupAssociations[specificGroup][ENUM.COMPLAINTS].push(
              el.Complaints
            );
          }
        });
      }
      return el.Complaints;
    })
    .sort();

  const diagnosisData =
    (data || []).find((el) => el.id === "Diagnosis")?.data || [];
  const diagnosis = diagnosisData
    .map((el) => {
      if (el.Group) {
        const specificGroups = el.Group.split(",").map((el) => el.trim());
        specificGroups.forEach((specificGroup) => {
          if (groupAssociations[specificGroup]) {
            groupAssociations[specificGroup][ENUM.DIAGNOSIS].push(el.Diagnosis);
          }
        });
      }
      return el.Diagnosis;
    })
    .sort();

  const medicinesData =
    (data || []).find((el) => el.id === "Medicines")?.data || [];
  let medicines = medicinesData.map((el) => {
    if (el.Group) {
      const specificGroups = el.Group.split(",").map((el) => el.trim());
      specificGroups.forEach((specificGroup) => {
        if (groupAssociations[specificGroup]) {
          groupAssociations[specificGroup][ENUM.MEDICINES].push(el.Medicines);
        }
      });
    }
    return el.Medicines;
  });

  medicines = sort(medicines, ENUM.MEDICINES);

  return (
    <div>
      <Prescription
        APP_VERSION={APP_VERSION}
        data={{ complaints, medicines, diagnosis, groups, groupAssociations }}
      />
    </div>
  );
}

export default App;
