// src/Routes/index.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout'
import VerticalLayout from '../Layouts'

// Routes definitions
import { publicRoutes, authProtectedRoutes } from './allRoutes'
import AuthProtected from './AuthProtected'


export default function AppRoutes() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                {publicRoutes.map((route, idx) => (
                    <Route
                        key={idx}
                        path={route.path}
                        element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                    />
                ))}

                {authProtectedRoutes.map((route, idx) => (
                    <Route
                        key={idx}
                        path={route.path}
                        element={
                            <AuthProtected>
                                <VerticalLayout>{route.component}</VerticalLayout>
                            </AuthProtected>
                        }
                    />
                ))}

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}