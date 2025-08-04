// Auth feature model/types/constants

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface User {
    username: string;
    roles: string[];
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}