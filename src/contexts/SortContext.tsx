// This context manages the states for the sorting
import { ReactNode, createContext, useState } from "react";

interface SortContextProps {
 sortState: string;
 setSortState: React.Dispatch<React.SetStateAction<string>>;
}

interface SortProviderProps {
 children: ReactNode;
}

const defaultSortContext: SortContextProps = {
 sortState: '', 
 setSortState: () => {}, 
};

export const SortContext = createContext<SortContextProps>(defaultSortContext);

export const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
 const [sortState, setSortState] = useState<string>("");

 return (
    <SortContext.Provider value={{ sortState, setSortState }}>
      {children}
    </SortContext.Provider>
 );
};
