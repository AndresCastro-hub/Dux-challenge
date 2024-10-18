'use client'
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import useGetUsers from '@/app/client/hooks/useGetUsers';
import { useGlobalContext } from '@/app/client/context/store';
import CustomModal from '@/app/client/components/Modal/CustomModal';
import AddUser from '../FormUser/AddUser';
import { Usuario } from '@/app/client/types';
import { useApplyFilters } from '@/app/client/hooks/useApplyFilters';
import UserItem from './UserItem';

const Table = () => {
    const [pageActual, setPageActual] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario>();

    const { filters, openModalUsuario, setOpenModalUsuario, setEsEdicion, esEdicion } = useGlobalContext();
    const { data, loading } = useGetUsers(`https://staging.duxsoftware.com.ar/api/personal?sector=1000&_limit=${rowsPerPage}&_page=${pageActual}`);

    const onPageChange = (event: { page: number; rows: number }) => {
        setPageActual(event.page + 1);
        setRowsPerPage(event.rows);
    };

    const dataUser = data ? useApplyFilters(data, filters) : [];

    return (
        <>
            <div className="card mt-4">
                <DataTable emptyMessage='No se encontraron resultados' value={dataUser} sortMode="multiple" tableStyle={{ width: '100%', tableLayout: 'fixed' }}>
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

            <CustomModal<Usuario>
                modalProps={setEsEdicion}
                ContentComponent={AddUser}
                contentProps={{ usuario: selectedUsuario }}
                openModal={openModalUsuario}
                setOpenModal={setOpenModalUsuario}
            />
        </>
    );
}
export default Table;