import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Layout for all authenticated pages - Navbar on top, page content below
export default function AppLayout() {
    return (
        <>
            <Navbar />
            <main className="page-content">
                <Outlet />
            </main>
        </>
    );
}