import { useState, useContext } from "react";
import { AppContextProvider } from "./context/appContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [isSearched, setIsSearched] = useState(false);
  const [isSearchedFilter, setIsSearchedFilter] = useState({
    JobTitle: "",
    JobLocation: "",
  });


  const AppContextProviderValues = {
    isSearchedFilter,
    setIsSearchedFilter,
    isSearched,
    setIsSearched,
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