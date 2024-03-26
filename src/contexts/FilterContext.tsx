// This context is responsible for the filter states.
import React, { useState, ReactNode } from "react";
import { createContext } from "react";

interface FilterContextProps {
 filterState: {
    assignee: string;
    priority: string;
    date: string;
 };
 setFilterState: React.Dispatch<React.SetStateAction<{ assignee: string; priority: string; date: string }>>;
}

const defaultFilterContext: FilterContextProps = {
 filterState: {
    assignee: '',
    priority: '',
    date: '',
 },
 setFilterState: () => {}, // Dummy function
};

// Create the context with the default value
export const FilterContext = createContext<FilterContextProps>(defaultFilterContext);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 // Initialize the state with the default context's filterState
 const [filterState, setFilterState] = useState<{ assignee: string; priority: string; date: string }>(defaultFilterContext.filterState);

 return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterContext.Provider>
 );
};
