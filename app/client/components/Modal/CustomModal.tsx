

import { Dialog } from 'primereact/dialog';
import HeaderModal from './HeaderModal';

interface CustomModalProps<T>{
    ContentComponent: React.ComponentType<T>
    contentProps?: any,
    modalProps?:any
    openModal: boolean,
    setOpenModal: (param: boolean) => void;
    

}

const CustomModal = <T,>({ ContentComponent, contentProps, openModal, setOpenModal, modalProps }: CustomModalProps<T>) => {

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
                <ContentComponent {...contentProps} />
            </Dialog>
        </div>
    )

}

export default CustomModal;