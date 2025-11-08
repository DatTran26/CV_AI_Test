// Test API Format với OpenAI SDK
import OpenAI from 'openai';
import fs from 'fs';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY || 'sk-proj-D4QtCbKKkxHhwRuA5WlUnqYPzabo0Yf2EgW';
const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';

console.log('🔍 Testing API Format với OpenAI SDK...');
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length);
console.log('API Key preview:', apiKey?.substring(0, 10) + '...');
console.log('Model target:', model);

async function testAPIFormat() {
  try {
    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: apiKey
    });
    
    console.log('📤 Testing file upload...');
    
    // Create a test file
    const testContent = `
Nguyễn Văn A
Email: nguyenvana@email.com
Phone: 0123456789

KINH NGHIỆM LÀM VIỆC:
- Frontend Developer tại ABC Company (2020-2023)
- React Developer tại XYZ Corp (2018-2020)

KỸ NĂNG:
- JavaScript, React, Node.js
- HTML, CSS, Bootstrap
- Git, Docker

HỌC VẤN:
- Đại học Công nghệ Thông tin (2014-2018)
- Chứng chỉ AWS Cloud Practitioner
    `;
    
    // Write test file
    fs.writeFileSync('test-cv-api.txt', testContent);
    console.log('📄 Test file created');
    
    // Upload file to OpenAI
    const uploadedFile = await client.files.create({
      file: fs.createReadStream('test-cv-api.txt'),
      purpose: "user_data"
    });
    
    console.log('✅ File uploaded successfully');
    console.log('📁 File ID:', uploadedFile.id);
    console.log('📁 File name:', uploadedFile.filename);
    console.log('📁 File size:', uploadedFile.bytes);
    
    // Test chat completion with CORRECT format
    console.log('🤖 Testing chat completion with CORRECT format...');
    
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'Bạn là chuyên gia HR. Phân tích CV và trả về JSON format.'
        },
        {
          role: 'user',
          content: [
            {
              type: "file",
              file: uploadedFile.id  // CORRECT: 'file' not 'file_id'
            },
            {
              type: "text",
              text: "Hãy phân tích CV này và trả về JSON format với overallScore, scores, strengths, improvements."
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    });
    
    console.log('📡 Response received');
    console.log('🤖 AI Response:', response.choices[0].message.content);
    
    // Clean up uploaded file
    await client.files.del(uploadedFile.id);
    console.log('🗑️ File cleaned up successfully');
    
    // Clean up test file
    fs.unlinkSync('test-cv-api.txt');
    console.log('🗑️ Test file cleaned up');
    
    console.log('✅ API format test successful!');
    
  } catch (error) {
    console.error('❌ API format test failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      response: error.response
    });
    
    // Specific error analysis
    if (error.message.includes('Missing required parameter')) {
      console.log('🔍 Error Analysis: Missing required parameter in API request');
      console.log('💡 Solution: Check API format structure');
    } else if (error.message.includes('Invalid value')) {
      console.log('🔍 Error Analysis: Invalid value in API request');
      console.log('💡 Solution: Check parameter values');
    } else if (error.status === 401) {
      console.log('🔍 Error Analysis: API key invalid');
      console.log('💡 Solution: Update API key in .env file');
    }
  }
}

testAPIFormat();
