'use client'
import React, { Suspense, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import useGetUsers from '@/app/client/hooks/useGetUsers';
import { useGlobalContext } from '@/app/client/context/store';
import CustomModal from '@/app/client/components/Modal/CustomModal';
import { Usuario } from '@/app/client/types';
import { useApplyFilters } from '@/app/client/hooks/useApplyFilters';
import UserItem from './UserItem';
import useDeleteUser from '@/app/client/hooks/useDeleteUser';
import Loader from '@/app/client/components/Loader/Loader';
import ErrorScreen from '@/app/client/components/ErrorScreen/ErrorScreen';
import { Toast } from 'primereact/toast';

const Table = () => {
    const [pageActual, setPageActual] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario>({ id: '', sector: 0, usuario: '', estado: '' }); 
    const toast = useRef<Toast>(null); 

    const { filters, openModalUsuario, setOpenModalUsuario, setEsEdicion } = useGlobalContext();
    const { deleteUser, errorDeleteUsuario } = useDeleteUser();
    const { data, loadingUsuarios, errorUsuarios, refetchUsers } = useGetUsers(rowsPerPage, pageActual);

    const onPageChange = (event: { page: number; rows: number }) => {
        setPageActual(event.page + 1);
        setRowsPerPage(event.rows);
    };

    const dataUser = data ? useApplyFilters(data, filters) : [];

    const handleDelete = async (rowData: Usuario) => {
        const result = await deleteUser(rowData.id)
        if (result) {
            toast.current!.show({ severity: 'success', summary: 'Éxito', detail: `Se eliminó correctamente el usuario ${rowData.usuario} .`, life: 1000 });
            refetchUsers()
        } else if (errorDeleteUsuario) {
            toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Fallo la petición al servidor.', life: 1000 });
        } else {
            toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Lo sentimos, vuelve a intentarlo.', life: 1000 });
        }
    };

    const deleteBodyTemplate = (rowData: Usuario) => {
        return (
            <i
                className="pi pi-times cursor-pointer text-primary"
                onClick={() => handleDelete(rowData)} 
            />
        );
    };

    return (
        <Suspense fallback={<Loader />}>
            {loadingUsuarios ? (
                <Loader />
            ) : errorUsuarios ? (
                <ErrorScreen />
            ) : (
                <>
                    <Toast ref={toast}/>
                    <div className="card mt-4">
                        <DataTable emptyMessage='No se encontraron resultados' value={dataUser} sortMode="multiple" className='w-full'>
                            <Column field="id" header="Id" sortable></Column>
                            <Column
                                field="usuario"
                                header="Usuario"
                                sortable
                                body={(rowData) => (
                                    <UserItem
                                        usuario={rowData}
                                        onClick={() => {
                                            setSelectedUsuario(rowData);
                                            setOpenModalUsuario(true);
                                            setEsEdicion(true);
                                        }}
                                    />
                                )}
                            ></Column>
                            <Column field="estado" header="Estado" sortable></Column>
                            <Column field="sector" header="Sector" sortable></Column>
                            <Column field="delete" body={deleteBodyTemplate}></Column>
                        </DataTable>
                    </div>

                    <div className="flex flex-column justify-content-end">
                        <Paginator
                            first={rowsPerPage * (pageActual - 1)}
                            rows={rowsPerPage}
                            totalRecords={150} // Explicar en readme porque esta hardcodeado
                            onPageChange={onPageChange}
                            rowsPerPageOptions={[5, 10]}
                        />
                    </div>

                    <CustomModal
                        usuario={selectedUsuario}
                        openModal={openModalUsuario}
                        modalProps={setEsEdicion}
                        setOpenModal={setOpenModalUsuario}
                    />
                </>
            )}
        </Suspense>
    );
}

export default Table;
