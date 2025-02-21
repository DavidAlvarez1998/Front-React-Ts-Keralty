// src/components/modals/AddStudyModal.tsx
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { StudyRequest } from '../../../services/studyService';

interface AddStudyModalProps {
    open: boolean; // Controla si el modal está abierto
    close: () => void; // Función para cerrar el modal
    save: (data: StudyRequest) => void; // Acción al guardar (envía un StudyRequest)
}

const AddStudyModal = ({ open, close, save }: AddStudyModalProps) => {
    // Estados locales para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [horas, setHoras] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // Manejo de cerrar
    const handleClose = () => {
        // Limpia los campos
        setNombre('');
        setHoras('');
        setFechaInicio('');
        setFechaFin('');
        close();
    };

    // Manejo de guardar
    const handleSave = () => {
        const newStudy: StudyRequest = {
            nombre,
            horas, // Es string según tu interfaz
            fechaInicio,
            fechaFin,
        };

        save(newStudy);

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Estudio</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre del Estudio"
                    type="text"
                    fullWidth
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Horas"
                    type="text" // Es string en tu interfaz; podrías usar type="number" si prefieres
                    fullWidth
                    value={horas}
                    onChange={e => setHoras(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Fecha de Inicio"
                    type="text" // Mantén string para fechaInicio
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Fecha de Fin"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
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

export default AddStudyModal;
