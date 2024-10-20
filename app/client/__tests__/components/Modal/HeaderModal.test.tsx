import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderModal from '@/app/client/components/Modal/HeaderModal';

describe('HeaderModal', () => {
    const mockSetOpenModal = jest.fn();
    const mockSetEsEdicion = jest.fn();

    beforeEach(() => {
        render(
            <HeaderModal 
                setOpenModal={mockSetOpenModal}
                setEsEdicion={mockSetEsEdicion}
            />
        );
    });

    it('llama a setOpenModal y setEsEdicion con false al hacer clic en el botón de cerrar', () => {
        const closeButton = screen.getByTestId('close-button'); 
        fireEvent.click(closeButton);
        expect(mockSetOpenModal).toHaveBeenCalledWith(false);
        expect(mockSetEsEdicion).toHaveBeenCalledWith(false);
    });
});
