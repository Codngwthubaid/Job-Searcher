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
  backendUrl: any;
  companyToken: any;
  setCompanyToken: (token: any) => void;
  companyData: any;
  setCompanyData: (data: any) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);