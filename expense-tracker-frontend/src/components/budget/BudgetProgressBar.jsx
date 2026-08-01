import { formatCurrency } from '../../utils/formatCurrency';

// Horizontal progress bar - used on the Budget detail page.
// Color follows the backend's alertLevel: ok (green), warning (yellow), exceeded (red)
export default function BudgetProgressBar({ limit, spent, percentUsed, alertLevel }) {
    const barWidth = Math.min(percentUsed, 100);

    return (
        <div className="budget-progress-bar-wrapper">
            <div className="budget-progress-labels">
                <span>{formatCurrency(spent)} spent</span>
                <span className="text-muted">of {formatCurrency(limit)}</span>
            </div>

            <div className="progress-bar-track">
                <div
                    className={`progress-bar-fill alert-${alertLevel}`}
                    style={{ width: `${barWidth}%` }}
                />
            </div>

            <div className="budget-progress-footer">
                <span className={`alert-text alert-${alertLevel}`}>
                    {percentUsed}% used
                </span>
                {alertLevel === 'warning' && <span className="alert-text alert-warning">⚠️ Approaching limit</span>}
                {alertLevel === 'exceeded' && <span className="alert-text alert-exceeded">🚨 Budget exceeded</span>}
            </div>
        </div>
    );
}