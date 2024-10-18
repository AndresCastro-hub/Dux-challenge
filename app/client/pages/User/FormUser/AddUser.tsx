import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useCreateUser from '@/app/client/hooks/useCreateUser';
import { useGlobalContext } from '@/app/client/context/store';
import { estadosTable, sectores } from '@/app/client/constants/dataConstants';
import { Usuario } from '@/app/client/types';
import FormButtons from './Buttons/FormButtons';
import Input from './InputText/Input';
import DropdownInput from './Dropdown/DropdownInput';

const AddUser = ({ usuario }: { usuario: Usuario }) => {

    const { setOpenModalUsuario, setEsEdicion, esEdicion } = useGlobalContext();
    const [habilitarConfirmar, setHabilitarConfirmar] = useState<boolean>(false);
    const { createUser, loading, error } = useCreateUser();

    const [formData, setFormData] = useState<Usuario>({
        id: '',
        usuario: '',
        estado: '',
        sector: 0
    });

    const [errors, setErrors] = useState({
        id: '',
        usuario: '',
    });

    useEffect(() => {
        if (esEdicion) {
            setFormData({
                id: usuario.id,
                usuario: usuario.usuario,
                estado: usuario.estado,
                sector: usuario.sector
            })
        }
    }, [esEdicion])


    useEffect(() => {

        const existieronCambios = () => {
            return (
                formData.id !== usuario.id ||
                formData.usuario !== usuario.usuario ||
                formData.estado !== usuario.estado ||
                formData.sector !== usuario.sector
            );
        };

        const validarCampos = () => {
            return (formData.estado.length >= 4 &&
                formData.id.length >= 5 &&
                formData.sector === 1000 &&
                formData.usuario.length >= 2)
        }

        if (esEdicion) {
            setHabilitarConfirmar(validarCampos() && existieronCambios());
        } else {
            setHabilitarConfirmar(validarCampos());
        }

    }, [formData, errors]);

    const handleClear = () => {
        setFormData({
            id: '',
            usuario: '',
            estado: '',
            sector: 0
        });
        setOpenModalUsuario(false);
        setEsEdicion(false)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name: string, value: any }>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'id' && value.length < 5) {
            setErrors({
                ...errors,
                id: 'El ID debe contener al menos 5 dígitos.'
            });
        } else {
            setErrors({
                ...errors,
                id: ''
            });
        }

        if (name === 'usuario' && value.length < 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                usuario: 'El nombre debe contener al menos 2 caracteres.'
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                usuario: ''
            }));
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: Usuario = {
            ...formData,
        };
        setOpenModalUsuario(false);
        await createUser(newUser);
    };



    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-column gap-3 p-fluid">
                <Input
                    label='Id:'
                    id='id'
                    placeholder='Ingrese el id del Usuario'
                    value={formData.id}
                    handleChange={handleChange}
                    error={errors.id}
                />
                <Input
                    label='Usuario:'
                    id="usuario"
                    placeholder='Ingrese el nombre del usuario'
                    value={formData.usuario}
                    handleChange={handleChange}
                    error={errors.usuario}
                />

                <DropdownInput
                    id="estado"
                    value={formData.estado}
                    options={estadosTable}
                    handleChange={(e) => setFormData({ ...formData, estado: e.value })}
                    label="Estado"
                    placeholder='Seleccionar el estado'
                />

                <DropdownInput
                    label='Sector'
                    id='sector'
                    value={formData.sector}
                    options={sectores}
                    handleChange={(e) => setFormData({ ...formData, sector: e.value })}
                    placeholder='Seleccionar el sector'
                />

                <FormButtons esEdicion={esEdicion} habilitarConfirmar={habilitarConfirmar} handleClear={handleClear} />

            </form>
        </>
    );
}
export default AddUser;