import { useState } from 'react';

export default function ContributeForm({ goal, onSubmit, onCancel, submitting }) {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const remaining = parseFloat(goal.target_amount) - parseFloat(goal.saved_amount);

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter an amount greater than 0.');
            return;
        }

        onSubmit(parseFloat(amount));
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <p className="text-muted" style={{ marginTop: 0 }}>
                ₹{remaining.toFixed(2)} remaining to reach "{goal.goal_name}"
            </p>

            <div className="form-group">
                <label htmlFor="contributeAmount">Amount to Add (₹)</label>
                <input
                    id="contributeAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    autoFocus
                    required
                />
            </div>

            <div className="modal-footer-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting} style={{ width: 'auto' }}>
                    {submitting ? 'Adding...' : 'Add Contribution'}
                </button>
            </div>
        </form>
    );
}