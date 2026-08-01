import { useState, useEffect, useCallback } from 'react';
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from '../api/transactionApi';
import { getCategories } from '../api/categoryApi';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Pagination from '../components/common/Pagination';
import SearchFilterBar from '../components/common/SearchFilterBar';
import useDebounce from '../hooks/useDebounce';

const DEFAULT_FILTERS = {
    page: 1,
    limit: 10,
    type: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    search: '',
};

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Delete confirm state
    const [deleteTarget, setDeleteTarget] = useState(null);

    const debouncedSearch = useDebounce(filters.search, 400);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getTransactions({ ...filters, search: debouncedSearch });
            setTransactions(res.data.data.transactions);
            setPagination(res.data.data.pagination);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load transactions.');
        } finally {
            setLoading(false);
        }
    }, [filters, debouncedSearch]);

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data.data))
            .catch(() => setError('Failed to load categories.'));
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    function openCreateForm() {
        setEditingTransaction(null);
        setIsFormOpen(true);
    }

    function openEditForm(transaction) {
        setEditingTransaction(transaction);
        setIsFormOpen(true);
    }

    async function handleFormSubmit(data) {
        setSubmitting(true);
        setError('');
        try {
            if (editingTransaction) {
                await updateTransaction(editingTransaction.id, data);
            } else {
                await createTransaction(data);
            }
            setIsFormOpen(false);
            fetchTransactions();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save transaction.');
        } finally {
            setSubmitting(false);
        }
    }

    async function handleConfirmDelete() {
        try {
            await deleteTransaction(deleteTarget.id);
            setDeleteTarget(null);
            fetchTransactions();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete transaction.');
            setDeleteTarget(null);
        }
    }

    function handleFilterChange(newFilters) {
        setFilters(newFilters);
    }

    function handleResetFilters() {
        setFilters(DEFAULT_FILTERS);
    }

    function handlePageChange(newPage) {
        setFilters((prev) => ({ ...prev, page: newPage }));
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Transactions</h1>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={openCreateForm}>
                    + Add Transaction
                </button>
            </div>

            {error && <div className="form-error">{error}</div>}

            <SearchFilterBar
                filters={filters}
                categories={categories}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            <TransactionList
                transactions={transactions}
                loading={loading}
                onEdit={openEditForm}
                onDelete={setDeleteTarget}
            />

            <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />

            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            >
                <TransactionForm
                    initialData={editingTransaction}
                    categories={categories}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormOpen(false)}
                    submitting={submitting}
                />
            </Modal>

            <ConfirmDialog
                isOpen={!!deleteTarget}
                title="Delete Transaction"
                message={`Are you sure you want to delete this ${deleteTarget?.type} of ${deleteTarget?.amount}? This can't be undone from the UI.`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}