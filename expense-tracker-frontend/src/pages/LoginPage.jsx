import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome back</h1>
                <p className="subtitle">Log in to manage your expenses</p>
                <LoginForm />
            </div>
        </div>
    );
}
