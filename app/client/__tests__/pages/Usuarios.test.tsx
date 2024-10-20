import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGlobalContext } from '../../context/store';
import Usuarios from '../../pages/User/Usuarios';

jest.mock('../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

describe('Usuarios', () => {
    const setOpenModalUsuario = jest.fn();

    beforeEach(() => {
        (useGlobalContext as jest.Mock).mockReturnValue({ setOpenModalUsuario });
    });

    it('Controla que se renderiza el título "Usuarios"', () => {
        render(<Usuarios />);
        expect(screen.getByText('Usuarios')).toBeInTheDocument();
    });

    it('Controla que se llame a setOpenModalUsuario con true al hacer clic en el botón', () => {
        render(<Usuarios />);

        const button = screen.getByRole('button', { name: /nuevo usuario/i });
        fireEvent.click(button);

        expect(setOpenModalUsuario).toHaveBeenCalledWith(true);
    });
});
