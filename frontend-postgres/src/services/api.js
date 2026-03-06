// src/services/api.js
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/employees';
export const getEmployees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los empleados:', error);
        throw error;
    }
};
export const getEmployee = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};
export const createEmployee = async (employee) => {
    try {
        const response = await axios.post(API_URL, employee);
        return response.data;
    } catch (error) {
        console.error('Error al crear el empleado:', error);
        throw error;
    }
};
export const updateEmployee = async (id, employee) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employee);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        throw error;
    }
};
export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        throw error;
    }
};