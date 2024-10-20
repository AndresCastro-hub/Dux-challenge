import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../components/Navbar/NavBar';

describe('NavBar', () => {

    const setup = () => render(<Navbar/>)

    it('Se renderiza el logo', () => {
        setup()
        const logo = screen.getAllByAltText('LogoApp')[0]
        expect(logo).toBeInTheDocument();
    })

    it('Se renderiza el boton con el icono correcto', () => {
        setup()
        const settingsButton = screen.getByRole('button', {name: 'Configuracion'});
        expect(settingsButton).toBeInTheDocument()
        const icon = settingsButton.querySelector('.pi.pi-cog');
        expect(icon).toBeInTheDocument();
    })

})