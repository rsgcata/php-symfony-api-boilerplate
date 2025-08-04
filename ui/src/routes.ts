// Centralized route configuration
import type { RouteObject } from 'react-router';

// Define route paths as constants for type safety
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};

// Define routes configuration
export const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    // The actual component will be rendered in App.tsx
  },
  {
    path: ROUTES.DASHBOARD,
    // The actual component will be rendered in App.tsx
  },
];