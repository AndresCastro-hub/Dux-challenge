'use client';
import { Button } from "primereact/button";
import { useGlobalContext } from "../../context/store";

const Usuarios: React.FC = () =>  {
    const { setOpenModalUsuario } = useGlobalContext();

    const handleOpenModal = () => {
        setOpenModalUsuario(true);
    };

    return (
        <div className="flex align-items-center justify-content-between">
            <h1 style={{ fontFamily: 'Inter, sans-serif' }} className="font-bold text-3xl">Usuarios</h1>
            <Button onClick={handleOpenModal} raised className="p-2" size="large">
                <i className="ml-2 text-xs pi pi-plus small"></i>
                <span className="font-bold text-base px-1">Nuevo Usuario</span>
            </Button>
        </div>
    );
}

export default Usuarios;