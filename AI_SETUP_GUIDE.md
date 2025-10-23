# 🤖 AI Setup Guide - Kết nối AI cho CV Analysis

## 🚀 Setup AI Connection

### **Step 1: Tạo OpenAI API Key**

1. **Truy cập OpenAI Platform:**

   - Đi đến: https://platform.openai.com/
   - Đăng nhập hoặc tạo tài khoản

2. **Tạo API Key:**

   - Click "API Keys" trong menu
   - Click "Create new secret key"
   - Copy API key (bắt đầu với `sk-`)

3. **Lưu API Key:**
   - Lưu API key ở nơi an toàn
   - Không chia sẻ với ai khác

### **Step 2: Cấu hình Environment Variables**

1. **Tạo file `.env` trong thư mục gốc:**

   ```bash
   # Tạo file .env
   touch .env
   ```

2. **Thêm API key vào `.env`:**

   ```env
   REACT_APP_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Kiểm tra file `.env`:**
   ```bash
   # Xem nội dung file .env
   cat .env
   ```

### **Step 3: Restart Development Server**

```bash
# Dừng server hiện tại (Ctrl+C)
# Khởi động lại server
npm start
```

### **Step 4: Test AI Connection**

1. **Mở Browser DevTools (F12)**
2. **Click "Test API" button**
3. **Click "Test API Connection"**
4. **Kiểm tra kết quả:**

#### **Successful Connection:**

```
✅ Success
API connection successful
Response Data: {...}
```

#### **Failed Connection:**

```
❌ Failed
API Error: 401 - Unauthorized
```

## 🔧 Troubleshooting

### **Lỗi 1: "No valid API key"**

```
Nguyên nhân: Không có API key hoặc API key không đúng format
Giải pháp:
1. Kiểm tra file .env có tồn tại không
2. Đảm bảo REACT_APP_OPENAI_API_KEY=sk-...
3. Restart development server
```

### **Lỗi 2: "API Error: 401"**

```
Nguyên nhân: API key không hợp lệ hoặc hết hạn
Giải pháp:
1. Kiểm tra API key trên OpenAI dashboard
2. Tạo API key mới nếu cần
3. Cập nhật .env file
```

### **Lỗi 3: "API Error: 429"**

```
Nguyên nhân: Vượt quá rate limit hoặc quota hết
Giải pháp:
1. Kiểm tra quota: https://platform.openai.com/usage
2. Thêm payment method nếu cần
3. Chờ reset quota (hàng tháng)
```

### **Lỗi 4: "Model not found"**

```
Nguyên nhân: Model không tồn tại hoặc không có quyền truy cập
Giải pháp:
1. Sử dụng gpt-4o-mini (đã được cấu hình)
2. Kiểm tra API key có quyền truy cập model không
3. Upgrade plan nếu cần
```

## 📊 Expected Behavior

### **Khi AI Connection hoạt động:**

1. **Upload CV file:**

   ```
   📁 Starting CV analysis...
   📁 File name: cv.txt
   📁 File size: 2048
   📁 File type: text/plain
   📄 File content length: 2048
   📄 File content preview: Nguyễn Văn A...
   ✅ File content read successfully
   ```

2. **AI API Call:**

   ```
   🚀 Using AI API for analysis...
   📡 API Response received
   🤖 AI Response received, length: 1500
   🤖 AI Response preview: {"overallScore": 85...
   📋 Found JSON, length: 1500
   ✅ JSON parsed successfully
   ```

3. **Data Processing:**

   ```
   📊 Parsed data overview: {
     overallScore: 85,
     scoresCount: 5,
     strengthsCount: 3,
     improvementsCount: 3
   }
   ✅ Data cleaned and validated successfully
   ```

4. **Results Display:**
   - Overall score: 85/100
   - Detailed analysis
   - Strengths and improvements
   - Recommendations

### **Khi AI Connection fail:**

1. **Fallback to Mock Data:**

   ```
   ❌ AI API Error: [error message]
   🔄 Falling back to mock data...
   📝 Using mock data - Please add REACT_APP_OPENAI_API_KEY to .env
   ```

2. **Mock Data Display:**
   - Overall score: 70-100 (random)
   - Mock analysis
   - Sample recommendations

## 🎯 Best Practices

### **1. API Key Security:**

- Không commit API key vào git
- Sử dụng .env file
- Không chia sẻ API key

### **2. Error Handling:**

- Luôn có fallback mechanism
- Clear error messages
- User-friendly notifications

### **3. Performance:**

- Monitor API usage
- Set spending limits
- Optimize prompts

### **4. Testing:**

- Test với different file types
- Test với different CV content
- Monitor response quality

## 📋 Checklist

### **Setup Checklist:**

- [ ] OpenAI account created
- [ ] API key generated
- [ ] .env file created
- [ ] API key added to .env
- [ ] Development server restarted
- [ ] Test API connection successful

### **Usage Checklist:**

- [ ] Upload CV file
- [ ] Check console logs
- [ ] Verify AI response
- [ ] Check results quality
- [ ] Test với different files

## 🚀 Quick Start

### **1. Setup API Key:**

```bash
# Tạo file .env
echo "REACT_APP_OPENAI_API_KEY=sk-your-actual-api-key-here" > .env

# Restart server
npm start
```

### **2. Test Connection:**

```
1. Click "Test API" button
2. Click "Test API Connection"
3. Check results
```

### **3. Upload CV:**

```
1. Upload CV file
2. Check console logs
3. Verify AI analysis
```

---

**Lưu ý:** Đảm bảo API key được cấu hình đúng và development server được restart sau khi thêm API key.
