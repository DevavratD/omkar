const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function checkSchema() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  console.log('Checking for tables in:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  const { data, error } = await supabase
    .from('questions')
    .select('id')
    .limit(1);
    
  if (error) {
    if (error.code === 'PGRST116' || error.message.includes('not found')) {
      console.log('❌ questions table not found.');
    } else {
      console.error('Error checking questions table:', error.message);
    }
  } else {
    console.log('✅ questions table exists.');
  }

  const { error: resError } = await supabase
    .from('results')
    .select('id')
    .limit(1);
    
  if (resError) {
    console.log('❌ results table not found.');
  } else {
    console.log('✅ results table exists.');
  }
}

checkSchema().catch(console.error);
