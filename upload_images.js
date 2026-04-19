const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Need service role key or anon key (if policies allow public upload, but usually they don't without auth).
// We'll try the anon key first, but typically you need Service Role or RLS policies on the bucket.
// Wait, the user has anon key in env. Let's try it. If it fails due to RLS, we'll ask the user or try something else.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'assessment-images';

async function uploadImages() {
  console.log(`Checking if bucket '${BUCKET_NAME}' exists...`);
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  
  if (bucketError) {
    console.error('Error listing buckets:', bucketError);
  } else {
    const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
    if (!bucketExists) {
      console.log(`Creating bucket '${BUCKET_NAME}'...`);
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // Make it publicly accessible
      });
      if (createError) {
        console.error('Error creating bucket. You may need to create it manually in the Supabase dashboard if RLS prevents anon creation:', createError);
        // We'll still try to upload in case it exists but was hidden
      } else {
        console.log(`Bucket created successfully.`);
      }
    } else {
      console.log(`Bucket already exists.`);
    }
  }

  const imagesToUpload = [
    'balance.jpg',
    'clock.png',
    'series.png',
    'triangles.png',
    'mirror.png',
    'dots.png',
    'matrix.png',
    'cube.png',
    'graph.png'
  ];

  for (const filename of imagesToUpload) {
    const filePath = path.join(__dirname, 'public', filename);
    if (fs.existsSync(filePath)) {
      console.log(`Uploading ${filename}...`);
      const fileBuffer = fs.readFileSync(filePath);
      
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, fileBuffer, {
          upsert: true,
          contentType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg'
        });

      if (error) {
        console.error(`Failed to upload ${filename}:`, error.message);
      } else {
        const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);
        console.log(`Uploaded ${filename} successfully. Public URL: ${publicUrlData.publicUrl}`);
      }
    } else {
      console.log(`File ${filename} not found in public/ directory. Skipping.`);
    }
  }
}

uploadImages().catch(console.error);
