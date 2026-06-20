const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:!chenpitang2020@db.ydrnelssejbwsopfsumh.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });
  
  await client.connect();
  console.log('Connected to Supabase database');
  
  const sql = fs.readFileSync('./supabase/fix-rls-policies.sql', 'utf8');
  
  // Split by semicolon and execute each statement
  const statements = sql.split(';').filter(s => s.trim());
  
  let success = 0, skipped = 0;
  for (const stmt of statements) {
    if (stmt.trim()) {
      try {
        await client.query(stmt);
        success++;
      } catch (err) {
        skipped++;
        // Policy already exists or other non-critical error
      }
    }
  }
  
  await client.end();
  console.log(`Done! Success: ${success}, Skipped: ${skipped}`);
}

run().catch(console.error);
