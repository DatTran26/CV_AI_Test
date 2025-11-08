// Test Improved AI Service
import OpenAI from 'openai';
import fs from 'fs';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY || 'sk-proj-D4QtCbKKkxHhwRuA5WlUnqYPzabo0Yf2EgW';
const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';

console.log('🔍 Testing Improved AI Service...');
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length);
console.log('API Key preview:', apiKey?.substring(0, 10) + '...');
console.log('Model target:', model);

async function testImprovedAI() {
  try {
    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: apiKey
    });
    
    console.log('📤 Testing text-based approach...');
    
    // Create a test CV content
    const cvContent = `
Nguyễn Văn A
Email: nguyenvana@email.com
Phone: 0123456789

KINH NGHIỆM LÀM VIỆC:
- Frontend Developer tại ABC Company (2020-2023)
  + Phát triển ứng dụng web với React, JavaScript
  + Tối ưu hóa performance, tăng tốc độ load 40%
  + Làm việc với team 5 người, mentor junior developers

- React Developer tại XYZ Corp (2018-2020)
  + Xây dựng SPA với React, Redux
  + Tích hợp API RESTful services
  + Code review và mentoring

KỸ NĂNG:
- Frontend: React, JavaScript, HTML5, CSS3, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB, MySQL
- Tools: Git, Docker, AWS
- Languages: English (TOEIC 850)

HỌC VẤN:
- Đại học Công nghệ Thông tin (2014-2018)
- Chứng chỉ AWS Cloud Practitioner
- Khóa học React Advanced (2020)
    `;
    
    console.log('📄 CV content created, length:', cvContent.length);
    
    // Test chat completion with improved prompt
    console.log('🤖 Testing chat completion with improved approach...');
    
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: `Bạn là chuyên gia HR với 15 năm kinh nghiệm. Phân tích CV và trả về JSON format.

QUAN TRỌNG: 
- CHỈ trả về JSON, không thêm text khác
- Phân tích dựa trên nội dung CV thực tế
- Điểm số phải chính xác (không được 0 nếu CV có nội dung)
- Đưa ra gợi ý vai trò phù hợp dựa trên kỹ năng trong CV

ĐỊNH DẠNG JSON BẮT BUỘC:
{
  "overallScore": 85,
  "scores": [
    {"category": "Cấu trúc", "value": 20, "description": "CV có cấu trúc rõ ràng"},
    {"category": "Nội dung", "value": 25, "description": "Nội dung đầy đủ thông tin"},
    {"category": "Định dạng", "value": 18, "description": "Định dạng chuyên nghiệp"},
    {"category": "Chuyên nghiệp", "value": 15, "description": "Thể hiện tính chuyên nghiệp"},
    {"category": "Kỹ năng chuyên ngành", "value": 7, "description": "Kỹ năng phù hợp"}
  ],
  "strengths": [
    {"title": "Thông tin liên hệ rõ ràng", "description": "CV có đầy đủ thông tin liên hệ"},
    {"title": "Kinh nghiệm được mô tả chi tiết", "description": "Các vị trí công việc được mô tả với thành tích cụ thể"}
  ],
  "improvements": [
    {"title": "Thiếu từ khóa quan trọng", "description": "CV cần bổ sung thêm từ khóa liên quan đến vị trí ứng tuyển", "suggestion": "Nghiên cứu job description và thêm các từ khóa phù hợp"}
  ],
  "detailedAnalysis": "CV của bạn thể hiện một hồ sơ chuyên nghiệp với kinh nghiệm làm việc đa dạng. Tuy nhiên, có một số điểm cần cải thiện để tối ưu hóa cơ hội được tuyển dụng.",
  "recommendations": [
    {"title": "Bổ sung từ khóa kỹ thuật", "description": "Thêm các từ khóa kỹ thuật liên quan đến vị trí ứng tuyển"}
  ],
  "suggestedRoles": [
    {
      "industry": "Công nghệ thông tin",
      "roles": [
        {"name": "Frontend Developer", "match": 85, "reason": "Có kinh nghiệm với React và JavaScript", "level": "senior"},
        {"name": "Full Stack Developer", "match": 78, "reason": "Có kỹ năng cả frontend và backend", "level": "senior"}
      ]
    }
  ],
  "topMatch": {"name": "Frontend Developer", "match": 85, "reason": "Phù hợp nhất với kinh nghiệm hiện tại", "level": "senior"},
  "analysisSummary": "CV thể hiện hồ sơ chuyên nghiệp với tiềm năng phát triển tốt trong lĩnh vực công nghệ thông tin."
}

CHỈ trả về JSON, không thêm text khác.`
        },
        {
          role: 'user',
          content: `Hãy phân tích CV sau và tự động gợi ý các vai trò phù hợp nhất dựa trên kinh nghiệm và kỹ năng. Đưa ra góp ý chi tiết theo format JSON:\n\n${cvContent}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.3
    });
    
    console.log('📡 Response received');
    console.log('🤖 AI Response length:', response.choices[0].message.content.length);
    console.log('🤖 AI Response preview:', response.choices[0].message.content.substring(0, 200) + '...');
    
    // Test JSON parsing
    try {
      const jsonMatch = response.choices[0].message.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log('✅ JSON parsed successfully');
        console.log('📊 Parsed data overview:', {
          overallScore: parsedData.overallScore,
          scoresCount: parsedData.scores?.length || 0,
          strengthsCount: parsedData.strengths?.length || 0,
          improvementsCount: parsedData.improvements?.length || 0
        });
        
        if (parsedData.overallScore > 0) {
          console.log('✅ AI analysis successful with non-zero scores');
        } else {
          console.warn('⚠️ Warning: AI returned zero scores');
        }
      } else {
        console.log('⚠️ No JSON found in response');
      }
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
    }
    
    console.log('✅ Improved AI service test successful!');
    
  } catch (error) {
    console.error('❌ Improved AI service test failed:', error);
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
    } else if (error.status === 429) {
      console.log('🔍 Error Analysis: Rate limit exceeded');
      console.log('💡 Solution: Wait and retry or reduce content size');
    }
  }
}

testImprovedAI();
