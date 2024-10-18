import React from 'react';
import { Button } from 'primereact/button';

interface HeaderModalProps {
    setOpenModal: (param: boolean) => void;
    setEsEdicion: (param: boolean) => void
}

const HeaderModal = ({ setOpenModal, setEsEdicion }: HeaderModalProps) => {
    return (
        <div className="primary flex justify-content-between align-items-center p-2 border-round" style={{ color: 'white', height: '55px' }}>
            <h3 className="m-0">Usuario</h3>
            <div className="flex align-items-center">
                <Button icon="pi pi-cog" className="p-button-text text-white" />
                <Button onClick={() => {setOpenModal(false), setEsEdicion(false)}} icon="pi pi-minus" className="p-button-text text-white" />
            </div>
        </div>
    );
}

export default HeaderModal;
