

import { Dialog } from 'primereact/dialog';
import HeaderModal from './HeaderModal';
import AddUser from '../../pages/User/FormUser/AddUser';
import { Usuario } from '../../types';

interface CustomModalProps<T>{
    modalProps:T,
    openModal: boolean,
    setOpenModal: (param: boolean) => void;
    usuario: Usuario
    refetchUsers: () => void
}

const CustomModal = <T extends (param: boolean) => void > ({ openModal, setOpenModal, modalProps, usuario, refetchUsers }: CustomModalProps<T>) => {

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
                <AddUser refetchUsers = {refetchUsers} usuario={usuario} />
            </Dialog>
        </div>
    )
}

export default CustomModal;