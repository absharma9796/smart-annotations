const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = { 
      fs: false, 
      path: false, 
      crypto: false, 
      formidable: false, 
      os: false, 
      stream: false, 
      querystring: false 
    };
    config.resolve.modules.push(path.resolve(__dirname));
    return config;
  }
}
