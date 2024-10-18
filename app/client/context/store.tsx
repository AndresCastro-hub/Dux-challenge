'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Filters } from "../types";




interface GlobalContextType {
    openModalUsuario: boolean;
    setOpenModalUsuario: Dispatch<SetStateAction<boolean>>; 
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    esEdicion: boolean; // Agregar este estado
    setEsEdicion: Dispatch<SetStateAction<boolean>>; 
}

const GlobalContext = createContext<GlobalContextType>({
    openModalUsuario: false,
    setOpenModalUsuario: (): boolean => false,
    filters: {
        usuario: '',
        estado: {name: '', code: ''}
    },
    setFilters: () => {},
    esEdicion: false,
    setEsEdicion: () => false
    
});

export const GlobalContextProvider = ({children}: { children: ReactNode }) => {
    const [openModalUsuario, setOpenModalUsuario] = useState<boolean>(false);
    const [filters, setFilters] = useState<Filters>({
        usuario: '',
        estado: {name: '', code: ''}
    });
    const [esEdicion, setEsEdicion] = useState(false);

    
    return (
        <GlobalContext.Provider value={{filters, setFilters, openModalUsuario, setOpenModalUsuario, esEdicion, setEsEdicion}}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);
