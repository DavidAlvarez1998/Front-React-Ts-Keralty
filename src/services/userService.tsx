import api from './api';

export interface UserResponse {
    usuarioId: number;
    nombres: string;
    apellidos: string;
    email: string;
    celular: string;
    estado: string;
}

export interface UserRequest {
    nombres: string;
    apellidos: string;
    email: string;
    celular: string;
    estado?: string;
}

// Función para obtener todos los usuarios
export const getAllUsers = async (): Promise<UserResponse[]> => {
    const response = await api.get('/usuario');
    return response.data;
};

// Obtener un usuario por ID
export const getUserById = async (id: number): Promise<UserResponse> => {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
};

// Crear un nuevo usuario
export const createUser = async (userData: Omit<UserRequest, 'id'>): Promise<UserResponse> => {
    const response = await api.post('/usuario', userData);
    return response.data;
};

// Actualizar un usuario existente
export const updateUser = async (id: number, userData: Partial<UserRequest>): Promise<UserResponse> => {
    const response = await api.put(`/usuario/${id}`, userData);
    return response.data;
};

// Eliminar un usuario
export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/usuario/${id}`);
};
