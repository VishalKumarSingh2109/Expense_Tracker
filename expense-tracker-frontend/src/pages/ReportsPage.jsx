import { useState, useEffect, useCallback } from 'react';
import { getMonthlySummary, getCategoryBreakdown, getMonthlyTrend } from '../api/reportApi';
import MonthYearSelector from '../components/common/MonthYearSelector';
import ReportSummary from '../components/reports/ReportSummary';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyTrendChart from '../components/charts/MonthlyTrendChart';
import Loader from '../components/common/Loader';

const now = new Date();

export default function ReportsPage() {
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [breakdownType, setBreakdownType] = useState('expense');
    const [trendMonths, setTrendMonths] = useState(6);

    const [summary, setSummary] = useState(null);
    const [breakdown, setBreakdown] = useState([]);
    const [trend, setTrend] = useState([]);

    const [loadingSummary, setLoadingSummary] = useState(true);
    const [loadingBreakdown, setLoadingBreakdown] = useState(true);
    const [loadingTrend, setLoadingTrend] = useState(true);
    const [error, setError] = useState('');

    const fetchSummary = useCallback(async () => {
        setLoadingSummary(true);
        try {
            const res = await getMonthlySummary(month, year);
            setSummary(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load summary.');
        } finally {
            setLoadingSummary(false);
        }
    }, [month, year]);

    const fetchBreakdown = useCallback(async () => {
        setLoadingBreakdown(true);
        try {
            const res = await getCategoryBreakdown(month, year, breakdownType);
            setBreakdown(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load category breakdown.');
        } finally {
            setLoadingBreakdown(false);
        }
    }, [month, year, breakdownType]);

    const fetchTrend = useCallback(async () => {
        setLoadingTrend(true);
        try {
            const res = await getMonthlyTrend(trendMonths);
            setTrend(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load trend data.');
        } finally {
            setLoadingTrend(false);
        }
    }, [trendMonths]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    useEffect(() => {
        fetchBreakdown();
    }, [fetchBreakdown]);

    useEffect(() => {
        fetchTrend();
    }, [fetchTrend]);

    function handleMonthYearChange({ month: newMonth, year: newYear }) {
        setMonth(newMonth);
        setYear(newYear);
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Reports</h1>
                <MonthYearSelector month={month} year={year} onChange={handleMonthYearChange} />
            </div>

            {error && <div className="form-error">{error}</div>}

            {/* ===== Monthly Summary ===== */}
            {loadingSummary ? <Loader text="Loading summary..." /> : summary && <ReportSummary summary={summary} />}

            {/* ===== Category Breakdown ===== */}
            <div className="card" style={{ marginTop: 20 }}>
                <div className="report-section-header">
                    <h2 className="card-title">Category Breakdown</h2>
                    <div className="type-toggle report-type-toggle">
                        <button
                            className={breakdownType === 'expense' ? 'active expense' : ''}
                            onClick={() => setBreakdownType('expense')}
                        >
                            Expense
                        </button>
                        <button
                            className={breakdownType === 'income' ? 'active income' : ''}
                            onClick={() => setBreakdownType('income')}
                        >
                            Income
                        </button>
                    </div>
                </div>
                {loadingBreakdown ? <Loader text="Loading breakdown..." /> : <CategoryPieChart data={breakdown} />}
            </div>

            {/* ===== Monthly Trend ===== */}
            <div className="card" style={{ marginTop: 20 }}>
                <div className="report-section-header">
                    <h2 className="card-title">Income vs Expense Trend</h2>
                    <select value={trendMonths} onChange={(e) => setTrendMonths(parseInt(e.target.value))}>
                        <option value={3}>Last 3 months</option>
                        <option value={6}>Last 6 months</option>
                        <option value={12}>Last 12 months</option>
                    </select>
                </div>
                {loadingTrend ? <Loader text="Loading trend..." /> : <MonthlyTrendChart data={trend} />}
            </div>
        </div>
    );
}