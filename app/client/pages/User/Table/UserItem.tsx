import { Usuario } from '@/app/client/types';
import React from 'react';

interface UsuarioItemProps {
    usuario: Usuario;
    onClick: () => void;
}

const UserItem: React.FC<UsuarioItemProps> = ({ usuario, onClick }) => {
    return (
        <span className="text-primary cursor-pointer font-bold underline" onClick={onClick}>
            {usuario.usuario}
        </span>
    );
};

export default UserItem;
