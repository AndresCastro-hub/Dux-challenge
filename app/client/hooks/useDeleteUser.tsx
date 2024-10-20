import { Usuario } from '../types';
import { useGlobalContext } from '../context/store';

interface useDeleteProps{
    refetchUsers: () => void
}

const useDeleteUser = ({refetchUsers}: useDeleteProps) => {

    const {toast} = useGlobalContext()

    const deleteUser = async (rowData: Usuario) => {
        try {
            const response = await fetch(`https://staging.duxsoftware.com.ar/api/personal/${rowData.id}?sector=1000`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.current!.show({ severity: 'success', summary: 'Exito', detail: `Se eliminó correctamente el usuario ${rowData.usuario} .`, life: 1500 });
                refetchUsers()
            } else{
                toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Lo sentimos, vuelve a intentarlo.', life: 1000 });

            }
        } catch {
            toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Fallo la petición al servidor.', life: 1000 });

        } 
    };

    return { deleteUser };
};

export default useDeleteUser;
