import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', padding: 60 }}>
            <h1>404</h1>
            <p>Page not found.</p>
            <Link to="/dashboard">Go back to dashboard</Link>
        </div>
    );
}
