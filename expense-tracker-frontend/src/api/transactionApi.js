import axiosInstance from './axiosInstance';

// filters: { page, limit, type, categoryId, startDate, endDate, minAmount, maxAmount, search }
export const getTransactions = (filters = {}) => {
    const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    return axiosInstance.get('/transactions', { params });
};

export const getTransactionById = (id) => axiosInstance.get(`/transactions/${id}`);

export const createTransaction = (data) => axiosInstance.post('/transactions', data);

export const updateTransaction = (id, data) => axiosInstance.put(`/transactions/${id}`, data);

export const deleteTransaction = (id) => axiosInstance.delete(`/transactions/${id}`);