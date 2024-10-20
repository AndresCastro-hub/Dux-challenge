import { render, screen, fireEvent } from '@testing-library/react';
import { useGlobalContext } from '@/app/client/context/store';
import useGetUsers from '@/app/client/hooks/useGetUsers';
import Table from '@/app/client/pages/User/Table/Table';
import useDeleteUser from '@/app/client/hooks/useDeleteUser';

jest.mock('../../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

jest.mock('../../../hooks/useGetUsers');
jest.mock('../../../hooks/useDeleteUser');

const mockSetOpenModalUsuario = jest.fn();
const mockSetEsEdicion = jest.fn();
const mockRefetchUsers = jest.fn();
const mockDeleteUser = jest.fn();
const mockToast = { current: { show: jest.fn() } };
const mockData = [
    { id: '1', usuario: 'Usuario 1', estado: 'ACTIVO', sector: 1000 },
    { id: '2', usuario: 'Usuario 2', estado: 'INACTIVO', sector: 1000 },
];

beforeEach(() => {
    (useGlobalContext as jest.Mock).mockReturnValue({
        filters: {},
        openModalUsuario: false,
        setOpenModalUsuario: mockSetOpenModalUsuario,
        setEsEdicion: mockSetEsEdicion,
        toast: mockToast,
    });

    (useDeleteUser as jest.Mock).mockReturnValue({ deleteUser: mockDeleteUser });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Table Component', () => {

    it('Muestra un loader mientras se cargan los usuarios', () => {
        (useGetUsers as jest.Mock).mockReturnValue({
            data: [],
            loadingUsuarios: true,
            errorUsuarios: null,
            refetchUsers: mockRefetchUsers,
        });

        render(<Table />);
        expect(screen.getByTestId('loader-container')).toBeInTheDocument();
    });

    it('Muestra un error si hay un problema al cargar usuarios', () => {
        (useGetUsers as jest.Mock).mockReturnValue({
            data: [],
            loadingUsuarios: false,
            errorUsuarios: new Error('Error de carga'),
            refetchUsers: mockRefetchUsers,
        });

        render(<Table />);
        expect(screen.getByText(/Ocurrio un error/i)).toBeInTheDocument();
    });

    it('Muestra los usuarios en la tabla', () => {
        
        (useGetUsers as jest.Mock).mockReturnValue({
            data: mockData,
            loadingUsuarios: false,
            errorUsuarios: null,
            refetchUsers: mockRefetchUsers,
        });
    
        (useGlobalContext as jest.Mock).mockReturnValue({
            filters: {
                usuario: '',
                estado: { code: '' },
            },
            openModalUsuario: false,
            setOpenModalUsuario: mockSetOpenModalUsuario,
            setEsEdicion: mockSetEsEdicion,
            toast: mockToast,
        });
    
        render(<Table />);
    
        expect(screen.getByText('Usuario 1')).toBeInTheDocument();
        expect(screen.getByText('Usuario 2')).toBeInTheDocument();
    });

    it('Abre el modal de usuario en modo edición al hacer clic en un usuario', () => {
        const mockData = [
            { id: '1', usuario: 'Usuario 1', estado: 'ACTIVO', sector: 1000 },
            { id: '2', usuario: 'Usuario 2', estado: 'INACTIVO', sector: 1000 },
        ];
    
        (useGetUsers as jest.Mock).mockReturnValue({
            data: mockData,
            loadingUsuarios: false,
            errorUsuarios: null,
            refetchUsers: mockRefetchUsers,
        });
    
        (useGlobalContext as jest.Mock).mockReturnValue({
            filters: {
                usuario: '',
                estado: { code: '' },
            },
            openModalUsuario: false,
            setOpenModalUsuario: mockSetOpenModalUsuario,
            setEsEdicion: mockSetEsEdicion,
            toast: mockToast,
        });
    
        render(<Table />);
    
        fireEvent.click(screen.getByText('Usuario 1'));
    
        expect(mockSetOpenModalUsuario).toHaveBeenCalledWith(true);
        expect(mockSetEsEdicion).toHaveBeenCalledWith(true);
    });
});
