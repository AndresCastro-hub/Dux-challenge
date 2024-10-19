import { useState } from "react";
import { Usuario } from "../types";

const useEditUser = () => {

    const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
    const [errorEdit, setErrorEdit] = useState<string | null>(null);

    const editUser = async (updatedUser: Usuario) => {
        setLoadingEdit(true);
        setErrorEdit(null);
        try {
            const response = await fetch(`https://staging.duxsoftware.com.ar/api/personal/${updatedUser.id}?sector=1000`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                const data = await response.json();
                return data; 
            } else {
                console.error('Error al editar usuario');
                setErrorEdit('Error al editar usuario');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            setErrorEdit('Error en la petición');
        } finally {
            setLoadingEdit(false);
        }
    };


    return{
        editUser, loadingEdit,errorEdit
    }
}
export default useEditUser;