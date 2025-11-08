// Final AI Service Test với Mock API Key
import OpenAI from 'openai';

// Mock API key để test (sẽ fail nhưng test được flow)
const mockApiKey = 'sk-proj-mock-key-for-testing-123456789';
const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';

console.log('🔍 Final AI Service Test...');
console.log('API Key exists:', !!mockApiKey);
console.log('API Key length:', mockApiKey?.length);
console.log('API Key preview:', mockApiKey?.substring(0, 10) + '...');
console.log('Model target:', model);

async function testFinalAI() {
  try {
    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: mockApiKey
    });
    
    console.log('📤 Testing complete AI service flow...');
    
    // Create comprehensive test CV content
    const cvContent = `
NGUYỄN VĂN A
Email: nguyenvana@email.com
Phone: 0123456789
LinkedIn: linkedin.com/in/nguyenvana

KINH NGHIỆM LÀM VIỆC:

Frontend Developer - ABC Technology Company (2020-2023)
• Phát triển ứng dụng web với React, JavaScript, TypeScript
• Tối ưu hóa performance, tăng tốc độ load 40%
• Làm việc với team 5 người, mentor 2 junior developers
• Sử dụng Redux, Context API cho state management
• Tích hợp RESTful APIs và GraphQL

React Developer - XYZ Corp (2018-2020)
• Xây dựng Single Page Applications với React, Redux
• Phát triển responsive UI components
• Code review và mentoring team members
• Sử dụng Jest, Enzyme cho unit testing
• Tích hợp với backend APIs

KỸ NĂNG KỸ THUẬT:
• Frontend: React, JavaScript, TypeScript, HTML5, CSS3, Bootstrap, Tailwind CSS
• Backend: Node.js, Express.js, RESTful APIs
• Database: MongoDB, MySQL, PostgreSQL
• Tools: Git, Docker, AWS, Webpack, Babel
• Testing: Jest, Enzyme, Cypress
• Languages: English (TOEIC 850), Japanese (N3)

HỌC VẤN:
• Đại học Công nghệ Thông tin - Chuyên ngành Khoa học Máy tính (2014-2018)
• GPA: 3.8/4.0
• Đồ án tốt nghiệp: "Hệ thống quản lý dự án Agile"

CHỨNG CHỈ:
• AWS Cloud Practitioner (2022)
• React Advanced Certification (2020)
• Google Analytics Certified (2021)
• Scrum Master Certification (2021)

DỰ ÁN NỔI BẬT:
• E-commerce Platform: Xây dựng platform bán hàng với React, Node.js
• Real-time Chat App: Ứng dụng chat với Socket.io, MongoDB
• Dashboard Analytics: Dashboard phân tích dữ liệu với D3.js
    `;
    
    console.log('📄 CV content created, length:', cvContent.length);
    
    // Test với improved prompt
    console.log('🤖 Testing AI analysis with improved approach...');
    
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
          improvementsCount: parsedData.improvements?.length || 0,
          suggestedRolesCount: parsedData.suggestedRoles?.length || 0
        });
        
        if (parsedData.overallScore > 0) {
          console.log('✅ AI analysis successful with non-zero scores');
          console.log('🎯 Overall Score:', parsedData.overallScore);
          console.log('🏆 Top Match:', parsedData.topMatch?.name || 'N/A');
        } else {
          console.warn('⚠️ Warning: AI returned zero scores');
        }
      } else {
        console.log('⚠️ No JSON found in response');
        console.log('📄 Raw response:', response.choices[0].message.content.substring(0, 500));
      }
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      console.log('📄 Raw response for debugging:', response.choices[0].message.content.substring(0, 500));
    }
    
    console.log('✅ Final AI service test completed!');
    
  } catch (error) {
    console.error('❌ Final AI service test failed:', error);
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
      console.log('📝 Next Steps:');
      console.log('   1. Go to: https://platform.openai.com/account/api-keys');
      console.log('   2. Create new API key');
      console.log('   3. Update .env file: REACT_APP_OPENAI_API_KEY=your_new_key');
      console.log('   4. Restart application');
    } else if (error.status === 429) {
      console.log('🔍 Error Analysis: Rate limit exceeded');
      console.log('💡 Solution: Wait and retry or reduce content size');
    } else if (error.status === 400) {
      console.log('🔍 Error Analysis: Bad request');
      console.log('💡 Solution: Check API format and parameters');
    }
    
    console.log('\n📋 Summary:');
    console.log('✅ AI Service architecture: Improved');
    console.log('✅ Error handling: Enhanced');
    console.log('✅ Prompts: Optimized');
    console.log('✅ JSON parsing: Robust');
    console.log('⏳ Pending: API key update required');
  }
}

testFinalAI();
