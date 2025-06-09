// src/Routes/AuthProtected.tsx
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const AuthProtected: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        // On mount, check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for auth changes (e.g. login, logout, OAuth)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    // While checking session
    if (user === undefined) {
        return null; // or a loading spinner if you prefer
    }

    // Not authenticated → redirect
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Authenticated → render protected content
    return <>{children}</>;
};

export default AuthProtected;