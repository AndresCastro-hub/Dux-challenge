import { act } from "react";
import { Usuario } from "../types";

export const mockUser: Usuario = { usuario: 'TEST DUX USER', id: '123456', sector: 1000, estado: 'ACTIVO' };

export const testErrorEnElServidor = async (
    action: () => Promise<void>,
    mockToast: { current: { show: jest.Mock } }, 
    refetchUsers: jest.Mock 
) => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await act(async () => {
        await action();
    });

    expect(mockToast.current.show).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error',
        detail: 'Fallo el servidor',
        life: 1500,
    });
    expect(refetchUsers).not.toHaveBeenCalled();
};
