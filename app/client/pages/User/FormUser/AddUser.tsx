import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useCreateUser from '@/app/client/hooks/useCreateUser';
import { useGlobalContext } from '@/app/client/context/store';
import { Usuario } from '@/app/client/types';

interface User {
    id: string;
    nombre: string;
    estado: string;
    sector: string;
}

const AddUser = ({usuario}: Usuario)   =>  {

    const { setOpenModalUsuario, setEsEdicion, esEdicion } = useGlobalContext();
    const [habilitarConfirmar, setHabilitarConfirmar] = useState<boolean>(false);

    console.log(esEdicion)


    const [formData, setFormData] = useState<User>({
        id: '',
        nombre: '',
        estado: '',
        sector: ''
    });

    const { createUser, loading, error } = useCreateUser();

    const estados = [
        { label: 'Activo', value: 'activo' },
        { label: 'Inactivo', value: 'inactivo' }
    ];

    const sectores = [
        { label: 'Tecnología', value: 'tecnologia' },
        { label: 'Finanzas', value: 'finanzas' },
        { label: 'Salud', value: 'salud' },
        { label: 'Educación', value: 'educacion' }
    ];

    const [errors, setErrors] = useState({
        id: '',
        nombre: ''
    });

    const handleClear = () => {
        setFormData({
            id: '',
            nombre: '',
            estado: '',
            sector: ''
        });
        setOpenModalUsuario(false);
        setEsEdicion(false)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validación de 5 dígitos para el campo ID
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

        if (name === 'nombre' && value.length < 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nombre: 'El nombre debe contener al menos 2 caracteres.'
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nombre: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            ...formData,
        };
        setOpenModalUsuario(false);
        await createUser(newUser);
    };


    useEffect(() => {
        const validarCampos = () => {
            const isFormValid = Object.values(formData).every(value => value.length >= 1);
            const hasErrors = Object.values(errors).some(error => error.length > 0);
            return isFormValid && !hasErrors;
        };

        setHabilitarConfirmar(validarCampos());
    }, [formData, errors]);

    return (
        <>
            <form onSubmit={handleSubmit} className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="mt-3 p-field">
                    <label className='font-bold text-lg' htmlFor="id">Id:</label>
                    <InputText
                        id="id"
                        placeholder='Ingrese el id del Usuario'
                        className='mt-2'
                        name="id"
                        value={formData.id} // Cambiar a formData.id
                        onChange={handleChange}
                        required
                    />
                    {errors.id && <small className="p-error">{errors.id}</small>}
                </div>
                <div className="p-field">
                    <label className='font-bold text-lg' htmlFor="nombre">Nombre:</label>
                    <InputText
                        id="nombre"
                        name="nombre"
                        className='mt-2'
                        placeholder='Ingrese el nombre del usuario'
                        value={formData.nombre} // Cambiar a formData.nombre
                        onChange={handleChange}
                        required
                    />
                    {errors.nombre && <small className="p-error">{errors.nombre}</small>}
                </div>
                <div className="p-field">
                    <label className='font-bold text-lg' htmlFor="estado">Estado:</label>
                    <Dropdown
                        id="estado"
                        name="estado"
                        value={formData.estado} // Cambiar a formData.estado
                        options={estados}
                        className='mt-2'
                        onChange={(e) => setFormData({ ...formData, estado: e.value })}
                        placeholder="Seleccionar el estado"
                        required
                    />
                </div>
                <div className="p-field">
                    <label className='font-bold text-lg' htmlFor="sector">Sector:</label>
                    <Dropdown
                        id="sector"
                        name="sector"
                        value={formData.sector} // Cambiar a formData.sector
                        options={sectores}
                        onChange={(e) => setFormData({ ...formData, sector: e.value })}
                        placeholder="Selecciona el sector"
                        className='mt-2'
                        required
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                    <Button
                        size='small'
                        type="submit"
                        label={'Confirmar'}
                        disabled={!habilitarConfirmar}
                        style={{ maxWidth: '120px', fontWeight: 'bold' }}
                        icon="pi pi-check"
                        iconPos="left"
                    />
                    <Button
                        size='small'
                        label="Cancelar"
                        onClick={handleClear}
                        className="p-button-text"
                        icon="pi pi-times"
                        iconPos="left"
                        style={{
                            maxWidth: '120px',
                            border: '1px solid #0763E7',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}
                    />
                </div>
            </form>
        </>
    );
}
export default AddUser;