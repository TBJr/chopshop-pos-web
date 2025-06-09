// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// now using CRA env vars from .env.local
const supabaseUrl     = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
