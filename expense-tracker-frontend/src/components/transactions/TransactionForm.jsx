import { useState, useEffect } from 'react';
import { toInputDateFormat } from '../../utils/formatDate';

// If `initialData` is passed, this is edit mode - otherwise create mode.
// `categories` is the full list (default + custom); filtered by selected type.
export default function TransactionForm({ initialData, categories, onSubmit, onCancel, submitting }) {
    const [type, setType] = useState(initialData?.type || 'expense');
    const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
    const [amount, setAmount] = useState(initialData?.amount || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [transactionDate, setTransactionDate] = useState(
        initialData?.transaction_date ? toInputDateFormat(initialData.transaction_date) : toInputDateFormat(new Date())
    );
    const [error, setError] = useState('');

    // When the type is switched, clear category selection if it no longer matches
    useEffect(() => {
        const stillValid = categories.some((c) => c.id === parseInt(categoryId) && c.type === type);
        if (!stillValid) setCategoryId('');
    }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

    const filteredCategories = categories.filter((c) => c.type === type);

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!categoryId) {
            setError('Please select a category.');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Amount must be greater than 0.');
            return;
        }

        onSubmit({
            categoryId: parseInt(categoryId),
            type,
            amount: parseFloat(amount),
            description,
            transactionDate,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <div className="form-group">
                <label>Type</label>
                <div className="type-toggle">
                    <button
                        type="button"
                        className={type === 'expense' ? 'active expense' : ''}
                        onClick={() => setType('expense')}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        className={type === 'income' ? 'active income' : ''}
                        onClick={() => setType('income')}
                    >
                        Income
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select a category</option>
                    {filteredCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description (optional)</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Groceries at BigBasket"
                    maxLength={255}
                />
            </div>

            <div className="form-group">
                <label htmlFor="transactionDate">Date</label>
                <input
                    id="transactionDate"
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    required
                />
            </div>

            <div className="modal-footer-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting} style={{ width: 'auto' }}>
                    {submitting ? 'Saving...' : initialData ? 'Update' : 'Add Transaction'}
                </button>
            </div>
        </form>
    );
}