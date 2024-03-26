import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SortProvider } from "./contexts/SortContext.tsx";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import { FilterProvider } from "./contexts/FilterContext.tsx";
import { ModalProvider } from "./contexts/ModalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <FilterProvider>
        <SortProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </SortProvider>
      </FilterProvider>
    </TaskProvider>
  </React.StrictMode>
);
