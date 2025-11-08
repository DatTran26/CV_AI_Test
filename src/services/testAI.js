// Test file để kiểm tra AI API
export const testAIConnection = async () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';
  
  console.log('🔍 Checking API Key...');
  console.log('API Key exists:', !!apiKey);
  console.log('API Key format:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found');
  console.log('Model target:', model);
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    console.log('❌ No valid API key found');
    return { success: false, message: 'No valid API key' };
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
        model,
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
      return { 
        success: false, 
        message: `API Error: ${response.status} - ${errorText}` 
      };
    }
    
    const data = await response.json();
    console.log('✅ API Response Data:', data);
    
    return { 
      success: true, 
      message: 'API connection successful',
      data: data
    };
    
  } catch (error) {
    console.error('❌ API Connection Error:', error);
    return { 
      success: false, 
      message: `Connection Error: ${error.message}` 
    };
  }
};

// Test với CV thực tế
export const testCVAnalysis = async (fileContent) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o';
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    return { success: false, message: 'No valid API key' };
  }
  
  try {
    console.log('🔍 Testing CV Analysis...');
    
    // Truncate CV content để tránh rate limit
    let truncatedContent = fileContent;
    const MAX_CONTENT_LENGTH = 50000;
    if (fileContent.length > MAX_CONTENT_LENGTH) {
      console.log('⚠️ Content too long, truncating to avoid rate limit');
      truncatedContent = fileContent.substring(0, MAX_CONTENT_LENGTH) + '\n\n[Content truncated to avoid rate limit]';
      console.log('📄 Truncated content length:', truncatedContent.length);
    }
    
    // Import OpenAI SDK dynamically
    const { default: OpenAI } = await import('openai');
    
    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for browser environment
    });
    
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: `Bạn là một chuyên gia HR với 15 năm kinh nghiệm. 

QUAN TRỌNG: Bạn PHẢI trả về CHÍNH XÁC định dạng JSON sau, không được thêm text khác:

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
  "detailedAnalysis": "CV của bạn thể hiện một hồ sơ chuyên nghiệp với kinh nghiệm làm việc đa dạng. Tuy nhiên, có một số điểm cần cải thiện để tối ưu hóa cơ hội được tuyển dụng."
}

CHỈ trả về JSON, không thêm text khác.`
        },
        {
          role: 'user',
          content: `Hãy phân tích CV sau:\n\n${truncatedContent}`
        }
      ],
      max_tokens: 4068,
      temperature: 0.3
    });
    
    const aiResponse = response.choices[0].message.content;
    
    console.log('🤖 AI Response:', aiResponse);
    
    // Test JSON parsing
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log('✅ JSON Parsed Successfully:', parsedData);
        return { 
          success: true, 
          message: 'CV Analysis successful',
          data: parsedData
        };
      } else {
        console.log('⚠️ No JSON found in response');
        return { 
          success: false, 
          message: 'No JSON found in AI response',
          rawResponse: aiResponse
        };
      }
    } catch (parseError) {
      console.log('❌ JSON Parse Error:', parseError);
      return { 
        success: false, 
        message: `JSON Parse Error: ${parseError.message}`,
        rawResponse: aiResponse
      };
    }
    
  } catch (error) {
    console.error('❌ CV Analysis Error:', error);
    return { 
      success: false, 
      message: `Analysis Error: ${error.message}` 
    };
  }
};
