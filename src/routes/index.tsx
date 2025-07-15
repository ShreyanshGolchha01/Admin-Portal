import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Camps from '../pages/Camps';
import Doctors from '../pages/Doctors';
import Users from '../pages/Users';
import Schemes from '../pages/Schemes';
import Reports from '../pages/Reports';
import AdminLayout from '../layouts/AdminLayout';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Router Configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'camps',
        element: <Camps />,
      },
      {
        path: 'doctors',
        element: <Doctors />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'schemes',
        element: <Schemes />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
    ],
  },
  // Legacy routes for backward compatibility
  {
    path: '/dashboard',
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: '/camps',
    element: <Navigate to="/admin/camps" replace />,
  },
  {
    path: '/doctors',
    element: <Navigate to="/admin/doctors" replace />,
  },
  {
    path: '/users',
    element: <Navigate to="/admin/users" replace />,
  },
  {
    path: '/schemes',
    element: <Navigate to="/admin/schemes" replace />,
  },
  {
    path: '/reports',
    element: <Navigate to="/admin/reports" replace />,
  },
  // Catch all route
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
