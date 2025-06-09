// src/pages/Authentication/Logout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../lib/supabaseClient';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                toast.error(error.message);
            } else {
                toast.success('You have been logged out.');
            }
            // give the toast a moment, then redirect
            setTimeout(() => navigate('/login', { replace: true }), 1000);
        })();
    }, [navigate]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <ToastContainer autoClose={2000} />
            <p className="mt-3">Logging out…</p>
        </div>
    );
};

export default Logout;