import { Filters, Usuario } from "../types";

export const useApplyFilters = (usuarios: Usuario[], filters: Filters): Usuario[] => {
    const { estado } = filters;
    return usuarios.filter((usuario) => {
        const matchesUsuario = filters.usuario 
            ? usuario.usuario.toLowerCase().includes(filters.usuario.toLowerCase()) 
            : true;

        // Comparar el código del estado
        const matchesEstado = estado.code ? usuario.estado === estado.code : true;

        return matchesUsuario && matchesEstado;
    });
};
