// Debug API Connection Script
const https = require('https');

const apiKey = process.env.REACT_APP_OPENAI_API_KEY || 'sk-proj-D4QtCbKKkxHhwRuA5WlUnqYPzabo0Yf2EgW';
const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';

console.log('🔍 Debug API Connection...');
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length);
console.log('API Key preview:', apiKey?.substring(0, 10) + '...');
console.log('Model target:', model);

const testData = {
  model,
  messages: [
    {
      role: 'user',
      content: 'Xin chào, hãy trả về JSON: {"test": "success"}'
    }
  ],
  max_tokens: 100,
  temperature: 0.3
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'api.openai.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📡 Making API request...');

const req = https.request(options, (res) => {
  console.log('📡 Response status:', res.statusCode);
  console.log('📡 Response headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📡 Response data:', data);
    
    if (res.statusCode === 200) {
      console.log('✅ API connection successful!');
    } else {
      console.log('❌ API connection failed!');
      console.log('Error details:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error);
});

req.write(postData);
req.end();
