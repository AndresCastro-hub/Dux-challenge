import { useState } from 'react';
import { Usuario } from '../types';

const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = async (newUser: Usuario) => {
        setLoading(true);
        setError(null);
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
                return data; // Podrías devolver los datos si es necesario
            } else {
                console.error('Error al agregar usuario');
                setError('Error al agregar usuario');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            setError('Error en la petición');
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error };
};

export default useCreateUser;
