import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));

// Create a mock client for when Supabase is not configured
const createMockClient = (): any => {
  const mockResponse = { data: null, error: new Error('Supabase not configured') };
  return {
    from: () => ({
      select: () => Promise.resolve(mockResponse),
      insert: () => Promise.resolve(mockResponse),
      update: () => Promise.resolve(mockResponse),
      delete: () => Promise.resolve(mockResponse),
      upsert: () => Promise.resolve(mockResponse),
      eq: function() { return this; },
      single: function() { return this; },
      order: function() { return this; }
    }),
    auth: {
      signInWithPassword: () => Promise.resolve(mockResponse),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve(mockResponse),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
};

// Export supabase client (real or mock)
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

if (!isSupabaseConfigured) {
  console.warn('⚠️  Supabase not configured. Running in LOCAL MODE with constants.ts data.');
  console.warn('To enable database features, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
}
