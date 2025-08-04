// Auth feature hooks
import { useState, useEffect, useCallback } from 'react';
import type { AuthState, LoginCredentials} from './model';
import { login as loginService, getCurrentUser, logout as logoutService } from './services';

// Initial auth state
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

// useAuth hook for managing authentication state
export const useAuth = () => {
    const [state, setState] = useState<AuthState>(initialState);

    // Load user on mount if token exists
    useEffect(() => {
        if (state.token && !state.user) {
            loadUser();
        }
    }, [state.token]);

    // Load user function
    const loadUser = async () => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const user = await getCurrentUser();
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to load user',
            }));
            // Clear token if it's invalid
            localStorage.removeItem('token');
        }
    };

    // Login function
    const login = async (credentials: LoginCredentials) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await loginService(credentials);
            setState({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            return true;
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed',
            }));
            return false;
        }
    };

    // Logout function
    const logout = useCallback(() => {
        logoutService();
        setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
    }, []);

    return {
        ...state,
        login,
        logout,
    };
};