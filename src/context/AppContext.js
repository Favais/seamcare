import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const { data: session } = useSession();



    const value = {
        session
    }
    return (
        <AppContext.Provider value={{ value }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);