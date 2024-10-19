'use client'
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import useGetUsers from '@/app/client/hooks/useGetUsers';
import { useGlobalContext } from '@/app/client/context/store';
import CustomModal from '@/app/client/components/Modal/CustomModal';
import { Usuario } from '@/app/client/types';
import { useApplyFilters } from '@/app/client/hooks/useApplyFilters';
import UserItem from './UserItem';
import { Menu } from 'primereact/menu';
import useDeleteUser from '@/app/client/hooks/useDeleteUser';

const Table = () => {
    const [pageActual, setPageActual] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario>({id: '', sector: 0, usuario:'', estado:''});

    const { filters, openModalUsuario, setOpenModalUsuario, setEsEdicion } = useGlobalContext();
    const {deleteUser} = useDeleteUser();
    const { data } = useGetUsers(`https://staging.duxsoftware.com.ar/api/personal?sector=1000&_limit=${rowsPerPage}&_page=${pageActual}`);

    const onPageChange = (event: { page: number; rows: number }) => {
        setPageActual(event.page + 1);
        setRowsPerPage(event.rows);
    };

    const dataUser = data ? useApplyFilters(data, filters) : [];

    const handleDelete = async (rowData: Usuario) => {
        const result = await deleteUser(rowData.id)
    };

    const deleteBodyTemplate = (rowData: Usuario) => {
        return (
            <i
                className="pi pi-times cursor-pointer text-primary"
                onClick={() => handleDelete(rowData)} // Ejecutar la eliminación cuando se hace clic
            />
        );
    };

    return (
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
                                    setEsEdicion(true)
                                }}
                            />
                        )}
                    ></Column>
                    <Column field="estado" header="Estado" sortable></Column>
                    <Column field="sector" header="Sector" sortable></Column>
                    <Column  field="delete" body={deleteBodyTemplate}></Column>
                </DataTable>
            </div>

            <div className="flex flex-column justify-content-end">
                <Paginator
                    first={rowsPerPage * (pageActual - 1)}
                    rows={rowsPerPage}
                    totalRecords={100} //Explicar en readme porque esta harcodeado
                    onPageChange={onPageChange}
                    rowsPerPageOptions={[5, 10]}
                />
            </div>

            <CustomModal
                usuario = {selectedUsuario}
                openModal={openModalUsuario}
                modalProps={setEsEdicion}
                setOpenModal={setOpenModalUsuario}
            />
        </>
    );
}
export default Table;