import { useGlobalContext } from "@/app/client/context/store";
import useCreateUser from "@/app/client/hooks/useCreateUser";
import useEditUser from "@/app/client/hooks/useEditUser";
import { Usuario } from "@/app/client/types";
import { useEffect, useState } from "react";

interface useFormProps{
    esEdicion:boolean,
    usuario: Usuario,
    setHabilitarConfirmar: (param : boolean) => void
}

const useForm = ({esEdicion, usuario, setHabilitarConfirmar}: useFormProps )  => {

    const { setOpenModalUsuario, setEsEdicion } = useGlobalContext();
    const { createUser, loading, error } = useCreateUser();
    const { editUser, loadingEdit, errorEdit } = useEditUser();

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name: string, value: string }>) => {
        const { name, value } = e.target;
        updateFormData(name, value);
        contieneErrores(name, value);
    };

    const updateFormData = (name: string, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const contieneErrores = (name: string, value: string) => {
        switch (name) {
            case 'id':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    id: value.length < 5 ? 'El ID debe contener al menos 5 dígitos.' : ''
                }));
                break;
            case 'usuario':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usuario: value.length < 2 ? 'El nombre debe contener al menos 2 caracteres.' : ''
                }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: Usuario = {
            ...formData,
        };
        setOpenModalUsuario(false);
        
        if(esEdicion){
            await editUser(newUser);
        }else{
            await createUser(newUser);
        }
    };

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

    const validarCampos = () => {
        return (formData.estado.length >= 4 &&
            formData.id.length >= 5 &&
            formData.sector === 1000 &&
            formData.usuario.length >= 2)
    }

    //La idea de esta funcion es que no te deje editar si no existieron cambios
    //para evitar una llamada al servicio de forma innecesaria.
    const existieronCambios = () => {
        return (
            formData.id !== usuario.id ||
            formData.usuario !== usuario.usuario ||
            formData.estado !== usuario.estado ||
            formData.sector !== usuario.sector
        );
    };
    
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
        if (esEdicion) {
            setHabilitarConfirmar(validarCampos() && existieronCambios());
        } else {
            setHabilitarConfirmar(validarCampos());
        }
    }, [formData, errors]);

    return {
        handleSubmit,
        formData,
        handleChange, 
        errors,
        setFormData,
        handleClear
    };
};
export default useForm;
