
'use client'
import React from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import './filters.css'
import { useGlobalContext } from "@/app/client/context/store";
import { estados, sector } from "@/app/client/constants/dataConstants";

const Filters =  () => {

    const { filters, setFilters } = useGlobalContext()

    return (
        <div className="flex gap-2 ">

            <IconField className="w-4" iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText className='w-full' value={filters.usuario} onChange={(e) => setFilters({ ...filters, usuario: e.target.value })} placeholder="Buscar" />
            </IconField>

            <Dropdown
                options={sector}
                optionLabel="name"
                placeholder="Seleccionar el sector"
                className="w-4"
            />

            <Dropdown
                value={filters.estado}
                options={estados}
                onChange={(e) => setFilters({ ...filters, estado: e.value })}
                optionLabel="name"
                placeholder="Seleccionar el estado"
                className="w-4"
            />

            <Button className='button-filter' icon="pi pi-filter" />
            <Button className='button-filter' icon="pi pi-sliders-v" />


        </div>
    )
}
export default Filters;
