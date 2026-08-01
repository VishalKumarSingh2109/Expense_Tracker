import axiosInstance from './axiosInstance';

export const getBudgets = () => axiosInstance.get('/budgets');

export const setBudget = (data) => axiosInstance.post('/budgets', data);

export const updateBudget = (id, data) => axiosInstance.put(`/budgets/${id}`, data);

export const deleteBudget = (id) => axiosInstance.delete(`/budgets/${id}`);

// data: { month, year } -> { budgetSet, limit, spent, remaining, percentUsed, alertLevel }
export const getBudgetStatus = (month, year) =>
    axiosInstance.get('/budgets/status', { params: { month, year } });