import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmDeleteModalProps {
    open: boolean;
    close: () => void;
    confirm: (itemId: number, tipo: 'Usuarios' | 'Estudios') => void;
    itemId: number | null;
    itemType: 'Usuarios' | 'Estudios' | null;
    itemName?: string | null;
}

const ConfirmDeleteModal = ({ open, close, confirm, itemId, itemType, itemName }: ConfirmDeleteModalProps) => {
    const handleConfirm = () => {
        if (itemId !== null && itemType !== null) {
            confirm(itemId, itemType);
            close();
        } else {
            console.error(
                'No se puede eliminar: faltan datos ',
                'ID_Item: ',
                `${itemName}`,
                'tipo(usuario/estudio): ',
                ` ${itemType}`
            );
        }
    };
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
                <p>
                    ¿Deseas eliminar
                    {itemType === 'Usuarios' ? ' el usuario' : ' el estudio'}
                    {itemName ? ` "${itemName}"` : ''}
                    con ID: {itemId}?
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancelar</Button>
                <Button variant="contained" color="error" onClick={handleConfirm}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteModal;
