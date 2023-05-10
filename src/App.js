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

  const complaintsData =
    (data || []).find((el) => el.id === "Complaints")?.data || [];
  const complaints = complaintsData.map((el) => el.Complaints).sort();

  const diagnosisData =
    (data || []).find((el) => el.id === "Diagnosis")?.data || [];
  const diagnosis = diagnosisData.map((el) => el.Diagnosis).sort();

  const medicinesData =
    (data || []).find((el) => el.id === "Medicines")?.data || [];
  let medicines = medicinesData.map((el) => el.Medicines);
  medicines = sort(medicines, ENUM.MEDICINES);

  console.log("complaintsData:", complaints);
  console.log("diagnosisData:", diagnosis);
  console.log("medicines:", medicines);

  return (
    <div>
      <Prescription
        APP_VERSION={APP_VERSION}
        data={{ complaints, medicines, diagnosis }}
      />
    </div>
  );
}

export default App;
