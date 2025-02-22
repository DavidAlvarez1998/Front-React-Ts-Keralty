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

    // Validaciones
    const isNombresValid = nombres.length >= 3 && nombres.length <= 50;
    const isApellidosValid = apellidos.length >= 3 && apellidos.length <= 50;
    const isEmailFieldValid = email.includes('@') && email.includes('.');
    const isCelularValid = celular.length >= 10 && celular.length <= 15;

    // Se requiere que todos los campos obligatorios sean válidos (estado es opcional)
    const isFormValid = isNombresValid && isApellidosValid && isEmailFieldValid && isCelularValid;

    // Manejo de guardar
    const handleSave = () => {
        if (!isFormValid) return;
        const newUser: UserRequest = {
            nombres,
            apellidos,
            email,
            celular,
            estado,
        };
        save(newUser);
        // Resetear campos
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
                    error={!!nombres && !isNombresValid}
                    helperText={!!nombres && !isNombresValid ? 'Los nombres deben tener entre 3 y 50 caracteres' : ''}
                />
                <TextField
                    margin="dense"
                    label="Apellidos"
                    type="text"
                    fullWidth
                    value={apellidos}
                    onChange={e => setApellidos(e.target.value)}
                    error={!!apellidos && !isApellidosValid}
                    helperText={
                        !!apellidos && !isApellidosValid ? 'Los apellidos deben tener entre 3 y 50 caracteres' : ''
                    }
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={!!email && !isEmailFieldValid}
                    helperText={!!email && !isEmailFieldValid ? 'Debe ser una dirección de correo válida' : ''}
                />
                <TextField
                    margin="dense"
                    label="Celular"
                    type="text"
                    fullWidth
                    value={celular}
                    onChange={e => setCelular(e.target.value)}
                    error={!!celular && !isCelularValid}
                    helperText={!!celular && !isCelularValid ? 'El celular debe tener entre 10 y 15 caracteres' : ''}
                />
                <TextField
                    margin="dense"
                    label="Estado (opcional)"
                    type="text"
                    fullWidth
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isFormValid} // Se deshabilita si el formulario no es válido
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserModal;
