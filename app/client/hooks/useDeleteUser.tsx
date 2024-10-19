import { useState } from 'react';
import { Usuario } from '../types';

const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteUser = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://staging.duxsoftware.com.ar/api/personal/${userId}?sector=1000`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return true; 
            } else {
                console.error('Error al eliminar el usuario');
                setError('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            setError('Error en la petición');
        } finally {
            setLoading(false);
        }
    };

    return { deleteUser, loading, error };
};

export default useDeleteUser;
