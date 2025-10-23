// Test AI Connection Script
// Chạy script này để test kết nối AI

const testAIConnection = async () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  console.log('🔍 Testing AI Connection...');
  console.log('🔍 API Key exists:', !!apiKey);
  console.log('🔍 API Key format:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found');
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    console.log('❌ No valid API key found');
    console.log('📝 Please add REACT_APP_OPENAI_API_KEY to .env file');
    return;
  }
  
  try {
    console.log('🚀 Testing OpenAI API connection...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Bạn là một chuyên gia HR. Hãy trả về JSON với format: {"test": "success", "message": "API hoạt động bình thường"}'
          },
          {
            role: 'user',
            content: 'Test API connection'
          }
        ],
        max_tokens: 100,
        temperature: 0.1
      })
    });
    
    console.log('📡 API Response Status:', response.status);
    console.log('📡 API Response OK:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error Response:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ API Response Data:', data);
    
    console.log('🎉 AI Connection successful!');
    
  } catch (error) {
    console.error('❌ API Connection Error:', error);
  }
};

// Chạy test
testAIConnection();
