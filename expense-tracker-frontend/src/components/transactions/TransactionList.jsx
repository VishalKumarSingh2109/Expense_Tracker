import TransactionItem from './TransactionItem';
import Loader from '../common/Loader';

export default function TransactionList({ transactions, loading, onEdit, onDelete }) {
    if (loading) return <Loader text="Loading transactions..." />;

    if (transactions.length === 0) {
        return <div className="empty-state">No transactions found. Try adjusting your filters, or add a new one.</div>;
    }

    return (
        <table className="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => (
                    <TransactionItem key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}