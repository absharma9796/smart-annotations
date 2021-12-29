const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: config => {
    config.resolve.modules.push(path.resolve(__dirname));
  }
}
