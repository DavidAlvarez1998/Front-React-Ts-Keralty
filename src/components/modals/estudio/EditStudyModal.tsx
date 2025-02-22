// src/components/modals/EditStudyModal.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { StudyResponse } from '../../../services/studyService';

interface EditStudyModalProps {
    open: boolean; // Controla si el modal está visible
    close: () => void; // Función para cerrar el modal
    study: StudyResponse | null; // Estudio a editar (null si no hay)
    save: (updatedStudy: StudyResponse) => void; // Acción al guardar
}

const EditStudyModal = ({ open, close, study, save }: EditStudyModalProps) => {
    // Estados locales para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [horas, setHoras] = useState(''); // string; si el usuario ingresa algo, validamos
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // Al montar o cambiar `study`, rellenamos los campos
    useEffect(() => {
        if (study) {
            setNombre(study.nombre);
            setHoras(study.horas ? String(study.horas) : '');
            setFechaInicio(study.fechaInicio);
            setFechaFin(study.fechaFin);
        }
    }, [study]);

    // Validaciones
    const isNombreValid = nombre.length >= 2 && nombre.length <= 50;

    let isHorasValid = true;
    if (horas.trim() !== '') {
        const parsed = parseInt(horas.trim(), 10);
        if (isNaN(parsed) || parsed.toString() !== horas.trim()) {
            isHorasValid = false;
        }
    }

    const isFormValid = isNombreValid && isHorasValid;

    // Maneja el guardado
    const handleSave = () => {
        if (!study) return;
        if (!isFormValid) return; // Por seguridad

        save({
            ...study,
            nombre,
            horas, // si el usuario dejó horas vacío, será ''
            fechaInicio, // opcional
            fechaFin, // opcional
        });

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
                {/* Campo Nombre (requerido) */}
                <TextField
                    margin="dense"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    error={!!nombre && !isNombreValid}
                    helperText={!!nombre && !isNombreValid ? 'El nombre debe tener entre 2 y 50 caracteres' : ''}
                />

                {/* Campo Horas (opcional) */}
                <TextField
                    margin="dense"
                    label="Horas (opcional)"
                    type="text"
                    fullWidth
                    value={horas}
                    onChange={e => setHoras(e.target.value)}
                    error={!!horas && !isHorasValid}
                    helperText={!!horas && !isHorasValid ? 'Debe ser un número entero válido' : ''}
                />

                {/* Campo fechaInicio (opcional) */}
                <TextField
                    margin="dense"
                    label="Fecha de Inicio (opcional)"
                    type="text"
                    placeholder="YYYY-MM-DDTHH:mm:ss"
                    fullWidth
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                />

                {/* Campo fechaFin (opcional) */}
                <TextField
                    margin="dense"
                    label="Fecha de Fin (opcional)"
                    type="text"
                    placeholder="YYYY-MM-DDTHH:mm:ss"
                    fullWidth
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isFormValid} // Deshabilita si no es válido
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStudyModal;
