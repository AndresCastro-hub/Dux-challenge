'use client'
import React, { Suspense, useState } from 'react';
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

    const { filters, openModalUsuario, setOpenModalUsuario, setEsEdicion, toast } = useGlobalContext();
    const { data, loadingUsuarios, errorUsuarios, refetchUsers } = useGetUsers(rowsPerPage, pageActual);
    const { deleteUser } = useDeleteUser({refetchUsers});

    const onPageChange = (event: { page: number; rows: number }) => {
        setPageActual(event.page + 1);
        setRowsPerPage(event.rows);
    };

    const dataUser = useApplyFilters(data || [] , filters);

    const handleDelete = async (rowData: Usuario) => {
        await deleteUser(rowData)
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
                        refetchUsers = {refetchUsers}
                    />

                    <Toast ref={toast}/>

                </>
            )}
        </Suspense>
    );
}

export default Table;
