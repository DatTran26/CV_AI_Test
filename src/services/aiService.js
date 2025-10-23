// File validation constants
const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_FILE_SIZE = 1024; // 1KB

// Cache for API responses
const responseCache = new Map();

// File validation function
const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'Không có file được chọn' };
  }
  
  if (file.size < MIN_FILE_SIZE) {
    return { valid: false, error: 'File quá nhỏ. Vui lòng chọn file có kích thước ít nhất 1KB' };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File quá lớn. Vui lòng chọn file có kích thước tối đa 10MB' };
  }
  
  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Định dạng file không được hỗ trợ. Vui lòng chọn file PDF, DOC, DOCX hoặc TXT' };
  }
  
  return { valid: true };
};

// AI service với tích hợp OpenAI
export const analyzeCV = async (file, selectedIndustry = null, selectedRole = null) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  console.log('🔍 Starting CV analysis process...');
  console.log('🔍 API Key exists:', !!apiKey);
  console.log('🔍 Selected Industry:', selectedIndustry?.name || 'Auto');
  console.log('🔍 Selected Role:', selectedRole?.name || 'Auto');
  
  // Validate file
  const validationResult = validateFile(file);
  if (!validationResult.valid) {
    throw new Error(validationResult.error);
  }
  
  // Check cache first
  const cacheKey = `${file.name}_${file.size}_${selectedIndustry?.id || 'auto'}_${selectedRole?.id || 'auto'}`;
  if (responseCache.has(cacheKey)) {
    console.log('📋 Using cached response');
    return responseCache.get(cacheKey);
  }
  
  // Nếu có API key, sử dụng AI thực tế
  if (apiKey && apiKey !== 'your_openai_api_key_here') {
    try {
      console.log('🚀 Using AI API for analysis...');
      const result = await analyzeCVWithAIRetry(file, apiKey, selectedIndustry, selectedRole);
      console.log('✅ AI analysis completed successfully');
      
      // Cache the result
      responseCache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('❌ AI API Error:', error);
      console.log('🔄 Falling back to mock data...');
      
      // Thêm thông tin về lỗi vào mock data
      const mockData = await getMockAnalysisData(selectedIndustry, selectedRole);
      return {
        ...mockData,
        analysisSummary: `Phân tích bằng AI thất bại (${error.message}). Đang sử dụng dữ liệu mẫu.`,
        detailedAnalysis: `Phân tích thực tế không khả dụng do lỗi API: ${error.message}. Dữ liệu hiển thị là mẫu để demo.`
      };
    }
  }
  
  // Nếu không có API key, sử dụng mock data
  console.log('📝 Using mock data - Please add REACT_APP_OPENAI_API_KEY to .env');
  return await getMockAnalysisData(selectedIndustry, selectedRole);
};

// Mock data function với phân tích theo chuyên ngành
const getMockAnalysisData = async (selectedIndustry = null, selectedRole = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Generate industry-specific analysis
  const industryAnalysis = generateIndustrySpecificAnalysis(selectedIndustry, selectedRole);
  
  // Generate role suggestions if no specific role selected
  const roleSuggestions = selectedRole ? [] : generateRoleSuggestions();
  
  // Mock data với nội dung tốt hơn
  const mockAnalysisData = {
    overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
    scores: [
      {
        category: "Cấu trúc",
        value: Math.floor(Math.random() * 20) + 75,
        description: "Bố cục và sắp xếp thông tin rõ ràng, logic"
      },
      {
        category: "Nội dung",
        value: Math.floor(Math.random() * 20) + 70,
        description: "Thông tin đầy đủ và từ khóa phù hợp"
      },
      {
        category: "Định dạng",
        value: Math.floor(Math.random() * 20) + 80,
        description: "Trình bày chuyên nghiệp và dễ đọc"
      },
      {
        category: "Chuyên nghiệp",
        value: Math.floor(Math.random() * 20) + 75,
        description: "Thể hiện tính chuyên nghiệp cao"
      }
    ],
    strengths: [
      {
        title: "Thông tin liên hệ rõ ràng",
        description: "CV có đầy đủ thông tin liên hệ và dễ tìm thấy"
      },
      {
        title: "Kinh nghiệm được mô tả chi tiết",
        description: "Các vị trí công việc được mô tả với thành tích cụ thể"
      },
      {
        title: "Trình độ học vấn phù hợp",
        description: "Bằng cấp và chứng chỉ được trình bày logic"
      }
    ],
    improvements: [
      {
        title: "Thiếu từ khóa quan trọng",
        description: "CV cần bổ sung thêm từ khóa liên quan đến vị trí ứng tuyển",
        suggestion: "Nghiên cứu job description và thêm các từ khóa phù hợp"
      },
      {
        title: "Khoảng trống trong lịch sử công việc",
        description: "Có khoảng thời gian không có hoạt động được giải thích",
        suggestion: "Thêm thông tin về các hoạt động trong thời gian này"
      },
      {
        title: "Thiếu kỹ năng kỹ thuật",
        description: "CV cần bổ sung thêm kỹ năng kỹ thuật liên quan",
        suggestion: "Thêm section kỹ năng với các công nghệ và công cụ"
      }
    ],
    detailedAnalysis: `CV của bạn thể hiện một hồ sơ chuyên nghiệp với kinh nghiệm làm việc đa dạng. Tuy nhiên, có một số điểm cần cải thiện để tối ưu hóa cơ hội được tuyển dụng.

ĐIỂM MẠNH NỔI BẬT:
✅ Cấu trúc CV rõ ràng và dễ đọc
✅ Kinh nghiệm làm việc được trình bày theo thứ tự thời gian logic
✅ Thông tin liên hệ đầy đủ và chính xác
✅ Trình độ học vấn phù hợp với vị trí ứng tuyển

NHỮNG ĐIỂM CẦN CẢI THIỆN:
⚠️ Cần bổ sung thêm từ khóa liên quan đến vị trí ứng tuyển
⚠️ Mô tả thành tích cần cụ thể hơn với số liệu
⚠️ Thiếu thông tin về các dự án quan trọng đã tham gia
⚠️ Cần thêm kỹ năng mềm và kỹ năng kỹ thuật

KHUYẾN NGHỊ CẢI THIỆN:
1. Tùy chỉnh CV cho từng vị trí ứng tuyển cụ thể
2. Sử dụng các từ khóa từ job description
3. Thêm các thành tích được đo lường bằng số liệu cụ thể
4. Bổ sung thông tin về dự án và thành tựu nổi bật
5. Cập nhật kỹ năng và chứng chỉ mới nhất`,
    recommendations: [
      {
        title: "Tùy chỉnh CV cho từng vị trí",
        description: "Điều chỉnh nội dung CV phù hợp với yêu cầu của từng công ty"
      },
      {
        title: "Bổ sung từ khóa quan trọng",
        description: "Nghiên cứu và thêm các từ khóa liên quan đến ngành nghề"
      },
      {
        title: "Cải thiện mô tả thành tích",
        description: "Sử dụng số liệu cụ thể để mô tả thành tích"
      },
      {
        title: "Kiểm tra lỗi chính tả",
        description: "Đọc lại CV nhiều lần để đảm bảo không có lỗi chính tả"
      }
    ]
  };

  return {
    ...mockAnalysisData,
    ...industryAnalysis,
    ...roleSuggestions
  };
};

// Retry logic for API calls
const analyzeCVWithAIRetry = async (file, apiKey, selectedIndustry = null, selectedRole = null, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries}`);
      return await analyzeCVWithAI(file, apiKey, selectedIndustry, selectedRole);
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

// Hàm thực tế để tích hợp với AI API (OpenAI)
export const analyzeCVWithAI = async (file, apiKey, selectedIndustry = null, selectedRole = null) => {
  try {
    console.log('📁 Starting CV analysis...');
    console.log('📁 File name:', file.name);
    console.log('📁 File size:', file.size);
    console.log('📁 File type:', file.type);
    
    // Import OpenAI SDK dynamically
    const { default: OpenAI } = await import('openai');
    
    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for browser environment
    });
    
    console.log('📤 Processing file content...');
    console.log('📊 Processing progress: 0%');
    
    // Read file content
    let fileContent;
    try {
      fileContent = await readFileContent(file);
      console.log('✅ File content read successfully');
      console.log('📊 Processing progress: 50%');
    } catch (fileError) {
      console.error('❌ File read error:', fileError);
      throw new Error('Không thể đọc được nội dung file CV. Vui lòng kiểm tra file và thử lại.');
    }
    
    // Truncate content để tránh rate limit
    let truncatedContent = fileContent;
    const MAX_CONTENT_LENGTH = 50000;
    if (fileContent.length > MAX_CONTENT_LENGTH) {
      console.log('⚠️ Content too long, truncating to avoid rate limit');
      truncatedContent = fileContent.substring(0, MAX_CONTENT_LENGTH) + '\n\n[Content truncated to avoid rate limit]';
      console.log('📄 Truncated content length:', truncatedContent.length);
    }
    
    console.log('📊 Processing progress: 100%');
    console.log('✅ File content processed successfully');
    
    // Gọi OpenAI API với text content
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: selectedRole 
            ? createSpecificRolePrompt(selectedIndustry, selectedRole)
            : createAutoAnalysisPrompt()
        },
        {
          role: 'user',
          content: selectedRole 
            ? `Hãy phân tích CV sau cho vị trí ${selectedRole?.name || 'chung'} trong ngành ${selectedIndustry?.name || 'tổng quát'} và đưa ra góp ý chi tiết theo format JSON:\n\n${truncatedContent}`
            : `Hãy đọc CV sau và tự động gợi ý các vai trò phù hợp nhất dựa trên kinh nghiệm và kỹ năng. Đưa ra góp ý chi tiết theo format JSON:\n\n${truncatedContent}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.3
    });

    console.log('📡 API Response received');
    console.log('📡 Response data keys:', Object.keys(response));
    
    const aiResponse = response.choices[0].message.content;
    console.log('🤖 AI Response received, length:', aiResponse.length);
    
    // Parse JSON response từ AI sử dụng hàm parseAIResponse
    return parseAIResponse(aiResponse);
  } catch (error) {
    console.error('Error calling AI API:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      response: error.response
    });
    
    // Enhanced error handling with specific error types
    if (error.status === 401) {
      throw new Error('API key không hợp lệ. Vui lòng kiểm tra cấu hình API key.');
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Vui lòng thử lại sau.');
    } else if (error.status === 413) {
      throw new Error('File quá lớn. Vui lòng chọn file nhỏ hơn.');
    } else if (error.status === 400) {
      throw new Error('Lỗi API request. Vui lòng kiểm tra file và thử lại.');
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      throw new Error('Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.');
    } else if (error.message.includes('timeout')) {
      throw new Error('Request timeout. Vui lòng thử lại.');
    } else {
      throw new Error(`Lỗi API: ${error.message}`);
    }
  }
};

// Helper function để đọc nội dung file
const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result;
      console.log('📄 File content length:', content.length);
      console.log('📄 File content preview:', content.substring(0, 200) + '...');
      
      if (!content || content.trim().length === 0) {
        reject(new Error('File is empty or cannot be read'));
        return;
      }
      
      // Truncate content để tránh rate limit (giới hạn ~50,000 characters)
      const MAX_CONTENT_LENGTH = 50000;
      if (content.length > MAX_CONTENT_LENGTH) {
        console.log('⚠️ Content too long, truncating to avoid rate limit');
        content = content.substring(0, MAX_CONTENT_LENGTH) + '\n\n[Content truncated to avoid rate limit]';
        console.log('📄 Truncated content length:', content.length);
      }
      
      resolve(content);
    };
    reader.onerror = (e) => {
      console.error('❌ File read error:', e);
      reject(new Error('Cannot read file content'));
    };
    reader.readAsText(file);
  });
};

// Helper function để parse response từ AI
const parseAIResponse = (aiResponse) => {
  console.log('🤖 AI Response length:', aiResponse.length);
  console.log('🤖 AI Response preview:', aiResponse.substring(0, 300) + '...');
  
  try {
    // Tìm JSON trong response - cải thiện regex để tìm JSON tốt hơn
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      console.log('📋 Found JSON, length:', jsonStr.length);
      
      const parsedData = JSON.parse(jsonStr);
      console.log('✅ JSON parsed successfully');
      console.log('📊 Parsed data overview:', {
        overallScore: parsedData.overallScore,
        scoresCount: parsedData.scores?.length || 0,
        strengthsCount: parsedData.strengths?.length || 0,
        improvementsCount: parsedData.improvements?.length || 0
      });
      
      // Validate và clean data với kiểm tra kỹ hơn
      const cleanedData = {
        overallScore: Math.max(0, Math.min(100, parsedData.overallScore || 0)),
        scores: Array.isArray(parsedData.scores) ? parsedData.scores.map(score => ({
          category: score.category || "Không xác định",
          value: Math.max(0, Math.min(100, score.value || 0)),
          description: score.description || "Không có mô tả"
        })) : [],
        strengths: Array.isArray(parsedData.strengths) ? parsedData.strengths.map(strength => ({
          title: strength.title || "Điểm mạnh",
          description: strength.description || "Không có mô tả"
        })) : [],
        improvements: Array.isArray(parsedData.improvements) ? parsedData.improvements.map(improvement => ({
          title: improvement.title || "Cần cải thiện",
          description: improvement.description || "Không có mô tả",
          suggestion: improvement.suggestion || "Không có gợi ý"
        })) : [],
        detailedAnalysis: parsedData.detailedAnalysis || "Phân tích chi tiết không khả dụng",
        recommendations: Array.isArray(parsedData.recommendations) ? parsedData.recommendations.map(rec => ({
          title: rec.title || "Khuyến nghị",
          description: rec.description || "Không có mô tả"
        })) : [],
        certifications: Array.isArray(parsedData.certifications) ? parsedData.certifications.map(cert => ({
          name: cert.name || "Chứng chỉ",
          description: cert.description || "Không có mô tả",
          priority: cert.priority || "medium"
        })) : [],
        activities: Array.isArray(parsedData.activities) ? parsedData.activities.map(activity => ({
          name: activity.name || "Hoạt động",
          description: activity.description || "Không có mô tả",
          type: activity.type || "online"
        })) : [],
        missingSkills: Array.isArray(parsedData.missingSkills) ? parsedData.missingSkills.map(skill => ({
          skill: skill.skill || "Kỹ năng",
          description: skill.description || "Không có mô tả",
          importance: skill.importance || "medium"
        })) : [],
        suggestedRoles: Array.isArray(parsedData.suggestedRoles) ? parsedData.suggestedRoles : [],
        topMatch: parsedData.topMatch || null,
        analysisSummary: parsedData.analysisSummary || "",
        expertLevel: parsedData.expertLevel || "entry",
        industryFit: parsedData.industryFit || "phù hợp một phần"
      };
      
      console.log('✅ Data cleaned and validated successfully');
      console.log('📊 Final cleaned data:', {
        overallScore: cleanedData.overallScore,
        scoresCount: cleanedData.scores.length,
        strengthsCount: cleanedData.strengths.length,
        improvementsCount: cleanedData.improvements.length
      });
      
      // Kiểm tra nếu tất cả điểm đều 0
      if (cleanedData.overallScore === 0 && cleanedData.scores.every(score => score.value === 0)) {
        console.warn('⚠️ All scores are 0 - AI might not have read CV content properly');
        console.log('🔍 AI Response preview:', aiResponse.substring(0, 500));
      }
      
      return cleanedData;
    } else {
      console.log('⚠️ No JSON found in AI response');
      // Nếu không tìm thấy JSON, trả về fallback response với mock data
      return {
        overallScore: 0,
        scores: [
          { category: "Cấu trúc", value: 0, description: "Không thể đánh giá" },
          { category: "Nội dung", value: 0, description: "Không thể đánh giá" },
          { category: "Định dạng", value: 0, description: "Không thể đánh giá" },
          { category: "Chuyên nghiệp", value: 0, description: "Không thể đánh giá" }
        ],
        strengths: [
          { title: "Không thể phân tích", description: "AI không thể đọc được nội dung CV" }
        ],
        improvements: [
          { title: "Kiểm tra file", description: "Đảm bảo file CV có nội dung text rõ ràng", suggestion: "Thử với file .txt format" }
        ],
        detailedAnalysis: "Không thể phân tích chi tiết do nội dung CV không thể đọc được. Vui lòng thử lại với file CV khác hoặc kiểm tra định dạng file.",
        recommendations: [
          { title: "Kiểm tra file", description: "Đảm bảo file CV có nội dung text" },
          { title: "Thử format khác", description: "Chuyển đổi sang .txt format" }
        ],
        certifications: [],
        activities: [],
        missingSkills: [],
        suggestedRoles: [],
        topMatch: null,
        analysisSummary: "Lỗi phân tích: AI không thể đọc được nội dung CV. Vui lòng kiểm tra file và thử lại.",
        expertLevel: "entry",
        industryFit: "không xác định"
      };
    }
  } catch (error) {
    console.error('❌ Error parsing AI response:', error);
    // Fallback nếu parse lỗi với mock data
    return {
      overallScore: 0,
      scores: [
        { category: "Cấu trúc", value: 0, description: "Lỗi phân tích" },
        { category: "Nội dung", value: 0, description: "Lỗi phân tích" },
        { category: "Định dạng", value: 0, description: "Lỗi phân tích" },
        { category: "Chuyên nghiệp", value: 0, description: "Lỗi phân tích" }
      ],
      strengths: [
        { title: "Lỗi phân tích", description: "Không thể xử lý phản hồi từ AI" }
      ],
      improvements: [
        { title: "Thử lại", description: "Vui lòng thử lại với file CV khác", suggestion: "Kiểm tra kết nối mạng và thử lại" }
      ],
      detailedAnalysis: "Lỗi phân tích: Không thể xử lý phản hồi từ AI. Vui lòng thử lại hoặc kiểm tra kết nối mạng.",
      recommendations: [
        { title: "Kiểm tra kết nối", description: "Đảm bảo kết nối mạng ổn định" },
        { title: "Thử lại", description: "Thử lại với file CV khác" }
      ],
      certifications: [],
      activities: [],
      missingSkills: [],
      suggestedRoles: [],
      topMatch: null,
      analysisSummary: "Lỗi phân tích: Không thể parse JSON response. Vui lòng thử lại.",
      expertLevel: "entry",
      industryFit: "không xác định"
    };
  }
};

// Hàm tạo phân tích theo chuyên ngành
const generateIndustrySpecificAnalysis = (selectedIndustry, selectedRole) => {
  if (!selectedIndustry || !selectedRole) {
    return {};
  }

  const industryData = {
    tech: {
      certifications: [
        { name: "AWS Certified Solutions Architect", description: "Chứng chỉ kiến trúc giải pháp AWS", priority: "high" },
        { name: "Google Cloud Professional", description: "Chứng chỉ chuyên nghiệp Google Cloud", priority: "high" },
        { name: "Microsoft Azure Fundamentals", description: "Chứng chỉ cơ bản Azure", priority: "medium" },
        { name: "Certified Kubernetes Administrator", description: "Chứng chỉ quản trị Kubernetes", priority: "high" },
        { name: "PMP Certification", description: "Chứng chỉ quản lý dự án chuyên nghiệp", priority: "medium" }
      ],
      activities: [
        { name: "Hackathon tham gia", description: "Tham gia các cuộc thi lập trình", type: "offline" },
        { name: "Open Source Contribution", description: "Đóng góp vào các dự án mã nguồn mở", type: "online" },
        { name: "Tech Meetup", description: "Tham gia các buổi gặp mặt công nghệ", type: "offline" },
        { name: "Online Coding Bootcamp", description: "Khóa học lập trình trực tuyến", type: "online" }
      ],
      missingSkills: [
        { skill: "Cloud Computing", description: "Kỹ năng điện toán đám mây", importance: "high" },
        { skill: "DevOps", description: "Kỹ năng DevOps và CI/CD", importance: "high" },
        { skill: "Microservices", description: "Kiến trúc microservices", importance: "medium" },
        { skill: "Security", description: "Bảo mật ứng dụng", importance: "high" }
      ]
    },
    design: {
      certifications: [
        { name: "Adobe Certified Expert", description: "Chứng chỉ chuyên gia Adobe", priority: "high" },
        { name: "Google UX Design Certificate", description: "Chứng chỉ thiết kế UX Google", priority: "high" },
        { name: "Figma Master", description: "Chứng chỉ thành thạo Figma", priority: "medium" },
        { name: "Design Thinking", description: "Tư duy thiết kế", priority: "medium" }
      ],
      activities: [
        { name: "Design Portfolio Review", description: "Đánh giá portfolio thiết kế", type: "online" },
        { name: "Design Workshop", description: "Workshop thiết kế", type: "offline" },
        { name: "Creative Challenge", description: "Thử thách sáng tạo", type: "online" }
      ],
      missingSkills: [
        { skill: "User Research", description: "Nghiên cứu người dùng", importance: "high" },
        { skill: "Prototyping", description: "Tạo mẫu thử nghiệm", importance: "high" },
        { skill: "Accessibility", description: "Thiết kế tiếp cận", importance: "medium" }
      ]
    },
    finance: {
      certifications: [
        { name: "CFA (Chartered Financial Analyst)", description: "Chuyên gia phân tích tài chính", priority: "high" },
        { name: "CPA (Certified Public Accountant)", description: "Kế toán công chứng", priority: "high" },
        { name: "FRM (Financial Risk Manager)", description: "Quản lý rủi ro tài chính", priority: "medium" },
        { name: "Excel Advanced", description: "Excel nâng cao", priority: "medium" }
      ],
      activities: [
        { name: "Financial Modeling Course", description: "Khóa học mô hình tài chính", type: "online" },
        { name: "Investment Club", description: "Câu lạc bộ đầu tư", type: "offline" },
        { name: "Financial Analysis Workshop", description: "Workshop phân tích tài chính", type: "offline" }
      ],
      missingSkills: [
        { skill: "Financial Modeling", description: "Mô hình tài chính", importance: "high" },
        { skill: "Risk Management", description: "Quản lý rủi ro", importance: "high" },
        { skill: "Data Analysis", description: "Phân tích dữ liệu", importance: "medium" }
      ]
    }
  };

  const industryInfo = industryData[selectedIndustry.id] || industryData.tech;
  
  return {
    certifications: industryInfo.certifications,
    activities: industryInfo.activities,
    missingSkills: industryInfo.missingSkills,
    expertLevel: selectedRole.level,
    industryFit: "phù hợp một phần"
  };
};

// Hàm tạo prompt cho phân tích vai trò cụ thể
const createSpecificRolePrompt = (selectedIndustry, selectedRole) => {
  return `Bạn là chuyên gia HR. Phân tích CV cho vị trí ${selectedRole?.name || 'chung'} trong ngành ${selectedIndustry?.name || 'tổng quát'}.

QUAN TRỌNG: CHỈ trả về JSON, không thêm text khác.

ĐỊNH DẠNG JSON BẮT BUỘC:
{
  "overallScore": 85,
  "scores": [
    {"category": "Cấu trúc", "value": 20, "description": "CV có cấu trúc rõ ràng"},
    {"category": "Nội dung", "value": 25, "description": "Nội dung đầy đủ thông tin"},
    {"category": "Định dạng", "value": 18, "description": "Định dạng chuyên nghiệp"},
    {"category": "Chuyên nghiệp", "value": 15, "description": "Thể hiện tính chuyên nghiệp"},
    {"category": "Kỹ năng chuyên ngành", "value": 7, "description": "Kỹ năng phù hợp với ${selectedRole?.name}"}
  ],
  "strengths": [
    {"title": "Thông tin liên hệ rõ ràng", "description": "CV có đầy đủ thông tin liên hệ"},
    {"title": "Kinh nghiệm được mô tả chi tiết", "description": "Các vị trí công việc được mô tả với thành tích cụ thể"}
  ],
  "improvements": [
    {"title": "Thiếu từ khóa quan trọng", "description": "CV cần bổ sung thêm từ khóa liên quan đến vị trí ${selectedRole?.name}", "suggestion": "Nghiên cứu job description và thêm các từ khóa phù hợp"}
  ],
  "detailedAnalysis": "CV của bạn thể hiện một hồ sơ chuyên nghiệp với kinh nghiệm làm việc đa dạng. Tuy nhiên, có một số điểm cần cải thiện để tối ưu hóa cơ hội được tuyển dụng cho vị trí ${selectedRole?.name}.",
  "recommendations": [
    {"title": "Bổ sung từ khóa kỹ thuật", "description": "Thêm các từ khóa kỹ thuật liên quan đến vị trí ${selectedRole?.name}"}
  ],
  "certifications": [
    {"name": "Chứng chỉ ${selectedRole?.name}", "description": "Chứng chỉ chuyên môn phù hợp với vị trí", "priority": "high"}
  ],
  "activities": [
    {"name": "Tham gia workshop ${selectedRole?.name}", "description": "Hoạt động nâng cao kỹ năng chuyên môn", "type": "workshop"}
  ],
  "missingSkills": [
    {"skill": "Kỹ năng chuyên môn cho ${selectedRole?.name}", "description": "Kỹ năng cần bổ sung cho vị trí", "importance": "high"}
  ],
  "expertLevel": "senior",
  "industryFit": "phù hợp"
}

CHỈ trả về JSON, không thêm text khác.`;
};

// Hàm tạo prompt cho phân tích tự động
const createAutoAnalysisPrompt = () => {
  return `Bạn là chuyên gia HR với 15 năm kinh nghiệm. Phân tích CV và trả về JSON format.

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

CHỈ trả về JSON, không thêm text khác.`;
};

// Hàm tạo gợi ý vai trò dựa trên CV
const generateRoleSuggestions = () => {
  const roleSuggestions = [
    {
      industry: "Công nghệ thông tin",
      roles: [
        {
          name: "Frontend Developer",
          match: 85,
          reason: "CV có kinh nghiệm với React, JavaScript và UI/UX",
          level: "senior"
        },
        {
          name: "Full Stack Developer", 
          match: 78,
          reason: "Có kỹ năng cả frontend và backend, phù hợp với vị trí full-stack",
          level: "senior"
        },
        {
          name: "DevOps Engineer",
          match: 65,
          reason: "Có kinh nghiệm với Docker và CI/CD, cần bổ sung thêm kỹ năng cloud",
          level: "entry"
        }
      ]
    },
    {
      industry: "Thiết kế & Sáng tạo",
      roles: [
        {
          name: "UI/UX Designer",
          match: 82,
          reason: "Có portfolio thiết kế đẹp và kinh nghiệm với Figma",
          level: "senior"
        },
        {
          name: "Product Designer",
          match: 75,
          reason: "Hiểu về user research và có tư duy sản phẩm",
          level: "senior"
        }
      ]
    },
    {
      industry: "Kinh doanh & Quản lý",
      roles: [
        {
          name: "Business Analyst",
          match: 80,
          reason: "Có kinh nghiệm phân tích dữ liệu và kỹ năng giao tiếp tốt",
          level: "senior"
        },
        {
          name: "Project Manager",
          match: 70,
          reason: "Có kinh nghiệm quản lý team và dự án",
          level: "senior"
        }
      ]
    }
  ];

  return {
    suggestedRoles: roleSuggestions,
    topMatch: roleSuggestions[0].roles[0],
    analysisSummary: "Dựa trên kinh nghiệm và kỹ năng trong CV, chúng tôi gợi ý các vai trò phù hợp nhất"
  };
};

// Utility functions
export const clearCache = () => {
  responseCache.clear();
  console.log('🗑️ Cache cleared');
};

export const getCacheSize = () => {
  return responseCache.size;
};

export const getSupportedFileTypes = () => {
  return SUPPORTED_FILE_TYPES;
};

export const getMaxFileSize = () => {
  return MAX_FILE_SIZE;
};

// Health check function
export const checkAIServiceHealth = async () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    return { status: 'error', message: 'API key not configured' };
  }
  
  try {
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    
    // Simple test call
    await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 10
    });
    
    return { status: 'healthy', message: 'AI service is working' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};
