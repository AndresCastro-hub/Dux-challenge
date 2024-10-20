import { renderHook, waitFor } from '@testing-library/react';
import useGetUsers from '../../hooks/useGetUsers';
import { useGlobalContext } from '../../context/store';
import { mockUser } from '../../utils/testUtils';

jest.mock('../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

global.fetch = jest.fn();

describe('useGetUsers', () => {
    const mockToast = { current: { show: jest.fn() } };

    beforeEach(() => {
        (useGlobalContext as jest.Mock).mockReturnValue({ toast: mockToast });
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('Obtener usuarios exitosamente', async () => {
        const rowsPerPage = 10;
        const pageActual = 1;

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockUser),
        });

        const { result } = renderHook(() => useGetUsers(rowsPerPage, pageActual));

        await waitFor(() => {
            expect(result.current.loadingUsuarios).toBe(false);
            expect(result.current.errorUsuarios).toBe(false);
            expect(result.current.data).toEqual(mockUser);
        });
    });

    it('Controlar fallos en el servidor al momento de obtener los usuarios', async () => {
        const rowsPerPage = 10;
        const pageActual = 1;

        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useGetUsers(rowsPerPage, pageActual));

        await waitFor(() => {
            expect(result.current.loadingUsuarios).toBe(false); 
            expect(result.current.errorUsuarios).toBe(true);   
        });
    });
});
