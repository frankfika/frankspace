// Create admin user in Supabase Auth
const SUPABASE_URL = 'https://ydrnelssejbwsopfsumh.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkcm5lbHNzZWpid3NvcGZzdW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjU3NDg2MSwiZXhwIjoyMDgyMTUwODYxfQ.hCw327qVqhzqx_JYfn8he-whs82WQ0a1_wZ4maKCJjk';

async function createAdminUser() {
  const email = 'frank@gmail.com';
  const password = 'admin123';

  console.log('🔐 Creating admin user...\n');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}\n`);

  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true
    })
  });

  const data = await response.json();

  if (response.ok) {
    console.log('✅ Admin user created successfully!');
    console.log(`User ID: ${data.id}`);
  } else if (data.msg?.includes('already been registered') || data.message?.includes('already been registered')) {
    console.log('ℹ️  User already exists, that\'s fine!');
  } else {
    console.log('❌ Error:', data.msg || data.message || JSON.stringify(data));
  }
}

createAdminUser().catch(console.error);
