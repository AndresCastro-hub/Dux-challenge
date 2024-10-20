import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../../components/SideBar/Sidebar';

describe('Sidebar', () => {

   const setup = () =>  render(<Sidebar />);

   it('Renderiza 6 iconos', () => {
    setup();
  
    const icons = screen.getAllByTestId('sidebar-icon');
    expect(icons.length).toBe(6);
  });

});
