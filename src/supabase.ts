export type AuthMode = 'local' | 'supabase'
export const authMode: AuthMode = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY ? 'supabase' : 'local'
export const supabaseConfig = { url: import.meta.env.VITE_SUPABASE_URL ?? '', anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '' }
export function assertRemoteConfigured() { if (authMode !== 'supabase') throw new Error('Supabase no está configurado. La aplicación continúa en modo local.') }
