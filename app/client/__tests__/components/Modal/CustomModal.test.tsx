import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomModal from '@/app/client/components/Modal/CustomModal';
import { Usuario } from '@/app/client/types';

describe('CustomModal', () => {
    const mockSetOpenModal = jest.fn();
    const mockRefetchUsers = jest.fn();
    const mockUsuario: Usuario = {
        usuario: 'Test User',
        estado: 'active',
        sector: 1000,
        id: '1234'
    };

    const modalProps = () => true 

    it('se renderiza CustomModal cuando openModal es true', () => {
        render(
            <CustomModal
                openModal={true} 
                setOpenModal={mockSetOpenModal}
                modalProps={modalProps}
                usuario={mockUsuario}
                refetchUsers={mockRefetchUsers}
            />
        );

        const dialogo = screen.getByRole('dialog'); 
        expect(dialogo).toBeInTheDocument(); 
    });
});
