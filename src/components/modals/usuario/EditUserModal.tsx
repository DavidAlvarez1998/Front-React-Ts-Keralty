import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { UserResponse } from '../../../services/userService';

interface EditUserModalProps {
    open: boolean; // Controla si el modal está abierto
    close: () => void; // Función para cerrar el modal
    user: UserResponse | null; // El usuario a editar (o null si no hay)
    save: (updatedUser: UserResponse) => void; // Acción al guardar
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, close, user, save }) => {
    // Estados para los campos del formulario
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [estado, setEstado] = useState('');

    // Cuando cambie "user", rellenamos los campos
    useEffect(() => {
        if (user) {
            setNombres(user.nombres);
            setApellidos(user.apellidos);
            setEmail(user.email);
            setCelular(user.celular);
            setEstado(user.estado);
        }
    }, [user]);

    const handleSave = () => {
        if (!user) return;
        // Llamamos save con los nuevos datos
        save({
            ...user, // copiamos el id, etc.
            nombres,
            apellidos,
            email,
            celular,
            estado,
        });
        close();
    };

    const handleClose = () => {
        close();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Usuario</DialogTitle>

            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nombres"
                    type="text"
                    fullWidth
                    value={nombres}
                    onChange={e => setNombres(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Apellidos"
                    type="text"
                    fullWidth
                    value={apellidos}
                    onChange={e => setApellidos(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Celular"
                    type="text"
                    fullWidth
                    value={celular}
                    onChange={e => setCelular(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Estado"
                    type="text"
                    fullWidth
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
