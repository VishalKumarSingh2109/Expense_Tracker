import { useState, useEffect, useCallback } from 'react';
import {
    getSavingsGoals,
    createSavingsGoal,
    updateSavingsGoal,
    contributeToGoal,
    deleteSavingsGoal,
} from '../api/savingsGoalApi';
import GoalList from '../components/savingsGoals/GoalList';
import GoalForm from '../components/savingsGoals/GoalForm';
import ContributeForm from '../components/savingsGoals/ContributeForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function SavingsGoalsPage() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Create/Edit modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    // Contribute modal
    const [contributeTarget, setContributeTarget] = useState(null);

    // Delete confirm
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchGoals = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getSavingsGoals();
            setGoals(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load savings goals.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    function openCreateForm() {
        setEditingGoal(null);
        setIsFormOpen(true);
    }

    function openEditForm(goal) {
        setEditingGoal(goal);
        setIsFormOpen(true);
    }

    async function handleFormSubmit(data) {
        setSubmitting(true);
        setError('');
        try {
            if (editingGoal) {
                await updateSavingsGoal(editingGoal.id, data);
            } else {
                await createSavingsGoal(data);
            }
            setIsFormOpen(false);
            fetchGoals();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save goal.');
        } finally {
            setSubmitting(false);
        }
    }

    async function handleContributeSubmit(amount) {
        setSubmitting(true);
        setError('');
        try {
            await contributeToGoal(contributeTarget.id, amount);
            setContributeTarget(null);
            fetchGoals();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add contribution.');
        } finally {
            setSubmitting(false);
        }
    }

    async function handleConfirmDelete() {
        try {
            await deleteSavingsGoal(deleteTarget.id);
            setDeleteTarget(null);
            fetchGoals();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete goal.');
            setDeleteTarget(null);
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Savings Goals</h1>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={openCreateForm}>
                    + New Goal
                </button>
            </div>

            {error && <div className="form-error">{error}</div>}

            <GoalList
                goals={goals}
                loading={loading}
                onEdit={openEditForm}
                onDelete={setDeleteTarget}
                onContribute={setContributeTarget}
            />

            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={editingGoal ? 'Edit Goal' : 'Create Savings Goal'}
            >
                <GoalForm
                    initialData={editingGoal}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormOpen(false)}
                    submitting={submitting}
                />
            </Modal>

            <Modal
                isOpen={!!contributeTarget}
                onClose={() => setContributeTarget(null)}
                title={`Add Funds${contributeTarget ? ` — ${contributeTarget.goal_name}` : ''}`}
            >
                {contributeTarget && (
                    <ContributeForm
                        goal={contributeTarget}
                        onSubmit={handleContributeSubmit}
                        onCancel={() => setContributeTarget(null)}
                        submitting={submitting}
                    />
                )}
            </Modal>

            <ConfirmDialog
                isOpen={!!deleteTarget}
                title="Delete Savings Goal"
                message={`Are you sure you want to delete "${deleteTarget?.goal_name}"? This can't be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}