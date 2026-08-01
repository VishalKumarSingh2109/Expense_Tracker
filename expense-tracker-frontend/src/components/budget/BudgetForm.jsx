import { useState, useEffect } from 'react';

// Used to set or update the budget limit for the currently selected month/year.
// `currentLimit` pre-fills the input when a budget already exists.
export default function BudgetForm({ month, year, currentLimit, onSubmit, submitting }) {
    const [amountLimit, setAmountLimit] = useState(currentLimit || '');
    const [error, setError] = useState('');

    // Keep the input in sync when the selected month/year changes
    useEffect(() => {
        setAmountLimit(currentLimit || '');
    }, [currentLimit, month, year]);

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!amountLimit || parseFloat(amountLimit) <= 0) {
            setError('Please enter an amount greater than 0.');
            return;
        }

        onSubmit({ month, year, amountLimit: parseFloat(amountLimit) });
    }

    return (
        <form onSubmit={handleSubmit} className="budget-form">
            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
                <label htmlFor="amountLimit">Monthly Budget Limit (₹)</label>
                <input
                    id="amountLimit"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amountLimit}
                    onChange={(e) => setAmountLimit(e.target.value)}
                    placeholder="e.g. 20000"
                    required
                />
            </div>

            <button type="submit" className="btn-primary" disabled={submitting} style={{ width: 'auto' }}>
                {submitting ? 'Saving...' : currentLimit ? 'Update Budget' : 'Set Budget'}
            </button>
        </form>
    );
}