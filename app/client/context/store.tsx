'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";
import { Filters } from "../types";
import { Toast } from "primereact/toast";

interface GlobalContextType {
    openModalUsuario: boolean;
    setOpenModalUsuario: Dispatch<SetStateAction<boolean>>; 
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    esEdicion: boolean; 
    setEsEdicion: Dispatch<SetStateAction<boolean>>; 
    toast: React.RefObject<Toast>
}

const GlobalContext = createContext<GlobalContextType>({
    openModalUsuario: false,
    setOpenModalUsuario: (): boolean => false,
    filters: {
        usuario: '',
        estado: {name: '', code: ''},
        sector: {name: '', code: 0}
    },
    setFilters: () => {},
    esEdicion: false,
    setEsEdicion: () => false,
    toast: { current: null } 
});

export const GlobalContextProvider = ({children}: { children: ReactNode }) => {
    const [openModalUsuario, setOpenModalUsuario] = useState<boolean>(false);
    const [filters, setFilters] = useState<Filters>({
        usuario: '',
        estado: {name: '', code: ''},
        sector: {name: '', code: 0}

    });
    const [esEdicion, setEsEdicion] = useState(false);
    const toast = useRef<Toast>(null);

    
    return (
        <GlobalContext.Provider value={{filters, setFilters, openModalUsuario, setOpenModalUsuario, esEdicion, setEsEdicion, toast}}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);
