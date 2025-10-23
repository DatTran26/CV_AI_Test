// Test OpenAI SDK
import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY || 'sk-proj-D4QtCbKKkxHhwRuA5WlUnqYPzabo0Yf2EgW';

console.log('🔍 Testing OpenAI SDK...');
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length);
console.log('API Key preview:', apiKey?.substring(0, 10) + '...');

async function testOpenAISDK() {
  try {
    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for browser environment
    });
    
    console.log('📡 Making API request with SDK...');
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'Xin chào, hãy trả về JSON: {"test": "success"}'
        }
      ],
      max_tokens: 100,
      temperature: 0.3
    });
    
    console.log('📡 Response received');
    console.log('📡 Response data keys:', Object.keys(response));
    console.log('📡 Response choices:', response.choices);
    
    const aiResponse = response.choices[0].message.content;
    console.log('🤖 AI Response:', aiResponse);
    
    console.log('✅ OpenAI SDK test successful!');
    
  } catch (error) {
    console.error('❌ OpenAI SDK test failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      response: error.response
    });
  }
}

testOpenAISDK();
