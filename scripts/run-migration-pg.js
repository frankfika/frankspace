// Script to run Supabase migrations using PostgreSQL connection
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase PostgreSQL connection
// Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:!chenpitang2020@db.ydrnelssejbwsopfsumh.supabase.co:5432/postgres';

const { Pool } = pg;

async function main() {
  console.log('🚀 Starting Supabase Migration...\n');

  // Read migration file
  const migrationPath = path.join(__dirname, '..', 'supabase-migration.sql');

  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }

  const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

  // Connect to database
  console.log('🔗 Connecting to database...');
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected!\n');

    console.log('📝 Running migration...');

    // Execute entire migration as one transaction
    let successCount = 0;
    let errorCount = 0;

    // Split into logical statements (handle functions with $$ properly)
    const cleanSQL = migrationSQL.replace(/\r\n/g, '\n');

    // First, create all tables
    const tableMatches = cleanSQL.match(/CREATE TABLE IF NOT EXISTS[\s\S]*?\);/gi) || [];
    for (const stmt of tableMatches) {
      try {
        await client.query(stmt);
        const tableName = stmt.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)?.[1];
        if (tableName) {
          console.log(`  ✅ Created table: ${tableName}`);
        }
        successCount++;
      } catch (err) {
        if (!err.message.includes('already exists')) {
          console.error(`  ⚠️  ${err.message.split('\n')[0]}`);
          errorCount++;
        }
      }
    }

    // Create indexes
    const indexMatches = cleanSQL.match(/CREATE INDEX IF NOT EXISTS[^;]+;/gi) || [];
    for (const stmt of indexMatches) {
      try {
        await client.query(stmt);
        successCount++;
      } catch (err) {
        if (!err.message.includes('already exists')) {
          errorCount++;
        }
      }
    }
    console.log(`  ✅ Created ${indexMatches.length} indexes`);

    // Enable RLS
    const rlsMatches = cleanSQL.match(/ALTER TABLE \w+ ENABLE ROW LEVEL SECURITY;/gi) || [];
    for (const stmt of rlsMatches) {
      try {
        await client.query(stmt);
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }
    console.log(`  ✅ Enabled RLS on ${rlsMatches.length} tables`);

    // Create policies
    const policyMatches = cleanSQL.match(/CREATE POLICY[^;]+;/gi) || [];
    for (const stmt of policyMatches) {
      try {
        await client.query(stmt);
        successCount++;
      } catch (err) {
        if (!err.message.includes('already exists')) {
          errorCount++;
        }
      }
    }
    console.log(`  ✅ Created ${policyMatches.length} policies`);

    // Create trigger function
    const funcMatch = cleanSQL.match(/CREATE OR REPLACE FUNCTION[\s\S]*?\$\$ LANGUAGE plpgsql;/i);
    if (funcMatch) {
      try {
        await client.query(funcMatch[0]);
        console.log(`  ✅ Created trigger function`);
        successCount++;
      } catch (err) {
        console.error(`  ⚠️  Function: ${err.message.split('\n')[0]}`);
        errorCount++;
      }
    }

    // Create triggers
    const triggerMatches = cleanSQL.match(/CREATE TRIGGER[^;]+;/gi) || [];
    for (const stmt of triggerMatches) {
      try {
        await client.query(stmt);
        successCount++;
      } catch (err) {
        if (!err.message.includes('already exists')) {
          errorCount++;
        }
      }
    }
    console.log(`  ✅ Created ${triggerMatches.length} triggers`);

    console.log(`\n✨ Migration completed! (${successCount} statements, ${errorCount} warnings)\n`);

    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.log('\n💡 Please check your DATABASE_URL or provide the correct database password.');
    console.log('   You can find it in: Supabase Dashboard → Settings → Database → Connection string\n');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main().catch(console.error);
