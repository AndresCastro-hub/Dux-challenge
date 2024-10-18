import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useCreateUser from '@/app/client/hooks/useCreateUser';
import { useGlobalContext } from '@/app/client/context/store';
import { estadosTable, sectores } from '@/app/client/constants/dataConstants';
import { Usuario } from '@/app/client/types';

const AddUser = ({usuario}: {usuario: Usuario})   =>  {



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
        sector:'',
        estado:''
    });

    useEffect(() => {
        if(esEdicion){
            setFormData({
                id: usuario.id,
                usuario: usuario.usuario,
                estado: usuario.estado,
                sector: usuario.sector
            })
        }
    },[esEdicion])


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
            return(formData.estado.length >= 4 &&
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | {name: string, value: any}>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    
        // Validación del campo 'id'
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
    
        // Validación del campo 'usuario'
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
            <form onSubmit={handleSubmit} className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="mt-3 p-field">
                    <label className='font-bold text-lg' htmlFor="id">Id:</label>
                    <InputText
                        id="id"
                        placeholder='Ingrese el id del Usuario'
                        className='mt-2'
                        name="id"
                        value={formData.id} 
                        onChange={handleChange}
                    />
                    {errors.id && <small className="p-error">{errors.id}</small>}
                </div>
                <div className="p-field">
                    <label className='font-bold text-lg' htmlFor="usuario">Usuario:</label>
                    <InputText
                        id="usuario"
                        name="usuario"
                        className='mt-2'
                        placeholder='Ingrese el nombre del usuario'
                        value={formData.usuario} 
                        onChange={handleChange}
                    />
                    {errors.usuario && <small className="p-error">{errors.usuario}</small>}
                </div>
                <div className="p-field">
                    <label className='font-bold text-lg' htmlFor="estado">Estado:</label>
                    <Dropdown
                        id="estado"
                        name="estado"
                        value={formData.estado} // Cambiar a formData.estado
                        options={estadosTable}
                        className='mt-2'
                        onChange={(e) => setFormData({ ...formData, estado: e.value })}
                        placeholder="Seleccionar el estado"
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
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                    <Button
                        size='small'
                        type="submit"
                        label={ esEdicion ? 'Editar' : 'Confirmar'}
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