import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AppliedJobs from "./pages/apply-jobs";
import Applications from "./pages/application";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/applied-jobs/:id" element={<AppliedJobs />} />
      <Route path={"/applications"} element={<Applications />} />
    </Routes>
  )
}