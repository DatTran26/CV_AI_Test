# CV Analyzer AI - Phân tích CV thông minh

Ứng dụng React.js sử dụng AI để phân tích và đưa ra góp ý chuyên nghiệp cho CV của người dùng.

## ✨ Tính năng

- 📄 **Upload CV đa định dạng**: Hỗ trợ PDF, DOC, DOCX, TXT
- 🤖 **Phân tích AI thông minh**: Sử dụng AI để phân tích CV
- 📊 **Đánh giá chi tiết**: Điểm số và phân tích từng khía cạnh
- 💡 **Góp ý chuyên nghiệp**: Đưa ra lời khuyên cải thiện cụ thể
- 🎨 **Giao diện đẹp**: Thiết kế hiện đại, responsive
- ⚡ **Tốc độ nhanh**: Xử lý và phân tích nhanh chóng

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js 16+
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy ứng dụng

```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Build cho production

```bash
npm run build
```

## 🛠️ Công nghệ sử dụng

- **React 18**: Framework chính
- **Tailwind CSS**: Styling
- **React Dropzone**: Upload file
- **Lucide React**: Icons
- **Axios**: HTTP client
- **AI Integration**: Tích hợp AI API

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── Header.js          # Header component
│   ├── CVUploader.js      # Upload CV component
│   ├── AnalysisResults.js # Hiển thị kết quả
│   └── LoadingSpinner.js  # Loading animation
├── services/
│   └── aiService.js       # AI service integration
├── App.js                 # Main app component
├── index.js               # Entry point
└── index.css              # Global styles
```

## 🔧 Tích hợp AI API

Hiện tại ứng dụng sử dụng mock data. Để tích hợp AI thực tế:

1. **OpenAI API**:

```javascript
// Trong src/services/aiService.js
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${YOUR_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [...]
  })
});
```

2. **Claude API**:

```javascript
// Tích hợp với Anthropic Claude API
```

3. **Custom AI Service**:

```javascript
// Tích hợp với AI service riêng
```

## 🎨 Customization

### Thay đổi màu sắc

Chỉnh sửa `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi màu chính
      }
    }
  }
}
```

### Thêm tính năng mới

1. Tạo component mới trong `src/components/`
2. Import và sử dụng trong `App.js`
3. Cập nhật routing nếu cần

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🔒 Bảo mật

- File upload được giới hạn kích thước (10MB)
- Chỉ chấp nhận các định dạng file an toàn
- Xử lý lỗi và validation đầy đủ

## 🚀 Deployment

### Vercel

```bash
npm run build
# Deploy lên Vercel
```

### Netlify

```bash
npm run build
# Deploy lên Netlify
```

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- Email: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React team cho framework tuyệt vời
- Tailwind CSS cho styling system
- Lucide cho icon set đẹp
- AI community cho inspiration
