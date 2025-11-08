# 🔑 **API Key Fix - Sửa lỗi API Key không hợp lệ**

## ❌ **Vấn đề đã phát hiện:**

- **Error 401:** Incorrect API key provided
- **API Key hiện tại:** `sk-proj-D4QtCbKKkxHhwRuA5WlUnqYPzabo0Yf2EgW`
- **Status:** Invalid hoặc expired

## ✅ **Giải pháp:**

### **Step 1: Tạo API Key mới**

1. **Truy cập:** https://platform.openai.com/account/api-keys
2. **Login** vào tài khoản OpenAI
3. **Click "Create new secret key"**
4. **Copy API key mới**

### **Step 2: Cập nhật .env file**

```bash
# Mở file .env
REACT_APP_OPENAI_API_KEY=your_new_api_key_here
```

### **Step 3: Restart ứng dụng**

```bash
# Stop current server (Ctrl+C)
# Restart
npm start
```

### **Step 4: Test API Connection**

1. **Mở browser** → `http://localhost:3000`
2. **Click "Test API"** → **"Test API Connection"**
3. **Kiểm tra kết quả:**

#### **✅ Expected Success:**

```json
{
  "success": true,
  "message": "API connection successful",
  "data": {
    "model": "gpt-4o",
    "response": "Xin chào! Tôi là AI assistant..."
  }
}
```

#### **❌ Expected Error:**

```json
{
  "success": false,
  "message": "API Error: 401 - Invalid API key"
}
```

---

## 🔍 **Debug Steps:**

### **1. Kiểm tra API Key format:**

- ✅ **Valid format:** `sk-proj-...` hoặc `sk-...`
- ❌ **Invalid format:** `your_openai_api_key_here`

### **2. Kiểm tra API Key permissions:**

- ✅ **Has access** to gpt-4o
- ✅ **Has quota** available
- ✅ **Not expired**

### **3. Kiểm tra .env file:**

```bash
# Đảm bảo format đúng
REACT_APP_OPENAI_API_KEY=sk-proj-your_actual_key_here

# Không có spaces
REACT_APP_OPENAI_API_KEY=sk-proj-abc123...

# Không có quotes
REACT_APP_OPENAI_API_KEY=sk-proj-abc123...
```

---

## 🧪 **Test Commands:**

### **Test API Key trực tiếp:**

```bash
# Test với curl
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'
```

### **Test trong ứng dụng:**

1. **Mở browser** → `http://localhost:3000`
2. **F12** → **Console**
3. **Click "Test API"** → **"Test API Connection"**
4. **Kiểm tra console logs**

---

## 🎯 **Expected Results:**

### **✅ Success Case:**

- **API Connection:** ✅ Success
- **CV Analysis:** ✅ JSON response
- **No 401 errors**

### **❌ Error Case:**

- **API Connection:** ❌ Failed
- **Error:** 401 Invalid API key
- **Solution:** Update API key

---

## 🚀 **Next Steps:**

1. **Tạo API key mới** từ OpenAI dashboard
2. **Cập nhật .env file** với key mới
3. **Restart ứng dụng**
4. **Test API connection**
5. **Upload CV và test analysis**

**Sau khi cập nhật API key, hãy test lại!** 🔑
