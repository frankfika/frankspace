// Script to verify database data
const SUPABASE_URL = 'https://ydrnelssejbwsopfsumh.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkcm5lbHNzZWpid3NvcGZzdW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjU3NDg2MSwiZXhwIjoyMDgyMTUwODYxfQ.hCw327qVqhzqx_JYfn8he-whs82WQ0a1_wZ4maKCJjk';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_ROLE_KEY,
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
};

async function countRows(table) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=id`;
  const response = await fetch(url, { headers });
  if (!response.ok) return 0;
  const data = await response.json();
  return data.length;
}

async function getByLang(table, lang) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?lang=eq.${lang}&select=*`;
  const response = await fetch(url, { headers });
  if (!response.ok) return [];
  return await response.json();
}

async function main() {
  console.log('📊 Verifying Database Data...\n');

  const tables = [
    { name: 'personal_info', expected: { en: 1, zh: 1 } },
    { name: 'navigation', expected: { en: 1, zh: 1 } },
    { name: 'headers', expected: { en: 1, zh: 1 } },
    { name: 'skills', expected: { en: 6, zh: 6 } },
    { name: 'experience', expected: { en: 5, zh: 5 } },
    { name: 'education', expected: { en: 3, zh: 3 } },
    { name: 'projects', expected: { en: 4, zh: 4 } },
    { name: 'thoughts', expected: { en: 9, zh: 9 } },
    { name: 'activities', expected: { en: 4, zh: 4 } },
    { name: 'socials', expected: { en: 9, zh: 9 } },
    { name: 'consultation', expected: { en: 1, zh: 1 } },
    { name: 'personal_traits', expected: { en: 1, zh: 1 } },
    { name: 'recommendations', expected: { en: 12, zh: 12 } }
  ];

  let allPassed = true;

  for (const table of tables) {
    const enData = await getByLang(table.name, 'en');
    const zhData = await getByLang(table.name, 'zh');

    const enOk = enData.length === table.expected.en;
    const zhOk = zhData.length === table.expected.zh;

    if (enOk && zhOk) {
      console.log(`✅ ${table.name}: EN=${enData.length}, ZH=${zhData.length}`);
    } else {
      console.log(`❌ ${table.name}: EN=${enData.length}/${table.expected.en}, ZH=${zhData.length}/${table.expected.zh}`);
      allPassed = false;
    }
  }

  console.log('\n' + '='.repeat(50));

  if (allPassed) {
    console.log('✨ All data verified successfully!\n');
  } else {
    console.log('⚠️  Some data counts do not match expected values.\n');
  }

  // Sample data check
  console.log('📝 Sample Data Check:\n');

  const personalInfo = await getByLang('personal_info', 'en');
  if (personalInfo.length > 0) {
    console.log('Personal Info (EN):');
    console.log(`  Name: ${personalInfo[0].name}`);
    console.log(`  Tagline: ${personalInfo[0].tagline}`);
    console.log(`  Email: ${personalInfo[0].email}`);
  }

  const thoughts = await getByLang('thoughts', 'zh');
  console.log(`\nThoughts (ZH): ${thoughts.length} articles`);
  if (thoughts.length > 0) {
    console.log(`  Latest: ${thoughts[0].title}`);
  }

  const recommendations = await getByLang('recommendations', 'en');
  const books = recommendations.filter(r => r.type === 'book');
  const movies = recommendations.filter(r => r.type === 'movie');
  const tvShows = recommendations.filter(r => r.type === 'tv_show');
  console.log(`\nRecommendations (EN):`);
  console.log(`  Books: ${books.length} categories`);
  console.log(`  Movies: ${movies.length} categories`);
  console.log(`  TV Shows: ${tvShows.length} categories`);
}

main().catch(console.error);
