import { createClient } from '@supabase/supabase-js';
import { demoSupabase } from './demo/mockClient';

export const IS_DEMO = import.meta.env.VITE_DEMO === '1';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Demo mode: in-browser mock, never contacts the real backend.
export const supabase = IS_DEMO
  ? (demoSupabase as ReturnType<typeof createClient>)
  : createClient(supabaseUrl, supabaseAnonKey);
