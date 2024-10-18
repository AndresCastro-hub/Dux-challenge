

import { Dialog } from 'primereact/dialog';
import HeaderModal from './HeaderModal';
import AddUser from '../../pages/User/FormUser/AddUser';
import { Usuario } from '../../types';

interface CustomModalProps{
    modalProps?:any
    openModal: boolean,
    setOpenModal: (param: boolean) => void;
    usuario: Usuario
}

const CustomModal = <T,>({ openModal, setOpenModal, modalProps, usuario }: CustomModalProps) => {

    const headerStyle = {margin:0, padding:0, height:'20%', width: '100%'}
    
    return(
        <div>
            <Dialog
                header={<HeaderModal setEsEdicion={modalProps} setOpenModal={setOpenModal} />}
                headerStyle={headerStyle}
                draggable={false}
                closable={false}
                visible={openModal}
                className='w-6'
                onHide={() => setOpenModal(false)}
            >
                <AddUser usuario={usuario} />
            </Dialog>
        </div>
    )
}

export default CustomModal;