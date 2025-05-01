import { AppContextProvider } from "./context/appContext";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <AppContextProvider.Provider value={{}}>
            {children}
        </AppContextProvider.Provider>
    )
}

export const useAppContext = () => {
    return AppContextProvider;
}