import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Camps from '../pages/Camps';
import Doctors from '../pages/Doctors';
import Users from '../pages/Users';
import Schemes from '../pages/Schemes';
import Reports from '../pages/Reports';
import Activities from '../pages/Activities';
import AdminLayout from '../layouts/AdminLayout';

// Doctor Portal imports
import DoctorLogin from '../pages/DoctorLogin';
import DoctorDashboard from '../pages/DoctorDashboard';
import NewCamp from '../pages/NewCamp';
import PatientsManagement from '../pages/PatientsManagement';
import DoctorLayout from '../layouts/DoctorLayout';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Doctor Protected Route Component
const DoctorProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDoctorAuthenticated = localStorage.getItem('isDoctorAuthenticated') === 'true';
  
  if (!isDoctorAuthenticated) {
    return <Navigate to="/doctor/login" replace />;
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
      {
        path: 'activities',
        element: <Activities />,
      },
    ],
  },
  // Doctor Portal Routes
  {
    path: '/doctor/login',
    element: <DoctorLogin />,
  },
  {
    path: '/doctor',
    element: (
      <DoctorProtectedRoute>
        <DoctorLayout />
      </DoctorProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/doctor/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DoctorDashboard />,
      },
      // Placeholder routes - will create these pages next
      {
        path: 'new-camp',
        element: <NewCamp />,
      },
      {
        path: 'patients',
        element: <PatientsManagement />,
      },
      {
        path: 'health-records',
        element: <div className="p-6 text-center text-gray-500">स्वास्थ्य रिकॉर्ड पेज जल्द आ रहा है...</div>,
      },
      {
        path: 'family-health',
        element: <div className="p-6 text-center text-gray-500">पारिवारिक स्वास्थ्य पेज जल्द आ रहा है...</div>,
      },
      {
        path: 'profile',
        element: <div className="p-6 text-center text-gray-500">प्रोफाइल पेज जल्द आ रहा है...</div>,
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
