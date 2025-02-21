import { Button, IconButton, Snackbar, Alert, AlertColor } from '@mui/material';
import ListItem from './ListItem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddUserModal from './modals/usuario/AddUserModal';
import AddStudyModal from './modals/estudio/AddStudyModal';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import { useState } from 'react';
import { createUser, deleteUser, updateUser, UserRequest, UserResponse } from '../services/userService';
import { createStudy, deleteStudy, updateStudy, StudyRequest, StudyResponse } from '../services/studyService';
import EditUserModal from './modals/usuario/EditUserModal';
import EditStudyModal from './modals/estudio/EditStudyModal';

interface ButtonWithListProps {
    titulo: 'Usuarios' | 'Estudios';
    usuarios?: UserResponse[]; // Lista de usuarios (si titulo === 'Usuarios')
    estudios?: StudyResponse[]; // Lista de estudios (si titulo === 'Estudios')
    estaAbierto: boolean;
    cargando: boolean;
    error: string | null;
    alAlternar: () => void;
    colorBoton: string;
    colorHover: string;
    clicElemento?: (itemId: number) => void;
    newUserCreated?: (newUser: UserResponse) => void;
    newStudyCreated?: (newStudy: StudyResponse) => void;
    handleUserDeleted?: (userId: number | null) => void;
    handleStudyDeleted?: (study: number | null) => void;
}

const ButtonWithList = ({
    titulo,
    usuarios,
    estudios,
    estaAbierto,
    cargando,
    error,
    alAlternar,
    colorBoton,
    colorHover,
    clicElemento,
    newUserCreated,
    newStudyCreated,
    handleUserDeleted,
    handleStudyDeleted,
}: ButtonWithListProps) => {
    // Modales para agregar
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openAddStudyModal, setOpenAddStudyModal] = useState(false);

    // Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    // Modal de confirmación de borrado
    const [openDeleteModal, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [deleteItemType, setDeleteItemType] = useState<'Usuarios' | 'Estudios' | null>(null);
    const [deleteItemName, setDeleteItemName] = useState<string | null>(null);

    // Modal de editar usuario
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<UserResponse | null>(null);

    // Modal de editar estudio
    const [openEditStudyModal, setOpenEditStudyModal] = useState(false);
    const [studyToEdit, setStudyToEdit] = useState<StudyResponse | null>(null);

    // Abrir/cerrar modal de agregar usuario
    const handleOpenAddUserModal = () => setOpenAddUserModal(true);
    const handleCloseAddUserModal = () => setOpenAddUserModal(false);

    // Abrir/cerrar modal de agregar estudio
    const handleOpenAddStudyModal = () => setOpenAddStudyModal(true);
    const handleCloseAddStudyModal = () => setOpenAddStudyModal(false);

    // Cerrar snackbar
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    // Guardar usuario (crear)
    const handleSaveUser = async (data: UserRequest) => {
        try {
            const newUser = await createUser(data);
            newUserCreated?.(newUser);
            setSnackbarMessage(`Usuario ${newUser.nombres} creado con éxito`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (e) {
            console.error('Error guardando usuario:', e);
            setSnackbarMessage('Error al crear usuario: ' + e);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Guardar estudio (crear)
    const handleSaveStudy = async (data: StudyRequest) => {
        try {
            const newStudy = await createStudy(data);
            newStudyCreated?.(newStudy);
            setSnackbarMessage(`Estudio ${newStudy.nombre} creado con éxito`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (e) {
            console.error('Error guardando estudio:', e);
            setSnackbarMessage('Error al crear estudio: ' + e);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Abrir modal de confirmación de borrado
    const handleOpenDeleteModal = (itemId: number, tipo: 'Usuarios' | 'Estudios', itemName: string) => {
        setDeleteItemId(itemId);
        setDeleteItemType(tipo);
        setDeleteItemName(itemName);
        setDeleteModalOpen(true);
    };

    // Cerrar modal de borrado
    const handleCloseDeleteModal = () => setDeleteModalOpen(false);

    // Confirmar borrado
    const handleConfirmDelete = async (itemId: number, tipo: 'Usuarios' | 'Estudios') => {
        if (tipo === 'Usuarios') {
            try {
                await deleteUser(itemId);
                handleUserDeleted?.(itemId);
                setSnackbarMessage(`Usuario con id: ${itemId} eliminado con éxito`);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            } catch (e) {
                console.error('Error Delete Usuario:', e);
                setSnackbarMessage(`Error al eliminar Usuario: ${e}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } else {
            try {
                await deleteStudy(itemId);
                handleStudyDeleted?.(itemId);
                setSnackbarMessage(`Estudio con id: ${itemId} eliminado con éxito`);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            } catch (e) {
                console.error('Error Delete Estudio:', e);
                setSnackbarMessage(`Error al eliminar Estudio: ${e}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    // Abrir modal de ed itar usuario
    const handleOpenEditUserModal = (user: UserResponse) => {
        setUserToEdit(user);
        setOpenEditUserModal(true);
    };

    const handleCloseEditUserModal = () => setOpenEditUserModal(false);

    // Guardar cambios de usuario (update)
    const handleSaveEditUser = async (updatedUser: UserResponse) => {
        try {
            await updateUser(updatedUser.usuarioId, updatedUser);
            setSnackbarMessage(`Usuario con id: ${updatedUser.usuarioId} actualizado con éxito`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (e) {
            console.error('Error actualizando usuario:', e);
            setSnackbarMessage(`Error al actualizar Usuario: ${e}`);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setOpenEditUserModal(false);
        }
    };

    // Abrir modal de editar estudio
    const handleOpenEditStudyModal = (study: StudyResponse) => {
        setStudyToEdit(study);
        setOpenEditStudyModal(true);
    };
    const handleCloseEditStudyModal = () => setOpenEditStudyModal(false);

    // Guardar cambios de estudio (update)
    const handleSaveEditStudy = async (updatedStudy: StudyResponse) => {
        try {
            await updateStudy(updatedStudy.estudioId, updatedStudy);
            setSnackbarMessage(`Estudio con id: ${updatedStudy.estudioId} actualizado con éxito`);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (e) {
            console.error('Error actualizando estudio:', e);
            setSnackbarMessage(`Error al actualizar Estudio: ${e}`);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setOpenEditStudyModal(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            {/* Botón principal para alternar la lista */}
            <Button
                variant="contained"
                onClick={alAlternar}
                sx={{
                    backgroundColor: colorBoton,
                    ':hover': { backgroundColor: colorHover },
                }}
            >
                {titulo}
            </Button>

            {estaAbierto && (
                <>
                    {cargando ? (
                        <div>Cargando datos...</div>
                    ) : error ? (
                        <div style={{ color: 'red' }}>Error: {error}</div>
                    ) : (
                        <>
                            {/* Botón para agregar (usuario o estudio) */}
                            {titulo === 'Usuarios' && (
                                <IconButton color="primary" size="small" onClick={handleOpenAddUserModal}>
                                    <PersonAddIcon />
                                </IconButton>
                            )}
                            {titulo === 'Estudios' && (
                                <IconButton color="secondary" size="small" onClick={handleOpenAddStudyModal}>
                                    <AddBoxIcon />
                                </IconButton>
                            )}

                            {/* Lista de usuarios o estudios */}
                            {titulo === 'Usuarios' && usuarios && usuarios.length > 0 && (
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        margin: 0,
                                        padding: '1rem',
                                        backgroundColor: '#f9fafb',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        width: '100%',
                                        maxWidth: '300px',
                                    }}
                                >
                                    {usuarios.map(user => (
                                        <ListItem
                                            key={user.usuarioId}
                                            user={user}
                                            tipo="Usuarios"
                                            onEdit={() => handleOpenEditUserModal(user)}
                                            onDelete={() =>
                                                handleOpenDeleteModal(user.usuarioId, 'Usuarios', user.nombres)
                                            }
                                            onClickItem={clicElemento}
                                        />
                                    ))}
                                </ul>
                            )}

                            {titulo === 'Estudios' && estudios && estudios.length > 0 && (
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        margin: 0,
                                        padding: '1rem',
                                        backgroundColor: '#f9fafb',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        width: '100%',
                                        maxWidth: '300px',
                                    }}
                                >
                                    {estudios.map(study => (
                                        <ListItem
                                            key={study.estudioId}
                                            study={study}
                                            tipo="Estudios"
                                            onEdit={() => handleOpenEditStudyModal(study)}
                                            onDelete={() =>
                                                handleOpenDeleteModal(study.estudioId, 'Estudios', study.nombre)
                                            }
                                            onClickItem={clicElemento}
                                        />
                                    ))}
                                </ul>
                            )}

                            {/* Modal de agregar usuario */}
                            <AddUserModal
                                open={openAddUserModal}
                                close={handleCloseAddUserModal}
                                save={handleSaveUser}
                            />

                            {/* Modal de agregar estudio */}
                            <AddStudyModal
                                open={openAddStudyModal}
                                close={handleCloseAddStudyModal}
                                save={handleSaveStudy}
                            />

                            {/* Modal de confirmación de borrado */}
                            <ConfirmDeleteModal
                                open={openDeleteModal}
                                close={handleCloseDeleteModal}
                                confirm={handleConfirmDelete}
                                itemId={deleteItemId}
                                itemType={deleteItemType}
                                itemName={deleteItemName}
                            />

                            {/* Modal de editar usuario */}
                            <EditUserModal
                                open={openEditUserModal}
                                close={handleCloseEditUserModal}
                                user={userToEdit}
                                save={handleSaveEditUser}
                            />

                            {/* Modal de editar estudio */}
                            <EditStudyModal
                                open={openEditStudyModal}
                                close={handleCloseEditStudyModal}
                                study={studyToEdit}
                                save={handleSaveEditStudy}
                            />
                        </>
                    )}
                </>
            )}

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ButtonWithList;
