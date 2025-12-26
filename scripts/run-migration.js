// Script to run Supabase migrations
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://ydrnelssejbwsopfsumh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkcm5lbHNzZWpid3NvcGZzdW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjU3NDg2MSwiZXhwIjoyMDgyMTUwODYxfQ.hCw327qVqhzqx_JYfn8he-whs82WQ0a1_wZ4maKCJjk';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runSQL(sql, description) {
  console.log(`\n📝 ${description}...`);
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) {
      // Try direct fetch if rpc doesn't work
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({ sql_query: sql })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
      console.log(`✅ ${description} - Done`);
      return true;
    }
    console.log(`✅ ${description} - Done`);
    return true;
  } catch (err) {
    console.error(`❌ ${description} - Error:`, err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Supabase Migration...\n');

  // Read migration file
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migration.sql');
  const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');

  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }

  // Test connection first
  console.log('🔗 Testing connection...');
  const { data, error } = await supabase.from('personal_info').select('count').limit(1);
  if (error && error.code !== 'PGRST116') {
    console.log('Connection test result:', error.message);
  } else {
    console.log('✅ Connection successful');
  }

  console.log('\n📋 Tables will be created/updated via Supabase Dashboard SQL Editor');
  console.log('Please run the SQL files manually in the Supabase SQL Editor.');
  console.log('\nMigration file:', migrationPath);
  console.log('Seed file:', seedPath);
}

main().catch(console.error);
