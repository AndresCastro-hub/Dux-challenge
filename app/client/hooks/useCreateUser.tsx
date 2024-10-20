import { Usuario } from '../types';
import { useGlobalContext } from '../context/store';

interface useCreateUserProps{
    refetchUsers: () => void
}


const useCreateUser = ({refetchUsers}: useCreateUserProps) => {

    const { toast } = useGlobalContext();
  
    const createUser = async (newUser: Usuario) => {
    
        try {
            const response = await fetch('https://staging.duxsoftware.com.ar/api/personal?sector=1000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const data = await response.json();
                toast.current!.show({ severity: 'success', summary: 'Éxito', detail: `El usuario ${newUser.usuario} se creo correctamente`, life: 1500 });
                refetchUsers();
                return data; 
            } else {
                toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario', life: 1500 });
            }
        } catch {
            toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Fallo el servidor', life: 1500 });
          
        } 
    };

    return { createUser,  };
};

export default useCreateUser;
