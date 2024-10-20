import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useEditUser from '../../hooks/useEditUser';
import { mockUser, testErrorEnElServidor } from '../../utils/testUtils';
import { useGlobalContext } from '../../context/store';

jest.mock('../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

global.fetch = jest.fn();

describe('useEditUser', () => {
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


    it('Editar un usuario exitosamente', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useEditUser({ refetchUsers }));

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockUser), 
        });

        await act(async () => {
            const response = await result.current.editUser(mockUser);
            expect(response).toEqual(mockUser); 
        });

        expect(mockToast.current.show).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Éxito',
            detail: `El usuario ${mockUser.usuario} se editó correctamente`,
            life: 1500,
        });
        expect(refetchUsers).toHaveBeenCalled();
    });

    it('Controlar errores de edición de usuario', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useEditUser({ refetchUsers }));

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await act(async () => {
            await result.current.editUser(mockUser);
        });

        expect(mockToast.current.show).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al editar el usuario',
            life: 1500,
        });
        expect(refetchUsers).not.toHaveBeenCalled();
    });

    it('Controlar fallos en el servidor al momento de editar un usuario', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useEditUser({ refetchUsers }));

        await testErrorEnElServidor(
            result.current.editUser.bind(null, mockUser),
            mockToast,
            refetchUsers
        );
    });
});
