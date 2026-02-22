// Supabase Configuration for BD News Archive
// Project URL: https://qcwqoaancvymvuutifyq.supabase.co

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://qcwqoaancvymvuutifyq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjd3FvYWFuY3Z5bXZ1dXRpZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MTIxOTcsImV4cCI6MjA4NzA4ODE5N30.4P95Jf78P1s1y35T9ErP7l0r9R2TL1s-BKV4h5gdia0';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  NEWS: 'news',
  CATEGORIES: 'categories',
  SUBMISSIONS: 'submissions',
  STATISTICS: 'statistics'
};
