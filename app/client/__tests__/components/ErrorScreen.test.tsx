import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorScreen from '../../components/ErrorScreen/ErrorScreen';

describe('ErrorScreen', () => {
    const setup = () => render(<ErrorScreen />);

    it('Se renderiza correctamente', () => {
        setup();
        
        const errorContainer = screen.getByText(/Ocurrio un error/i);
        expect(errorContainer).toBeInTheDocument();
    });

    it('Renderiza el mensaje de error correcto', () => {
        setup();

        const errorMessage = screen.getByText('Ocurrio un error.');
        expect(errorMessage).toBeInTheDocument();
        
    });
});
