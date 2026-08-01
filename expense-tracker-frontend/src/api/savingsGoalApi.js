import axiosInstance from './axiosInstance';

export const getSavingsGoals = () => axiosInstance.get('/savings-goals');

export const getSavingsGoalById = (id) => axiosInstance.get(`/savings-goals/${id}`);

export const createSavingsGoal = (data) => axiosInstance.post('/savings-goals', data);

export const updateSavingsGoal = (id, data) => axiosInstance.put(`/savings-goals/${id}`, data);

export const contributeToGoal = (id, amount) =>
    axiosInstance.post(`/savings-goals/${id}/contribute`, { amount });

export const deleteSavingsGoal = (id) => axiosInstance.delete(`/savings-goals/${id}`);