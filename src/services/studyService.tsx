import api from './api';

export interface StudyResponse {
    estudioId: number;
    nombre: string;
    horas: string;
    fechaInicio: string;
    fechaFin: string;
}

export interface StudyRequest {
    nombre: string;
    horas: string;
    fechaInicio: string;
    fechaFin: string;
}

// Obtener todos los estudios
export const getAllStudies = async (): Promise<StudyResponse[]> => {
    const response = await api.get('/estudio');
    return response.data;
};

// Obtener un estudio por ID
export const getStudyById = async (id: number): Promise<StudyResponse> => {
    const response = await api.get(`/estudio/${id}`);
    return response.data;
};

// Crear un nuevo estudio
export const createStudy = async (studyData: Omit<StudyRequest, 'id'>): Promise<StudyResponse> => {
    const response = await api.post('/estudio', studyData);
    return response.data;
};

// Actualizar un estudio existente
export const updateStudy = async (id: number, studyData: Partial<StudyResponse>): Promise<StudyRequest> => {
    const response = await api.put(`/estudio/${id}`, studyData);
    return response.data;
};

// Eliminar un estudio
export const deleteStudy = async (id: number): Promise<void> => {
    await api.delete(`/estudio/${id}`);
};

//Consultar Estudios PorUsuario
export const getStudiesByUserId = async (id: number): Promise<StudyResponse[]> => {
    const response = await api.get(`/usuario/estudios/${id}`);
    return response.data;
};
