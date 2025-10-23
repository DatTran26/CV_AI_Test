# 🔑 **API Key Setup Guide - Hướng dẫn cài đặt API Key**

## 📋 **Bước 1: Tạo API Key mới**

### **1.1 Truy cập OpenAI Platform:**

```
https://platform.openai.com/account/api-keys
```

### **1.2 Tạo API Key:**

1. Click **"Create new secret key"**
2. Đặt tên: `AI-CV-Analysis-Key`
3. Chọn permissions: **Full access**
4. Click **"Create secret key"**
5. **Copy key ngay lập tức** (sẽ không hiển thị lại)

### **1.3 Lưu trữ an toàn:**

- ✅ Lưu key vào password manager
- ✅ Không chia sẻ key với ai khác
- ✅ Không commit key vào Git

---

## 📝 **Bước 2: Cập nhật .env file**

### **2.1 Tạo file .env:**

```bash
# Trong thư mục gốc của project
touch .env
```

### **2.2 Thêm API key:**

```bash
# .env file
REACT_APP_OPENAI_API_KEY=sk-proj-your_new_api_key_here
```

### **2.3 Kiểm tra format:**

```bash
# Đúng format
REACT_APP_OPENAI_API_KEY=sk-proj-abc123...

# Sai format
REACT_APP_OPENAI_API_KEY="sk-proj-abc123..."  # ❌ Không cần quotes
REACT_APP_OPENAI_API_KEY=sk-proj-abc123...   # ❌ Thiếu REACT_APP_ prefix
```

---

## 🧪 **Bước 3: Test API Key**

### **3.1 Test với script:**

```bash
# Test API connection
node test-improved-ai.js
```

### **3.2 Expected Results:**

```javascript
✅ API Key exists: true
✅ API Key length: 43
✅ File content processed successfully
✅ AI analysis successful with non-zero scores
```

### **3.3 Nếu gặp lỗi:**

```javascript
❌ 401 Incorrect API key provided
💡 Solution: Kiểm tra lại API key trong .env
```

---

## 🔍 **Bước 4: Verify trong ứng dụng**

### **4.1 Start ứng dụng:**

```bash
npm start
```

### **4.2 Test upload CV:**

1. Mở browser: `http://localhost:3000`
2. Upload file CV (PDF, DOC, TXT)
3. Kiểm tra AI analysis
4. Verify JSON response

### **4.3 Expected Results:**

- ✅ **File upload:** Success
- ✅ **AI analysis:** Non-zero scores
- ✅ **JSON response:** Valid format
- ✅ **No errors:** Clean console

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **1. API Key không hoạt động:**

```bash
# Kiểm tra format
cat .env

# Expected:
REACT_APP_OPENAI_API_KEY=sk-proj-abc123...
```

#### **2. 401 Unauthorized:**

- ✅ Kiểm tra API key có đúng không
- ✅ Đảm bảo có prefix `REACT_APP_`
- ✅ Restart ứng dụng sau khi update .env

#### **3. 429 Rate Limit:**

- ✅ Đợi vài phút rồi thử lại
- ✅ Giảm kích thước file CV
- ✅ Kiểm tra quota usage

#### **4. File không upload được:**

- ✅ Kiểm tra file format (PDF, DOC, TXT)
- ✅ Kiểm tra file size (<10MB)
- ✅ Thử với file khác

---

## 📊 **Success Checklist:**

### **✅ Pre-requisites:**

- [ ] OpenAI account có credit
- [ ] API key được tạo thành công
- [ ] .env file được cập nhật
- [ ] Ứng dụng được restart

### **✅ Testing:**

- [ ] `node test-improved-ai.js` thành công
- [ ] `npm start` chạy không lỗi
- [ ] Upload CV thành công
- [ ] AI analysis trả về scores > 0

### **✅ Production Ready:**

- [ ] API key được bảo mật
- [ ] Error handling hoạt động
- [ ] Performance đạt yêu cầu
- [ ] User experience tốt

---

## 🎯 **Next Steps:**

### **1. Sau khi setup xong:**

```bash
# Test toàn bộ flow
node test-improved-ai.js
npm start
```

### **2. Monitor performance:**

- Console logs
- Error tracking
- Response time
- Success rate

### **3. Production deployment:**

- Environment variables
- Security best practices
- Monitoring setup

---

## 📞 **Support:**

### **Nếu gặp vấn đề:**

1. **Check console logs** trong browser
2. **Verify API key** format
3. **Test với script** trước
4. **Restart ứng dụng** sau khi update .env

### **Debug commands:**

```bash
# Check .env file
cat .env

# Test API connection
node test-improved-ai.js

# Check application logs
npm start
```

**API Key setup hoàn tất! 🚀**
