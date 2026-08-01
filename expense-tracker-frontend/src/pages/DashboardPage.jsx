import useAuth from '../hooks/useAuth';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="page-container">
            <h1>Welcome, {user?.name} 👋</h1>
            <p>Your dashboard will appear here once we build the remaining modules.</p>
        </div>
    );
}