import { formatCurrency } from '../../utils/formatCurrency';

export default function ReportSummary({ summary }) {
    const isPositive = summary.netSavings >= 0;

    return (
        <div className="summary-cards">
            <div className="summary-card">
                <span className="summary-label">Total Income</span>
                <span className="summary-value amount-income">{formatCurrency(summary.income)}</span>
            </div>

            <div className="summary-card">
                <span className="summary-label">Total Expense</span>
                <span className="summary-value amount-expense">{formatCurrency(summary.expense)}</span>
            </div>

            <div className="summary-card">
                <span className="summary-label">Net Savings</span>
                <span className={`summary-value ${isPositive ? 'amount-income' : 'amount-expense'}`}>
                    {formatCurrency(summary.netSavings)}
                </span>
            </div>
        </div>
    );
}