import axios from 'axios';
import { Task } from '../models/Task';

const API_BASE_URL = 'http://localhost:3001/api';

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, task);
    return response.data;
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
};