// this context is responsible for handling all the modals which will be poping up in the web-app.
import { createContext, useState } from "react";

interface ModalContextProps {
 modalState: {
    type: string;
    isOpen: boolean;
    props?: any;
 };
 setModalState: React.Dispatch<
    React.SetStateAction<{ type: string; isOpen: boolean; props?: any }>
 >;
}

const defaultModalContext: ModalContextProps = {
 modalState: {
    type: "",
    isOpen: false,
 },
 setModalState: () => {},
};

export const ModalContext = createContext<ModalContextProps>(defaultModalContext);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [modalState, setModalState] = useState<{ type: string; isOpen: boolean; props?: any }>(defaultModalContext.modalState);

 return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalContext.Provider>
 );
};
