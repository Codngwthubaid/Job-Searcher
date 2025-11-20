import { useState, useContext, useEffect } from "react";
import { AppContext } from "./context/appContext";
import { jobsData } from "./constants/index";
import { Toaster } from "./components/ui/sonner";
import axios from "axios";
import { toast } from "sonner";
import { useAuth, useUser } from "@clerk/clerk-react";

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
  const [userData, setUserData] = useState<null | any>()
  const [userApplications, setUserApplications] = useState<string[]>([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL!

  const { user } = useUser()
  const { getToken } = useAuth()


  const fetchJobsData = async () => {
    try {

      const { data } = await axios.get(backendUrl + "/jobs", {
        headers: {
          Token: `${companyToken}`
        }
      })

      if (data.success) {
        setIsJobs(data.jobs)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error: any) {
      toast.error(error.message);

    }
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
      }
    } catch (error: any) {
      toast.error(error.message);

    }
  }

  const fetchUserData = async () => {
    try {

      const token = await getToken()

      const { data } = await axios.get(backendUrl + "/users/userData", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if (data.success) {
        setUserData(data.user)
        toast.success(data.message)
      }
    } catch (error: any) {
      toast.error(error.message);

    }
  }

  const fetchUserJobApplicationsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/users/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (data.success) {
        setUserApplications(data.jobApplications);
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };


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

  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchUserJobApplicationsData()
    }
  }, [user])




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
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchJobsData,
    fetchUserData,
    fetchCompanyData,
    fetchUserJobApplicationsData
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