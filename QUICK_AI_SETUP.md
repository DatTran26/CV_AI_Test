# 🚀 Quick AI Setup - Kết nối AI nhanh

## ⚡ Setup trong 3 bước

### **Step 1: Tạo API Key**

1. Truy cập: https://platform.openai.com/
2. Đăng nhập/Đăng ký tài khoản
3. Click "API Keys" → "Create new secret key"
4. Copy API key (bắt đầu với `sk-`)

### **Step 2: Cấu hình .env**

```bash
# Tạo file .env
echo "REACT_APP_OPENAI_API_KEY=sk-your-actual-api-key-here" > .env
```

### **Step 3: Restart Server**

```bash
# Dừng server (Ctrl+C)
# Khởi động lại
npm start
```

## ✅ Test Connection

### **Cách 1: Test Mode**

1. Click nút **"Test API"** trong header
2. Click **"Test API Connection"**
3. Kiểm tra kết quả

### **Cách 2: Upload CV**

1. Upload file CV
2. Kiểm tra console logs
3. Xem kết quả phân tích

## 🔍 Debug

### **Kiểm tra Console Logs:**

```javascript
🔍 Starting CV analysis process...
🔍 API Key exists: true
🔍 Selected Industry: Auto
🔍 Selected Role: Auto
🚀 Using AI API for analysis...
📁 Starting CV analysis...
📁 File name: cv.txt
📁 File size: 2048
📁 File type: text/plain
📄 File content length: 2048
📄 File content preview: Nguyễn Văn A...
✅ File content read successfully
📡 API Response received
🤖 AI Response received, length: 1500
📋 Found JSON, length: 1500
✅ JSON parsed successfully
📊 Parsed data overview: {
  overallScore: 85,
  scoresCount: 5,
  strengthsCount: 3,
  improvementsCount: 3
}
✅ Data cleaned and validated successfully
✅ AI analysis completed successfully
```

### **Nếu có lỗi:**

```javascript
❌ AI API Error: [error message]
🔄 Falling back to mock data...
📝 Using mock data - Please add REACT_APP_OPENAI_API_KEY to .env
```

## 🛠️ Troubleshooting

### **Lỗi: "No valid API key"**

```bash
# Kiểm tra file .env
cat .env

# Nếu không có, tạo lại
echo "REACT_APP_OPENAI_API_KEY=sk-your-actual-api-key-here" > .env

# Restart server
npm start
```

### **Lỗi: "API Error: 401"**

- Kiểm tra API key có đúng không
- Tạo API key mới
- Cập nhật .env file

### **Lỗi: "API Error: 429"**

- Kiểm tra quota: https://platform.openai.com/usage
- Thêm payment method
- Chờ reset quota

## 📊 Expected Results

### **Khi AI hoạt động:**

- Overall score: 70-100
- Detailed analysis
- Strengths và improvements
- Recommendations

### **Khi AI fail:**

- Fallback to mock data
- Sample analysis
- Error messages

## 🎯 Success Criteria

- [ ] API key được cấu hình
- [ ] Test API connection thành công
- [ ] Upload CV và nhận kết quả AI
- [ ] Console logs hiển thị đúng
- [ ] Không có error messages

---

**Lưu ý:** Đảm bảo API key được cấu hình đúng và development server được restart sau khi thêm API key.
