export interface Usuario{
    usuario: string,
    estado: string,
    sector: number,
    id: string
}

export interface Filters {
    usuario: string;
    estado: {name: string, code: 'ACTIVO' | 'INACTIVO' | '' }
    sector: {name: string, code : number}
} 