require("dotenv").config({ path: "./.env" });

console.log('🔍 Testing Cloudinary Environment Variables:');
console.log('='.repeat(50));
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Found' : '❌ Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Found' : '❌ Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Found' : '❌ Missing');
console.log('CLOUDINARY_UPLOAD_PRESET:', process.env.CLOUDINARY_UPLOAD_PRESET ? '✅ Found' : '❌ Missing');

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    console.log('\n🎉 All Cloudinary variables are accessible!');
} else {
    console.log('\n❌ Some Cloudinary variables are missing!');
}
