import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function GoalProgressCard({ goal, onEdit, onDelete, onContribute }) {
    const target = parseFloat(goal.target_amount);
    const saved = parseFloat(goal.saved_amount);
    const percent = target > 0 ? Math.min(Math.round((saved / target) * 100), 100) : 0;
    const isCompleted = goal.status === 'completed';

    return (
        <div className={`goal-card ${isCompleted ? 'goal-completed' : ''}`}>
            <div className="goal-card-header">
                <h3>{goal.goal_name}</h3>
                {isCompleted && <span className="badge badge-income">✅ Completed</span>}
            </div>

            {goal.target_date && (
                <p className="text-muted goal-target-date">Target: {formatDate(goal.target_date)}</p>
            )}

            <div className="progress-bar-track">
                <div
                    className={`progress-bar-fill ${isCompleted ? 'alert-ok' : 'alert-warning'}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <div className="budget-progress-labels" style={{ marginTop: 8 }}>
                <span>{formatCurrency(saved)} saved</span>
                <span className="text-muted">of {formatCurrency(target)}</span>
            </div>

            <div className="goal-card-actions">
                {!isCompleted && (
                    <button className="btn-secondary" onClick={() => onContribute(goal)}>
                        + Add Funds
                    </button>
                )}
                <button className="icon-btn" onClick={() => onEdit(goal)} title="Edit">
                    ✏️
                </button>
                <button className="icon-btn" onClick={() => onDelete(goal)} title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    );
}