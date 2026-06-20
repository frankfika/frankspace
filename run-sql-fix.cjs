const { Client } = require('pg');
const fs = require('fs');

async function run() {
  // Try pooler connection
  const client = new Client({
    connectionString: 'postgresql://postgres.ydrnelssejbwsopfsumh:!chenpitang2020@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
  });
  
  await client.connect();
  console.log('Connected to Supabase database');
  
  const sql = fs.readFileSync('./supabase/fix-rls-policies.sql', 'utf8');
  
  const statements = sql.split(';').filter(s => s.trim());
  
  let success = 0, skipped = 0;
  for (const stmt of statements) {
    if (stmt.trim()) {
      try {
        await client.query(stmt);
        success++;
      } catch (err) {
        skipped++;
      }
    }
  }
  
  await client.end();
  console.log('Done! Success: ' + success + ', Skipped: ' + skipped);
}

run().catch(console.error);
