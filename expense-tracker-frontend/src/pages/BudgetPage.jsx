import { useState, useEffect, useCallback } from 'react';
import { getBudgetStatus, setBudget } from '../api/budgetApi';
import MonthYearSelector from '../components/common/MonthYearSelector';
import BudgetProgressBar from '../components/budget/BudgetProgressBar';
import BudgetForm from '../components/budget/BudgetForm';
import Loader from '../components/common/Loader';

const now = new Date();

export default function BudgetPage() {
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const fetchStatus = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getBudgetStatus(month, year);
            setStatus(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load budget status.');
        } finally {
            setLoading(false);
        }
    }, [month, year]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    function handleMonthYearChange({ month: newMonth, year: newYear }) {
        setMonth(newMonth);
        setYear(newYear);
        setSuccessMsg('');
    }

    async function handleSetBudget(data) {
        setSubmitting(true);
        setError('');
        setSuccessMsg('');
        try {
            await setBudget(data);
            setSuccessMsg('Budget saved successfully.');
            fetchStatus();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save budget.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Budget</h1>
                <MonthYearSelector month={month} year={year} onChange={handleMonthYearChange} />
            </div>

            {error && <div className="form-error">{error}</div>}
            {successMsg && <div className="form-success">{successMsg}</div>}

            {loading ? (
                <Loader text="Loading budget..." />
            ) : (
                <div className="budget-layout">
                    <div className="card">
                        <h2 className="card-title">Status</h2>
                        {status.budgetSet ? (
                            <BudgetProgressBar
                                limit={status.limit}
                                spent={status.spent}
                                percentUsed={status.percentUsed}
                                alertLevel={status.alertLevel}
                            />
                        ) : (
                            <p className="text-muted">
                                No budget set for this month yet. You've spent{' '}
                                {status.spent ? `₹${status.spent}` : '₹0'} so far — set a limit below to start tracking.
                            </p>
                        )}
                    </div>

                    <div className="card">
                        <h2 className="card-title">{status.budgetSet ? 'Update Budget' : 'Set Budget'}</h2>
                        <BudgetForm
                            month={month}
                            year={year}
                            currentLimit={status.limit}
                            onSubmit={handleSetBudget}
                            submitting={submitting}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}