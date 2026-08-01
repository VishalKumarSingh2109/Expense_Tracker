import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function TransactionItem({ transaction, onEdit, onDelete }) {
    const isIncome = transaction.type === 'income';

    return (
        <tr>
            <td>{formatDate(transaction.transaction_date)}</td>
            <td>{transaction.category_name}</td>
            <td>{transaction.description || <span className="text-muted">—</span>}</td>
            <td>
                <span className={`badge ${isIncome ? 'badge-income' : 'badge-expense'}`}>
                    {isIncome ? 'Income' : 'Expense'}
                </span>
            </td>
            <td className={isIncome ? 'amount-income' : 'amount-expense'}>
                {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
            </td>
            <td className="actions-cell">
                <button className="icon-btn" onClick={() => onEdit(transaction)} title="Edit">
                    ✏️
                </button>
                <button className="icon-btn" onClick={() => onDelete(transaction)} title="Delete">
                    🗑️
                </button>
            </td>
        </tr>
    );
}