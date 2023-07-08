/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: [
        'res.cloudinary.com', 
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com',
        'cdn-icons-png.flaticon.com'
      ]
    }
  }
  
  module.exports = nextConfig
 