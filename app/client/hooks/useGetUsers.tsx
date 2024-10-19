import { useState, useEffect } from 'react';
import { Usuario } from '../types';

function useGetUsers(rowsPerPage:number, pageActual:number) {
    const [data, setData] = useState<Usuario[]>([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState<boolean>(true);
    const [errorUsuarios, setErrorUsuarios] = useState<boolean>(false);

    const fetchDataUsers = async () => {
        try {
            const response = await fetch(`https://staging.duxsoftware.com.ar/api/personal?sector=1000&_limit=${rowsPerPage}&_page=${pageActual}`);
            const result = await response.json();
            setData(result);
        } catch {
            setErrorUsuarios(true);
        } finally {
            setLoadingUsuarios(false);
        }
    };

    useEffect(() => {
        fetchDataUsers();
    }, [rowsPerPage, pageActual]);

    return { data, loadingUsuarios, errorUsuarios, refetchUsers:fetchDataUsers }; 
}

export default useGetUsers;
