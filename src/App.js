import React, { useState } from 'react';
import Header from './components/Header';
import CVUploader from './components/CVUploader';
import IndustrySelector from './components/IndustrySelector';
import AnalysisResults from './components/AnalysisResults';
import LoadingSpinner from './components/LoadingSpinner';
import AITest from './components/AITest';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStep, setCurrentStep] = useState('upload'); // upload, analyzing, results, advanced, test

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setSelectedRole(null); // Reset role when industry changes
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentStep('analyzing');
    // Re-analyze with specific role
    handleAnalysisStart();
  };

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setIsAnalyzing(false);
    setCurrentStep('results');
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisData(null);
    setCurrentStep('analyzing');
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setIsAnalyzing(false);
    setCurrentStep('upload');
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setError(null);
    setIsAnalyzing(false);
    setSelectedIndustry(null);
    setSelectedRole(null);
    setCurrentStep('upload');
  };

  const handleAdvancedMode = () => {
    setCurrentStep('advanced');
  };

  const handleTestMode = () => {
    setCurrentStep('test');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onTestMode={handleTestMode} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Step 1: CV Upload */}
        {currentStep === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Phân tích CV thông minh
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Tải lên CV của bạn và AI sẽ tự động phân tích, gợi ý vai trò phù hợp
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center space-x-2 text-blue-800">
                  <span className="text-2xl">🤖</span>
                  <span className="font-medium">AI sẽ đọc CV và gợi ý vai trò phù hợp nhất</span>
                </div>
              </div>
            </div>
            
            <CVUploader 
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onError={handleError}
              onAdvancedMode={handleAdvancedMode}
            />
          </div>
        )}

        {/* Advanced Mode: Industry Selection */}
        {currentStep === 'advanced' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Phân tích CV theo chuyên ngành
              </h1>
              <p className="text-xl text-gray-600">
                Chọn chuyên ngành và vai trò cụ thể để AI phân tích chính xác hơn
              </p>
            </div>
            
            <IndustrySelector 
              onIndustrySelect={handleIndustrySelect}
              selectedIndustry={selectedIndustry}
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
            />
          </div>
        )}

        {/* Step 2: Analyzing */}
        {currentStep === 'analyzing' && (
          <div className="max-w-2xl mx-auto text-center">
            <LoadingSpinner />
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">
              Đang phân tích CV...
            </h2>
            <p className="text-gray-600 mt-2">
              {selectedRole 
                ? `AI đang phân tích CV cho vị trí ${selectedRole.name} và đưa ra góp ý chuyên nghiệp`
                : 'AI đang đọc CV và gợi ý vai trò phù hợp nhất'
              }
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Có lỗi xảy ra
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={resetAnalysis}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === 'results' && analysisData && (
          <AnalysisResults 
            data={analysisData} 
            onReset={resetAnalysis}
            selectedIndustry={selectedIndustry}
            selectedRole={selectedRole}
            onAdvancedMode={handleAdvancedMode}
          />
        )}

        {/* Test Mode */}
        {currentStep === 'test' && (
          <AITest onBack={() => setCurrentStep('upload')} />
        )}
      </main>
    </div>
  );
}

export default App;
