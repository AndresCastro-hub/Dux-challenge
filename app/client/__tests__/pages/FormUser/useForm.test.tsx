import { useGlobalContext } from '@/app/client/context/store';
import useCreateUser from '@/app/client/hooks/useCreateUser';
import useEditUser from '@/app/client/hooks/useEditUser';
import useForm from '@/app/client/pages/User/FormUser/hooks/UseForm';
import { mockUser } from '@/app/client/utils/testUtils';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

jest.mock('../../../context/store', () => ({
    useGlobalContext: jest.fn(),
}));

jest.mock('../../../hooks/useCreateUser', () => jest.fn());
jest.mock('../../../hooks/useEditUser', () => jest.fn());

const mockSetOpenModalUsuario = jest.fn();
const mockSetEsEdicion = jest.fn();
const mockCreateUser = jest.fn();
const mockEditUser = jest.fn();
const mockRefetchUsers = jest.fn();

beforeEach(() => {
    (useGlobalContext as jest.Mock).mockReturnValue({
        setOpenModalUsuario: mockSetOpenModalUsuario,
        setEsEdicion: mockSetEsEdicion,
    });
    (useCreateUser as jest.Mock).mockReturnValue({ createUser: mockCreateUser });
    (useEditUser as jest.Mock).mockReturnValue({ editUser: mockEditUser });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('useForm', () => {

    it('Inicializar formData correctamente al editar', () => {
        const { result } = renderHook(() => useForm({
            esEdicion: true,
            usuario: mockUser,
            setHabilitarConfirmar: jest.fn(),
            refetchUsers: mockRefetchUsers,
        }));

        expect(result.current.formData).toEqual(mockUser);
    });

    it('Controlar cambios en los campos de entrada', () => {
        const { result } = renderHook(() => useForm({
            esEdicion: false,
            usuario: mockUser,
            setHabilitarConfirmar: jest.fn(),
            refetchUsers: mockRefetchUsers,
        }));
    
        const mockEvent = {
            target: {
                name: 'usuario', 
                value: 'dux user',
            },
        } as React.ChangeEvent<HTMLInputElement>;
    
        act(() => {
            result.current.handleChange(mockEvent);
        });
    
        expect(result.current.formData.usuario).toBe('dux user');
    });

    it('Validar correctamente los campos', () => {
        const { result } = renderHook(() => useForm({
            esEdicion: false,
            usuario: mockUser,
            setHabilitarConfirmar: jest.fn(),
            refetchUsers: mockRefetchUsers,
        }));
    
        act(() => {
            result.current.handleChange({
                target: {
                    name: 'id',
                    value: '123',
                },
            } as React.ChangeEvent<HTMLInputElement>);
        });
    
        expect(result.current.errors.id).toBe('El ID debe contener al menos 5 dígitos.');
    
        act(() => {
            result.current.handleChange({
                target: {
                    name: 'usuario',
                    value: 'A',
                },
            } as React.ChangeEvent<HTMLInputElement>);
        });
    
        expect(result.current.errors.usuario).toBe('El usuario debe contener al menos 2 caracteres.');
    });

    it('Controla la limpieza del formulario', () => {
        const { result } = renderHook(() => useForm({
            esEdicion: false,
            usuario: mockUser,
            setHabilitarConfirmar: jest.fn(),
            refetchUsers: mockRefetchUsers,
        }));

        act(() => {
            result.current.handleClear();
        });

        expect(result.current.formData).toEqual({
            id: '',
            usuario: '',
            estado: '',
            sector: 0
        });
        expect(mockSetOpenModalUsuario).toHaveBeenCalledWith(false);
        expect(mockSetEsEdicion).toHaveBeenCalledWith(false);
    });
});
