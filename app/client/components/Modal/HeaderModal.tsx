import { Button } from 'primereact/button';

interface HeaderModalProps {
    setOpenModal: (param: boolean) => void;
    setEsEdicion: (param: boolean) => void
}

const HeaderModal = ({ setOpenModal, setEsEdicion }: HeaderModalProps) => {
    return (
        <div className="primary flex justify-content-between align-items-center p-2 border-round text-white mb-3" >
            <h3 className="m-0">Usuario</h3>
            <div className="flex align-items-center">
                <Button icon="pi pi-cog" className="p-button-text text-white" />
                <Button onClick={() => {setOpenModal(false); setEsEdicion(false)}} data-testid="close-button" icon="pi pi-minus" className="p-button-text text-white" />
            </div>
        </div>
    );
}

export default HeaderModal;
