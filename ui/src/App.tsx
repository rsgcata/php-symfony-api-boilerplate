import {useEffect, useState} from 'react'
import './App.css'

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

function App() {
    const [apiData, setApiData] = useState<ApiData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                // The path needs to be '/api/api/data' because:
                // 1. The backend endpoint is at '/api/data'
                // 2. The Vite proxy adds '/api' prefix and then rewrites it
                const response = await fetch('/api/api/data')

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()
                setApiData(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
            <div className="App">
                <h1>API Data Fetch Example</h1>

                <div className="card">
                    <h2>Data from Backend API</h2>
                    {loading && <p>Loading data...</p>}
                    {error && <p>Error: {error}</p>}
                    {apiData && (
                            <div>
                                <p><strong>Message:</strong> {apiData.message}</p>
                                <p><strong>Timestamp:</strong> {apiData.timestamp}</p>
                                <h3>Items:</h3>
                                <ul>
                                    {apiData.items.map(item => (
                                            <li key={item.id}>{item.name} (ID: {item.id})</li>
                                    ))}
                                </ul>
                            </div>
                    )}
                </div>

                <div className="info">
                    <p>This example demonstrates fetching data from a Symfony backend API
                        endpoint.</p>
                    <p>The fetch request is made to '/api/api/data' which is proxied to the backend
                        service.</p>
                </div>
            </div>
    )
}

export default App