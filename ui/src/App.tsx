import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LoginPage } from './features/auth';
import { ROUTES } from './routes';
import { useAuth } from './features/auth/hooks';

// Define types for our API response
interface ApiItem {
    id: number;
    name: string;
}

interface ApiData {
    message: string;
    timestamp: string;
    items: ApiItem[];
}

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <>{children}</>;
};

// Dashboard component (placeholder)
const Dashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <ApiDataExample />
        </div>
    );
};

// Original API data example component
const ApiDataExample = () => {
    const [apiData, setApiData] = useState<ApiData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // The path needs to be '/api/api/data' because:
                // 1. The backend endpoint is at '/api/data'
                // 2. The Vite proxy adds '/api' prefix and then rewrites it
                const response = await fetch('/api/api/data');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setApiData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Data from Backend API</h2>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Logout
            </button>

            {loading && <p>Loading data...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {apiData && (
                <div className="bg-white p-4 rounded shadow">
                    <p><strong>Message:</strong> {apiData.message}</p>
                    <p><strong>Timestamp:</strong> {apiData.timestamp}</p>
                    <h3 className="font-bold mt-2">Items:</h3>
                    <ul className="list-disc pl-5">
                        {apiData.items.map(item => (
                            <li key={item.id}>{item.name} (ID: {item.id})</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
                <p>This example demonstrates fetching data from a Symfony backend API endpoint.</p>
                <p>The fetch request is made to '/api/api/data' which is proxied to the backend service.</p>
            </div>
        </div>
    );
};

// Main App component with routing
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;