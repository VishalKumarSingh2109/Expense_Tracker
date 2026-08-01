import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">💰 Expense Tracker</div>

            <div className="navbar-links">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Dashboard
                </NavLink>
                <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Transactions
                </NavLink>
                <NavLink to="/budget" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Budget
                </NavLink>
                <NavLink to="/savings-goals" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Goals
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Reports
                </NavLink>
            </div>

            <div className="navbar-user">
                <span>{user?.name}</span>
                <button className="btn-secondary" onClick={logout}>
                    Log Out
                </button>
            </div>
        </nav>
    );
}