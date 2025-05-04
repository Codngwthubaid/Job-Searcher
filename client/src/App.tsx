import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AppliedJobs from "./pages/apply-jobs";
import Applications from "./pages/application";
import RecruiterDashboard from "./pages/recruiter-dashboard";
import ViewApplications from "./pages/view-applications";
import ManageJobs from "./pages/manage-jobs";
import AddJobs from "./pages/add-jobs";
import "quill/dist/quill.snow.css";
import { useAppContext } from "./Provider";

export default function App() {

  const { companyToken } = useAppContext()


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applied-jobs/:id" element={<AppliedJobs />} />
        <Route path={"/applications"} element={<Applications />} />
        <Route path={"/dashboard"} element={<RecruiterDashboard />}>
          {
            companyToken && (
              <>
                <Route path={"view-applications"} element={<ViewApplications />} />
                <Route path={"manage-job"} element={<ManageJobs />} />
                <Route path={"add-job"} element={<AddJobs />} />
              </>
            )
          }
        </Route>
      </Routes>
    </div>
  )
}