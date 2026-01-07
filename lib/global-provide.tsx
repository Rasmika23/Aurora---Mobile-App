import { createContext, useContext } from "react"
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User{
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null | undefined;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
    const {
        data: user,
        loading,
        refetch:originalRefetch

    } = useAppwrite({
        fn: getCurrentUser
    });

    const isLoggedIn = !!user;


    const refetch = async(newParams?: Record<string, string | number>) => {
        await originalRefetch(newParams!);
    }

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}

export default GlobalProvider;