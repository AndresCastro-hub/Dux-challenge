import { useGlobalContext } from '../../context/store';
import useCreateUser from '../../hooks/useCreateUser';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { mockUser, testErrorEnElServidor } from '../../utils/testUtils';

jest.mock('../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

global.fetch = jest.fn();

describe('useCreateUser', () => {

    const mockToast = {
        current: {
            show: jest.fn(),
        },
    };
    
    beforeEach(() => {
        (useGlobalContext as jest.Mock).mockReturnValue({ toast: mockToast });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
   it('Crear un usuario exitosamente', async () => {
    const refetchUsers = jest.fn();
    const { result } = renderHook(() => useCreateUser({ refetchUsers }));

    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockUser), 
    });

    await act(async () => {
        await result.current.createUser(mockUser);
    });

    expect(mockToast.current.show).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Éxito',
        detail: `El usuario ${mockUser.usuario} se creo correctamente`,
        life: 1500,
    });

    expect(refetchUsers).toHaveBeenCalled();
});

    it('Controlar errores de creación de usuario', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useCreateUser({ refetchUsers }));

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: jest.fn(),
        });

        await act(async () => {
            await result.current.createUser(mockUser);
        });

        expect(mockToast.current.show).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el usuario',
            life: 1500,
        });
        expect(refetchUsers).not.toHaveBeenCalled(); 
    });

    it('Controlar fallos en el servidor al momento de crear un usuario', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useCreateUser({ refetchUsers }));

        await testErrorEnElServidor(result.current.createUser.bind(null, mockUser), mockToast, refetchUsers);
    });
});
