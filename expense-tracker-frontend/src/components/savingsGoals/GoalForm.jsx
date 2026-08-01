import { useState } from 'react';
import { toInputDateFormat } from '../../utils/formatDate';

// If `initialData` is passed, this is edit mode - otherwise create mode.
export default function GoalForm({ initialData, onSubmit, onCancel, submitting }) {
    const [goalName, setGoalName] = useState(initialData?.goal_name || '');
    const [targetAmount, setTargetAmount] = useState(initialData?.target_amount || '');
    const [targetDate, setTargetDate] = useState(
        initialData?.target_date ? toInputDateFormat(initialData.target_date) : ''
    );
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!goalName.trim()) {
            setError('Please enter a goal name.');
            return;
        }
        if (!targetAmount || parseFloat(targetAmount) <= 0) {
            setError('Target amount must be greater than 0.');
            return;
        }

        onSubmit({
            goalName: goalName.trim(),
            targetAmount: parseFloat(targetAmount),
            targetDate: targetDate || null,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
                <label htmlFor="goalName">Goal Name</label>
                <input
                    id="goalName"
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="e.g. New Laptop"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="targetAmount">Target Amount (₹)</label>
                <input
                    id="targetAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="e.g. 50000"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="targetDate">Target Date (optional)</label>
                <input
                    id="targetDate"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                />
            </div>

            <div className="modal-footer-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting} style={{ width: 'auto' }}>
                    {submitting ? 'Saving...' : initialData ? 'Update Goal' : 'Create Goal'}
                </button>
            </div>
        </form>
    );
}