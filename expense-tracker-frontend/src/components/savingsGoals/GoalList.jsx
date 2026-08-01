import GoalProgressCard from './GoalProgressCard';
import Loader from '../common/Loader';

export default function GoalList({ goals, loading, onEdit, onDelete, onContribute }) {
    if (loading) return <Loader text="Loading savings goals..." />;

    if (goals.length === 0) {
        return <div className="empty-state">No savings goals yet. Create one to start tracking your progress.</div>;
    }

    return (
        <div className="goal-grid">
            {goals.map((goal) => (
                <GoalProgressCard
                    key={goal.id}
                    goal={goal}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onContribute={onContribute}
                />
            ))}
        </div>
    );
}