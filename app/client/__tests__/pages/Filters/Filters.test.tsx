import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalContextProvider } from '@/app/client/context/store';
import Filters from '@/app/client/pages/User/Filters/Filters';

const renderWithContext = (children: any) => {
    return render(
        <GlobalContextProvider>
            {children}
        </GlobalContextProvider>
    );
};

describe('Filters', () => {

    it('Renderiza el buscador correctamente', () => {
        renderWithContext(<Filters />);
        const searchInput = screen.getByPlaceholderText('Buscar');
        expect(searchInput).toBeInTheDocument();
    });

    it('Actualiza el estado de filtro de usuario al escribir', () => {
        renderWithContext(<Filters />);
        const searchInput = screen.getByPlaceholderText('Buscar'); 
        fireEvent.change(searchInput, { target: { value: 'DUX USER' } });
        expect(searchInput as HTMLInputElement).toHaveValue('DUX USER'); 
    });

    it('Renderiza el dropdown de sector correctamente',  () => {
        renderWithContext(<Filters />);
        expect(screen.getByTestId('sector-dropdown')).toBeInTheDocument();
    });

    it('Renderiza el dropdown de estado correctamente',  () => {
        renderWithContext(<Filters />);
        expect(screen.getByTestId('estado-dropdown')).toBeInTheDocument();
    });

});
