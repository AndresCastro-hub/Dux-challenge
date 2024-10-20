import { useState } from "react";
import { Usuario } from "../types";
import { useGlobalContext } from "../context/store";

interface useEditUserProps{
    refetchUsers: () => void
}

const useEditUser = ({ refetchUsers }: useEditUserProps) => {
    const { toast } = useGlobalContext();

    const editUser = async (updatedUser: Usuario) => {
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
                toast.current!.show({ severity: 'success', summary: 'Éxito', detail: `El usuario ${updatedUser.usuario} se editó correctamente`, life: 1500 });
                refetchUsers();
                return data; 
            } else {
                toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Error al editar el usuario', life: 1500 });
            }
        } catch {
            toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Fallo el servidor', life: 1500 });
        }
    };

    return {
        editUser
    };
};

export default useEditUser;
