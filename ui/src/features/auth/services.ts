// Auth feature services
import type { LoginCredentials, AuthResponse, User } from './model';

// API endpoints
const API_URL = '/api';
const LOGIN_URL = `${API_URL}/login`;
const USER_URL = `${API_URL}/user`;

// Login service
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();

    // Store token in localStorage
    localStorage.setItem('token', data.token);

    return data;
};

// Get current user service
export const getCurrentUser = async (): Promise<User> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(USER_URL, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get user');
    }

    return response.json();
};

// Logout service
export const logout = (): void => {
    localStorage.removeItem('token');
};