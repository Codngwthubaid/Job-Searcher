import { useState, useContext, useEffect } from "react";
import { AppContextProvider } from "./context/appContext";
import { jobsData } from "./constants/index";

export default function Provider({ children }: { children: React.ReactNode }) {

  const [isJobs, setIsJobs] = useState<typeof jobsData>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isSearchedFilter, setIsSearchedFilter] = useState({
    JobTitle: "",
    JobLocation: "",
  });

  const fetchJobsData = () => {
    setIsJobs(jobsData)
  }

  useEffect(() => { fetchJobsData() }, [])

  const AppContextProviderValues = {
    isSearchedFilter,
    setIsSearchedFilter,
    isSearched,
    setIsSearched,
    isJobs,
    setIsJobs
  };

  return (
    <AppContextProvider.Provider value={AppContextProviderValues}>
      {children}
    </AppContextProvider.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContextProvider);
  if (!context) {
    throw new Error("useAppContext must be used within a Provider");
  }
  return context;
};