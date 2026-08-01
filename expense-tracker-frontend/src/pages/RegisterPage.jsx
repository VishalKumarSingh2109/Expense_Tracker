import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create your account</h1>
                <p className="subtitle">Start tracking your income and expenses</p>
                <RegisterForm />
            </div>
        </div>
    );
}
