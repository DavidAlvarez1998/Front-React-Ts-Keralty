import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { UserRequest } from '../../../services/userService';

interface AddUserModalProps {
    open: boolean;
    close: () => void;
    save: (data: UserRequest) => void;
}

const AddUserModal = ({ open, close, save }: AddUserModalProps) => {
    // Estados locales para los campos del formulario
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [estado, setEstado] = useState('');

    // Manejo de guardar
    const handleSave = () => {
        const newUser: UserRequest = {
            nombres,
            apellidos,
            email,
            celular,
            estado,
        };
        save(newUser);

        setNombres('');
        setApellidos('');
        setEmail('');
        setCelular('');
        setEstado('');
        close();
    };

    // Manejo de cerrar
    const handleClose = () => {
        setNombres('');
        setApellidos('');
        setEmail('');
        setCelular('');
        setEstado('');
        close();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Usuario</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
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
                <Button onClick={handleClose}>Cerrar</Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserModal;
