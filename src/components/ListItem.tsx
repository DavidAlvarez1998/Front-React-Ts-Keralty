import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserResponse } from '../services/userService';
import { StudyResponse } from '../services/studyService';

interface ListItemProps {
    user?: UserResponse; // si es un usuario
    study?: StudyResponse; // si es un estudio
    tipo: 'Usuarios' | 'Estudios';
    onEdit: () => void; // Al hacer clic en editar
    onDelete: () => void; // Al hacer clic en eliminar
    onClickItem?: (itemId: number) => void; // Para el clic en el <li> (Item)
}

const ListItem = ({ user, study, tipo, onEdit, onDelete, onClickItem }: ListItemProps) => {
    const handleClick = () => {
        // Si es usuario y existe user, pasamos user.usuarioId
        if (tipo === 'Usuarios' && user && onClickItem) {
            onClickItem(user.usuarioId);
        }
        // Si es estudio y existe study, pasamos study.estudioId
        if (tipo === 'Estudios' && study && onClickItem) {
            onClickItem(study.estudioId);
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <li
            onClick={handleClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                cursor: 'pointer',
            }}
        >
            <span>
                {tipo === 'Usuarios' && user && (
                    <>
                        <b>ID:</b> {user.usuarioId} - {user.nombres} {user.apellidos}
                    </>
                )}
                {tipo === 'Estudios' && study && (
                    <>
                        <b>ID:</b> {study.estudioId} - {study.nombre} <b>Horas:</b> {study.horas}
                    </>
                )}
            </span>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <IconButton color="primary" size="small" onClick={handleEditClick}>
                    <EditIcon />
                </IconButton>
                <IconButton color="error" size="small" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </li>
    );
};

export default ListItem;
