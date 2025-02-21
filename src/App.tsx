import { useState } from 'react';
import ButtonWithList from './components/ButtonWithList';
import { UserResponse, getAllUsers } from './services/userService';
import { StudyResponse, getAllStudies, getStudiesByUserId } from './services/studyService';

const App = () => {
    // Estados para usuarios
    const [usuarios, setUsuarios] = useState<UserResponse[]>([]);
    const [usuariosAbiertos, setUsuariosAbiertos] = useState(false);
    const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
    const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null);

    // Estados para estudios
    const [estudios, setEstudios] = useState<StudyResponse[]>([]);
    const [estudiosAbiertos, setEstudiosAbiertos] = useState(false);
    const [cargandoEstudios, setCargandoEstudios] = useState(false);
    const [errorEstudios, setErrorEstudios] = useState<string | null>(null);

    // Estado para el usuario seleccionado al hacer clic
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);

    // Alternar la lista de usuarios (cargar si está vacía)
    const alternarUsuarios = async () => {
        setUsuariosAbiertos(prev => !prev);
        if (!usuariosAbiertos && usuarios.length === 0) {
            setCargandoUsuarios(true);
            setErrorUsuarios(null);
            try {
                const usuariosAPI = await getAllUsers();
                setUsuarios(usuariosAPI);
            } catch (e) {
                setErrorUsuarios('Error al cargar usuarios: ' + e);
            } finally {
                setCargandoUsuarios(false);
            }
        }
    };

    // Alternar la lista de estudios (cargar si está vacía)
    const alternarEstudios = async () => {
        setEstudiosAbiertos(prev => !prev);
        if (!estudiosAbiertos && estudios.length === 0) {
            setCargandoEstudios(true);
            setErrorEstudios(null);
            try {
                const estudiosAPI = await getAllStudies();
                setEstudios(estudiosAPI);
            } catch (e) {
                setErrorEstudios('Error al cargar estudios: ' + e);
            } finally {
                setCargandoEstudios(false);
            }
        }
    };

    // Manejar la selección/deselección de un usuario y filtrar sus estudios
    const manejarClicUsuario = async (userId: number) => {
        const nuevoSeleccionado = usuarioSeleccionado === userId ? null : userId;
        setUsuarioSeleccionado(nuevoSeleccionado);
        setCargandoEstudios(true);
        setErrorEstudios(null);
        try {
            if (nuevoSeleccionado === null) {
                const estudiosAPI = await getAllStudies();
                setEstudios(estudiosAPI);
            } else {
                const estudiosAPI = await getStudiesByUserId(nuevoSeleccionado);
                setEstudios(estudiosAPI);
            }
        } catch (e) {
            setErrorEstudios('Error al cargar estudios: ' + e);
        } finally {
            setCargandoEstudios(false);
        }
    };

    // Agregar nuevo usuario al estado
    const handleAddNewUser = (newUser: UserResponse) => {
        setUsuarios(prev => [...prev, newUser]);
    };

    // Agregar nuevo estudio al estado
    const handleAddNewStudy = (newStudy: StudyResponse) => {
        setEstudios(prev => [...prev, newStudy]);
    };

    // Eliminar un usuario del estado local
    const handleUserDeleted = (deletedId: number | null) => {
        setUsuarios(prev => prev.filter(u => u.usuarioId !== deletedId));
    };

    // Eliminar un estudio del estado local
    const handleStudyDeleted = (deletedId: number | null) => {
        setEstudios(prev => prev.filter(e => e.estudioId !== deletedId));
    };

    // Título principal (usuarios / estudios)
    let tituloPrincipal = 'Usuarios / Estudios';
    if (usuarioSeleccionado) {
        const usuarioActual = usuarios.find(u => u.usuarioId === usuarioSeleccionado);
        if (usuarioActual) {
            tituloPrincipal = `Usuario: ${usuarioActual.nombres} ${usuarioActual.apellidos} - Estudios: ${estudios.length}`;
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                padding: '2rem',
            }}
        >
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{tituloPrincipal}</h1>

            <div style={{ display: 'flex', gap: '4rem' }}>
                {/* Botón + Lista de Usuarios */}
                <ButtonWithList
                    titulo="Usuarios"
                    usuarios={usuarios}
                    estaAbierto={usuariosAbiertos}
                    cargando={cargandoUsuarios}
                    error={errorUsuarios}
                    alAlternar={alternarUsuarios}
                    colorBoton="#3B82F6"
                    colorHover="#2563EB"
                    clicElemento={manejarClicUsuario}
                    newUserCreated={handleAddNewUser}
                    handleUserDeleted={handleUserDeleted}
                />

                {/* Botón + Lista de Estudios */}
                <ButtonWithList
                    titulo="Estudios"
                    estudios={estudios}
                    estaAbierto={estudiosAbiertos}
                    cargando={cargandoEstudios}
                    error={errorEstudios}
                    alAlternar={alternarEstudios}
                    colorBoton="#8B5CF6"
                    colorHover="#7C3AED"
                    newStudyCreated={handleAddNewStudy}
                    handleStudyDeleted={handleStudyDeleted}
                />
            </div>
        </div>
    );
};

export default App;
