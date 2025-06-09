/// <reference types="vite/client" />

// (Optional) to tighten up your env types:
interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    // add other VITE_ env vars here…
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
