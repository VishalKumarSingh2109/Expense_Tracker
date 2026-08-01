import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Wraps protected pages - if there's no token, redirect to /login.
// Used as a layout route in AppRoutes.jsx via <Route element={<ProtectedRoute />}>
export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
