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
    const [horas, setHoras] = useState(''); // string, luego parseamos si no está vacío
    const [fechaInicio, setFechaInicio] = useState(''); // opcional
    const [fechaFin, setFechaFin] = useState(''); // opcional

    // Limpieza de campos
    const resetFields = () => {
        setNombre('');
        setHoras('');
        setFechaInicio('');
        setFechaFin('');
    };

    // Validaciones

    const isNombreValid = nombre.length >= 2 && nombre.length <= 50;

    let isHorasValid = true; // por defecto, si está vacío es válido
    if (horas.trim() !== '') {
        const parsed = parseInt(horas, 10);
        if (isNaN(parsed) || parsed.toString() !== horas.trim()) {
            isHorasValid = false;
        }
    }
    const isFormValid = isNombreValid && isHorasValid;

    // Manejo de cerrar
    const handleClose = () => {
        resetFields();
        close();
    };

    // Manejo de guardar
    const handleSave = () => {
        if (!isFormValid) return;

        let finalHoras: string | null = null;
        if (horas.trim() !== '') {
            finalHoras = horas.trim();
        }

        const newStudy: StudyRequest = {
            nombre,
            horas: finalHoras || '',
            fechaInicio, // Opcional
            fechaFin, // Opcional
        };

        save(newStudy);
        resetFields();
        close();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Estudio</DialogTitle>

            <DialogContent>
                {/* Campo Nombre (requerido) */}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre del Estudio"
                    type="text"
                    fullWidth
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    error={!!nombre && !isNombreValid}
                    helperText={!!nombre && !isNombreValid ? 'El nombre debe tener entre 2 y 50 caracteres' : ''}
                />

                {/* Campo Horas (opcional, pero si no está vacío, debe ser un entero) */}
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
                <Button onClick={handleClose}>Cerrar</Button>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={!isFormValid}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStudyModal;
