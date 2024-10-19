import { useState } from 'react';
import { Usuario } from '../types';

const useDeleteUser = () => {
    const [errorDeleteUsuario, setErrorDeleteUsuario] = useState<boolean>(false);

    const deleteUser = async (userId: string) => {
        try {
            const response = await fetch(`https://staging.duxsoftware.com.ar/api/personal/${userId}?sector=1000`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return true; 
            } 
        } catch {
            setErrorDeleteUsuario(true);
        } 
    };

    return { deleteUser, errorDeleteUsuario };
};

export default useDeleteUser;
