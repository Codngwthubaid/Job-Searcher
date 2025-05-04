import { useState, useContext, useEffect } from "react";
import { AppContext } from "./context/appContext";
import { jobsData } from "./constants/index";
import { Toaster } from "./components/ui/sonner";
import axios from "axios";
import { toast } from "sonner";

export default function Provider({ children }: { children: React.ReactNode }) {

  const [isJobs, setIsJobs] = useState<typeof jobsData>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isShowRecruiterForm, setIsShowRecruiterForm] = useState(false);
  const [isSearchedFilter, setIsSearchedFilter] = useState({
    JobTitle: "",
    JobLocation: "",
  });
  const [companyToken, setCompanyToken] = useState<null | any>();
  const [companyData, setCompanyData] = useState<null | any>()

  const backendUrl = import.meta.env.VITE_BACKEND_URL!

  const fetchJobsData = () => {
    setIsJobs(jobsData)
  }


  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/company/getCompanyData", {
        headers: {
          Token: `${companyToken}`
        }
      })

      if (data.success) {
        setCompanyData(data.company)
        toast.success(data.message)
        console.log(data)
      }
    } catch (error: any) {
      toast.error(error)
    }
  }


  useEffect(() => {
    fetchJobsData()
    const storeCompanyToken = localStorage.getItem("companyToken");
    if (storeCompanyToken) {
      setCompanyToken(storeCompanyToken);
    }
  }, [])

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData()
    }
  }, [companyToken])

  const AppContextProviderValues = {
    isSearchedFilter,
    setIsSearchedFilter,
    isSearched,
    setIsSearched,
    isJobs,
    setIsJobs,
    isShowRecruiterForm,
    setIsShowRecruiterForm,
    companyData,
    setCompanyData,
    companyToken,
    setCompanyToken,
    backendUrl
  };

  return (
    <AppContext.Provider value={AppContextProviderValues}>
      <Toaster richColors position="top-center" />
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a Provider");
  }
  return context;
};