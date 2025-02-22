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

    // Al montar o cambiar "user", rellenamos los campos
    useEffect(() => {
        if (user) {
            setNombres(user.nombres);
            setApellidos(user.apellidos);
            setEmail(user.email);
            setCelular(user.celular);
            setEstado(user.estado);
        }
    }, [user]);

    // Validaciones
    const isNombresValid = nombres.length >= 3 && nombres.length <= 50;
    const isApellidosValid = apellidos.length >= 3 && apellidos.length <= 50;
    const isEmailValid = email.includes('@') && email.includes('.');
    const isCelularValid = celular.length >= 10 && celular.length <= 15;

    // Form válido si todos los obligatorios son válidos
    const isFormValid = isNombresValid && isApellidosValid && isEmailValid && isCelularValid;

    // Manejo de guardar
    const handleSave = () => {
        if (!user) return;
        if (!isFormValid) return; // Seguridad adicional

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

    // Manejo de cerrar
    const handleClose = () => {
        close();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Usuario</DialogTitle>

            <DialogContent>
                {/* Campo Nombres */}
                <TextField
                    margin="dense"
                    label="Nombres"
                    type="text"
                    fullWidth
                    value={nombres}
                    onChange={e => setNombres(e.target.value)}
                    error={!!nombres && !isNombresValid}
                    helperText={!!nombres && !isNombresValid ? 'Los nombres deben tener entre 3 y 50 caracteres' : ''}
                />

                {/* Campo Apellidos */}
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

                {/* Campo Email */}
                <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={!!email && !isEmailValid}
                    helperText={!!email && !isEmailValid ? 'Debe ser una dirección de correo válida' : ''}
                />

                {/* Campo Celular */}
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

                {/* Campo Estado (opcional) */}
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
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isFormValid} // Botón deshabilitado si el form no es válido
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
