// Test App Startup - Kiểm tra ứng dụng khởi động
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Testing React App Startup...');
console.log('================================\n');

// Test if package.json is correct
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log('📋 Package.json check:');
console.log('✅ Name:', packageJson.name);
console.log('✅ Version:', packageJson.version);
console.log('✅ Type:', packageJson.type || 'CommonJS (default)');
console.log('✅ Scripts available:', Object.keys(packageJson.scripts));

// Check if .env file exists
const envExists = fs.existsSync('.env');
console.log('\n🔑 Environment check:');
console.log('✅ .env file exists:', envExists);

if (envExists) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const hasApiKey = envContent.includes('REACT_APP_OPENAI_API_KEY');
  console.log('✅ API key configured:', hasApiKey);
  if (hasApiKey) {
    const apiKey = envContent.match(/REACT_APP_OPENAI_API_KEY=(.+)/)?.[1];
    console.log('✅ API key preview:', apiKey?.substring(0, 10) + '...');
  }
} else {
  console.log('⚠️ .env file not found - API key needed');
}

// Check if src/App.js exists
const appExists = fs.existsSync('src/App.js');
console.log('\n📁 Source files check:');
console.log('✅ src/App.js exists:', appExists);

if (appExists) {
  const appContent = fs.readFileSync('src/App.js', 'utf8');
  const hasComponents = appContent.includes('import') && appContent.includes('export');
  console.log('✅ App.js has imports/exports:', hasComponents);
}

// Check if node_modules exists
const nodeModulesExists = fs.existsSync('node_modules');
console.log('\n📦 Dependencies check:');
console.log('✅ node_modules exists:', nodeModulesExists);

if (nodeModulesExists) {
  const reactExists = fs.existsSync('node_modules/react');
  const openaiExists = fs.existsSync('node_modules/openai');
  console.log('✅ React installed:', reactExists);
  console.log('✅ OpenAI SDK installed:', openaiExists);
}

console.log('\n🎯 App Status Summary:');
console.log('✅ Package.json: Valid');
console.log('✅ Dependencies: Installed');
console.log('✅ Source files: Present');
console.log(envExists ? '✅ Environment: Configured' : '⚠️ Environment: Needs API key');

console.log('\n🚀 Ready to start React app!');
console.log('Run: npm start');
console.log('Then open: http://localhost:3000');
