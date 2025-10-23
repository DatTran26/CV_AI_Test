# 🚀 **AI Connection Test Guide**

## ✅ **Đã cải thiện prompts để AI trả về JSON chính xác**

### **Những thay đổi đã thực hiện:**

1. **Simplified Prompts**: Rút gọn prompts phức tạp thành prompts đơn giản, rõ ràng
2. **JSON Format Examples**: Cung cấp ví dụ JSON cụ thể cho AI
3. **Clear Instructions**: Nhấn mạnh "CHỈ trả về JSON, không thêm text khác"
4. **Consistent Format**: Đảm bảo format JSON nhất quán

---

## 🧪 **Test Steps:**

### **Step 1: Test API Connection**

1. **Mở browser** → `http://localhost:3000`
2. **Click "Test API"** ở header
3. **Click "Test API Connection"**
4. **Kiểm tra kết quả:**

#### **✅ Expected Success:**

```json
{
  "success": true,
  "message": "API connection successful",
  "data": {
    "model": "gpt-4o-mini",
    "response": "Xin chào! Tôi là AI assistant..."
  }
}
```

#### **❌ Expected Error:**

```json
{
  "success": false,
  "message": "API Error: [error details]"
}
```

### **Step 2: Test CV Analysis**

1. **Click "Test CV Analysis"**
2. **Nhập CV content** (hoặc để mặc định)
3. **Click "Analyze CV"**
4. **Kiểm tra kết quả:**

#### **✅ Expected Success:**

```json
{
  "overallScore": 85,
  "scores": [
    {
      "category": "Cấu trúc",
      "value": 20,
      "description": "CV có cấu trúc rõ ràng"
    },
    {
      "category": "Nội dung",
      "value": 25,
      "description": "Nội dung đầy đủ thông tin"
    },
    {
      "category": "Định dạng",
      "value": 18,
      "description": "Định dạng chuyên nghiệp"
    },
    {
      "category": "Chuyên nghiệp",
      "value": 15,
      "description": "Thể hiện tính chuyên nghiệp"
    },
    {
      "category": "Kỹ năng chuyên ngành",
      "value": 7,
      "description": "Kỹ năng phù hợp"
    }
  ],
  "strengths": [
    {
      "title": "Thông tin liên hệ rõ ràng",
      "description": "CV có đầy đủ thông tin liên hệ"
    },
    {
      "title": "Kinh nghiệm được mô tả chi tiết",
      "description": "Các vị trí công việc được mô tả với thành tích cụ thể"
    }
  ],
  "improvements": [
    {
      "title": "Thiếu từ khóa quan trọng",
      "description": "CV cần bổ sung thêm từ khóa liên quan đến vị trí ứng tuyển",
      "suggestion": "Nghiên cứu job description và thêm các từ khóa phù hợp"
    }
  ],
  "detailedAnalysis": "CV của bạn thể hiện một hồ sơ chuyên nghiệp...",
  "recommendations": [
    {
      "title": "Bổ sung từ khóa kỹ thuật",
      "description": "Thêm các từ khóa kỹ thuật liên quan đến vị trí ứng tuyển"
    }
  ],
  "suggestedRoles": [
    {
      "industry": "Công nghệ thông tin",
      "roles": [
        {
          "name": "Frontend Developer",
          "match": 85,
          "reason": "Có kinh nghiệm với React và JavaScript",
          "level": "senior"
        },
        {
          "name": "Full Stack Developer",
          "match": 78,
          "reason": "Có kỹ năng cả frontend và backend",
          "level": "senior"
        }
      ]
    }
  ],
  "topMatch": {
    "name": "Frontend Developer",
    "match": 85,
    "reason": "Phù hợp nhất với kinh nghiệm hiện tại",
    "level": "senior"
  },
  "analysisSummary": "CV thể hiện hồ sơ chuyên nghiệp với tiềm năng phát triển tốt trong lĩnh vực công nghệ thông tin."
}
```

#### **❌ Expected Error:**

```json
{
  "success": false,
  "message": "No JSON found in response"
}
```

---

## 🔍 **Debug Console Logs:**

### **Mở Developer Tools (F12) → Console**

#### **Expected Logs:**

```javascript
🔍 Starting CV analysis process...
🔍 API Key exists: true
🔍 Selected Industry: Auto
🔍 Selected Role: Auto
🚀 Using AI API for analysis...
📁 Starting CV analysis...
📁 File name: test-cv.txt
📁 File size: 1024
📁 File type: text/plain
📄 File content length: 1024
📄 File content preview: Nguyễn Văn A...
✅ File content read successfully
📡 API Response received
🤖 AI Response received, length: 1500
📋 Found JSON, length: 1500
✅ JSON parsed successfully
📊 Parsed data overview: {
  overallScore: 85,
  scoresCount: 5,
  strengthsCount: 2,
  improvementsCount: 1
}
✅ Data cleaned and validated successfully
✅ AI analysis completed successfully
```

#### **Error Logs:**

```javascript
❌ API Error Response: {"error": {"message": "You exceeded your current quota..."}}
❌ API Error: 429 - {"error": {"message": "You exceeded your current quota..."}}
❌ No JSON found in response
⚠️ Warning: All scores are zero - AI might not have read CV content properly
```

---

## 🎯 **Expected Results:**

### **Khi AI hoạt động:**

- ✅ **Overall score:** 70-100 (thay vì 0)
- ✅ **Detailed analysis:** Phân tích chi tiết từ AI
- ✅ **Strengths:** Điểm mạnh cụ thể từ CV
- ✅ **Improvements:** Gợi ý cải thiện khả thi
- ✅ **Recommendations:** Khuyến nghị chuyên nghiệp
- ✅ **Suggested Roles:** Vai trò phù hợp với điểm match

### **Khi AI fail:**

- ❌ **Fallback to mock data**
- ❌ **Error messages**
- ❌ **Sample analysis**

---

## 🚨 **Troubleshooting:**

### **Nếu vẫn thấy "No JSON found in response":**

1. **Kiểm tra API key** trong `.env`
2. **Kiểm tra quota** - có thể hết quota
3. **Kiểm tra network** - kết nối mạng
4. **Kiểm tra console logs** - xem error chi tiết

### **Nếu vẫn thấy điểm 0:**

1. **Kiểm tra file CV** - đảm bảo có nội dung
2. **Kiểm tra AI response** - xem AI có trả về gì
3. **Kiểm tra JSON parsing** - xem có parse được không

---

## 🎉 **Success Indicators:**

- ✅ **API Connection Test** → Success
- ✅ **CV Analysis Test** → JSON response
- ✅ **Overall Score** → 70-100
- ✅ **Detailed Analysis** → Specific content
- ✅ **No "No JSON found" errors**

**Bây giờ hãy test kết nối AI và upload CV để xem kết quả thực tế!** 🚀
