import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { analyzeCV } from '../services/aiService';

const CVUploader = ({ onAnalysisStart, onAnalysisComplete, onError, onAdvancedMode }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      setUploadedFile(file);
      
      try {
        onAnalysisStart();
        const result = await analyzeCV(file);
        onAnalysisComplete(result);
      } catch (error) {
        console.error('Error analyzing CV:', error);
        
        // Provide specific error messages based on error type
        let errorMessage = 'Không thể phân tích CV. Vui lòng thử lại với file khác.';
        
        if (error.message.includes('Không thể đọc được nội dung file')) {
          errorMessage = 'Không thể đọc được nội dung file CV. Vui lòng kiểm tra file và thử lại.';
        } else if (error.message.includes('Rate limit exceeded')) {
          errorMessage = 'CV quá lớn cho AI phân tích. Hệ thống đã tự động cắt ngắn nội dung để tránh lỗi. Vui lòng thử lại.';
        } else if (error.message.includes('API Error: 429')) {
          errorMessage = 'API quota đã hết. Vui lòng thêm payment method hoặc chờ reset quota.';
        } else if (error.message.includes('API Error: 401')) {
          errorMessage = 'API key không hợp lệ. Vui lòng kiểm tra cấu hình API key.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Không thể kết nối với AI service. Vui lòng kiểm tra kết nối mạng và thử lại.';
        } else if (error.message.includes('Không thể kết nối với AI service')) {
          errorMessage = 'Không thể kết nối với AI service. Vui lòng kiểm tra kết nối mạng.';
        } else {
          // Hiển thị error message gốc để debug
          errorMessage = `Lỗi: ${error.message}`;
        }
        
        onError(errorMessage);
      } finally {
        setIsUploading(false);
      }
    }
  }, [onAnalysisStart, onAnalysisComplete, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Tải lên CV của bạn
        </h2>
        <p className="text-gray-600">
          Hỗ trợ định dạng PDF, DOC, DOCX, TXT (tối đa 10MB)
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-primary-600 font-medium">Đang xử lý file...</p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
                <Upload className="w-8 h-8 text-primary-600" />
              </div>
              
              {isDragActive ? (
                <p className="text-primary-600 font-medium">
                  Thả file vào đây để tải lên
                </p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Kéo thả file CV vào đây hoặc <span className="text-primary-600 font-medium">bấm để chọn file</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX, TXT (tối đa 10MB)
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {uploadedFile && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-green-800">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">
              AI sẽ phân tích những gì?
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Cấu trúc và bố cục CV</li>
              <li>• Nội dung và từ khóa quan trọng</li>
              <li>• Định dạng và trình bày</li>
              <li>• Gợi ý vai trò phù hợp</li>
              <li>• Gợi ý cải thiện chuyên nghiệp</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Mode Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onAdvancedMode}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <span>⚙️</span>
          <span>Chế độ nâng cao - Chọn vai trò cụ thể</span>
        </button>
        <p className="text-sm text-gray-500 mt-1">
          Hoặc để AI tự động gợi ý vai trò phù hợp nhất
        </p>
      </div>
    </div>
  );
};

export default CVUploader;
