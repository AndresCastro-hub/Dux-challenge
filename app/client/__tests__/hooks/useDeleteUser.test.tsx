import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useDeleteUser from '../../hooks/useDeleteUser';
import { useGlobalContext } from '../../context/store';
import { mockUser, testErrorEnElServidor } from '../../utils/testUtils';

jest.mock('../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

global.fetch = jest.fn();

describe('useDeleteUser', () => {
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

    it('Eliminar un usuario exitosamente', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useDeleteUser({ refetchUsers }));

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        await act(async () => {
            await result.current.deleteUser(mockUser);
        });

        expect(mockToast.current.show).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Exito',
            detail: `Se eliminó correctamente el usuario ${mockUser.usuario} .`,
            life: 1500,
        });
        expect(refetchUsers).toHaveBeenCalled();
    });

    it('Controlar errores de eliminación de usuario', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useDeleteUser({ refetchUsers }));

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await act(async () => {
            await result.current.deleteUser(mockUser);
        });

        expect(mockToast.current.show).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Lo sentimos, vuelve a intentarlo.',
            life: 1000,
        });
        expect(refetchUsers).not.toHaveBeenCalled();
    });

    it('Controlar fallos en el servidor al momento de eliminar un usuario', async () => {
        const refetchUsers = jest.fn();
        const { result } = renderHook(() => useDeleteUser({ refetchUsers }));

        await testErrorEnElServidor(
            result.current.deleteUser.bind(null, mockUser), 
            mockToast,
            refetchUsers
        );
    });
});
