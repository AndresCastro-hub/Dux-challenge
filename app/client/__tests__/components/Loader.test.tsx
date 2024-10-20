import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../../components/Loader/Loader';

describe('Loader', () => {
    const setup = () => render(<Loader />);

    it('Se renderiza correctamente', () => {
        setup();
        const loaderContainer = screen.getByTestId('loader-container'); 
        expect(loaderContainer).toBeInTheDocument();
    });

    it('Se renderiza el spinner', () => {
        setup();
        const spinner = screen.getByRole('progressbar'); 
        expect(spinner).toBeInTheDocument();
    });

   
});
