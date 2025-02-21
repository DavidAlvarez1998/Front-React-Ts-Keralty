import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { StudyResponse } from '../../../services/studyService';

// Props del modal
interface EditStudyModalProps {
    open: boolean; // Controla si el modal está visible
    close: () => void; // Función para cerrar el modal
    study: StudyResponse | null; // Estudio a editar (null si no hay)
    save: (updatedStudy: StudyResponse) => void; // Acción al guardar
}

const EditStudyModal: React.FC<EditStudyModalProps> = ({ open, close, study, save }) => {
    // Estados locales para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [horas, setHoras] = useState<string>('0');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // Al montar o cambiar `study`, rellenamos los campos
    useEffect(() => {
        if (study) {
            setNombre(study.nombre);
            setHoras(study.horas);
            setFechaInicio(study.fechaInicio);
            setFechaFin(study.fechaFin);
        }
    }, [study]);

    // Maneja el guardado
    const handleSave = () => {
        if (!study) return;
        // Llamamos a la prop onSave con el objeto actualizado
        save({
            ...study,
            nombre,
            horas,
            fechaInicio,
            fechaFin,
        });
        // Cerramos el modal tras guardar
        close();
    };

    // Maneja el cierre sin guardar
    const handleClose = () => {
        close();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Estudio</DialogTitle>

            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Horas"
                    type="number"
                    fullWidth
                    value={horas}
                    onChange={e => setHoras(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Fecha de Inicio"
                    type="text"
                    fullWidth
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Fecha de Fin"
                    type="text"
                    fullWidth
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
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

export default EditStudyModal;
