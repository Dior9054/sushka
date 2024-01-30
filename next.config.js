const withPWA = require('next-pwa')({
    dest: 'public'
})

/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: false,
}

module.exports = withPWA({ nextConfig })


