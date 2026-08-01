import axiosInstance from './axiosInstance';

export const getMonthlySummary = (month, year) =>
    axiosInstance.get('/reports/summary', { params: { month, year } });

export const getCategoryBreakdown = (month, year, type) =>
    axiosInstance.get('/reports/category-breakdown', { params: { month, year, type } });

export const getMonthlyTrend = (months) =>
    axiosInstance.get('/reports/trend', { params: { months } });