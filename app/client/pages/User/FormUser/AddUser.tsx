import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/app/client/context/store';
import { estadosTable, sectores } from '@/app/client/constants/dataConstants';
import { Usuario } from '@/app/client/types';
import FormButtons from './Buttons/FormButtons';
import Input from './InputText/Input';
import DropdownInput from './Dropdown/DropdownInput';
import useForm from './hooks/UseForm';

interface AddUserProps{
    usuario : Usuario,
    refetchUsers: () => void;
}

const AddUser = ({ usuario ,refetchUsers}: AddUserProps ) => {

    const { esEdicion } = useGlobalContext();
    const [habilitarConfirmar, setHabilitarConfirmar] = useState<boolean>(false);

    const { 
        formData,
        errors,
        handleSubmit,
        handleChange,
        setFormData,
        handleClear
    } = useForm({ esEdicion, usuario, setHabilitarConfirmar, refetchUsers })

    return (
        <>

            <form onSubmit={handleSubmit} className="flex flex-column gap-3 p-fluid">
                <Input
                    label='Id:'
                    id='id'
                    disabled={esEdicion}
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