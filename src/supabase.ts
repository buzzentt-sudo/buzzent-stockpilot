import { createClient, type Session } from '@supabase/supabase-js'
export type AuthMode = 'local' | 'supabase'
export const supabaseConfig = { url: import.meta.env.VITE_SUPABASE_URL ?? '', anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '' }
export const authMode: AuthMode = supabaseConfig.url && supabaseConfig.anonKey ? 'supabase' : 'local'
export const supabase = authMode === 'supabase' ? createClient(supabaseConfig.url, supabaseConfig.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }) : null
export type AuthResult = { error: Error | null }
export async function signIn(email: string, password: string): Promise<AuthResult> { if (!supabase) return { error: new Error('Supabase no está configurado.') }; const { error } = await supabase.auth.signInWithPassword({ email, password }); return { error: error ? new Error(error.message) : null } }
export async function signUp(email: string, password: string, fullName: string): Promise<AuthResult> { if (!supabase) return { error: new Error('Supabase no está configurado.') }; const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } }); return { error: error ? new Error(error.message) : null } }
export async function requestPasswordReset(email: string): Promise<AuthResult> { if (!supabase) return { error: new Error('Supabase no está configurado.') }; const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin }); return { error: error ? new Error(error.message) : null } }
export async function signOut(): Promise<AuthResult> { if (!supabase) return { error: null }; const { error } = await supabase.auth.signOut(); return { error: error ? new Error(error.message) : null } }
export async function currentSession(): Promise<Session | null> { if (!supabase) return null; const { data } = await supabase.auth.getSession(); return data.session }
export function assertRemoteConfigured() { if (authMode !== 'supabase') throw new Error('Supabase no está configurado. La aplicación continúa en modo local.') }
