import { createContext } from "react";

interface AppContextType {
  isSearched: boolean;
  setIsSearched: (value: boolean) => void;
  isSearchedFilter: { JobTitle: string; JobLocation: string };
  setIsSearchedFilter: (filter: { JobTitle: string; JobLocation: string }) => void;
  isJobs: any[];
  setIsJobs: (jobs: any[]) => void;
  isShowRecruiterForm: boolean;
  setIsShowRecruiterForm: (value: boolean) => void;
}

export const AppContextProvider = createContext<AppContextType | undefined>(undefined);