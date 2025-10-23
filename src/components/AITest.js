import React, { useState } from 'react';
import { testAIConnection, testCVAnalysis } from '../services/testAI';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const AITest = ({ onBack }) => {
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testCV, setTestCV] = useState('');

  const runConnectionTest = async () => {
    setIsLoading(true);
    setTestResults(null);
    
    try {
      const result = await testAIConnection();
      setTestResults({ type: 'connection', ...result });
    } catch (error) {
      setTestResults({ 
        type: 'connection', 
        success: false, 
        message: `Test failed: ${error.message}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runCVAnalysisTest = async () => {
    if (!testCV.trim()) {
      alert('Vui lòng nhập nội dung CV để test');
      return;
    }

    setIsLoading(true);
    setTestResults(null);
    
    try {
      const result = await testCVAnalysis(testCV);
      setTestResults({ type: 'analysis', ...result });
    } catch (error) {
      setTestResults({ 
        type: 'analysis', 
        success: false, 
        message: `Test failed: ${error.message}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            🤖 AI API Test
          </h2>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back to Main
            </button>
          )}
        </div>
        
        {/* Connection Test */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Test API Connection
          </h3>
          <button
            onClick={runConnectionTest}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : null}
            <span>Test API Connection</span>
          </button>
        </div>

        {/* CV Analysis Test */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Test CV Analysis
          </h3>
          <textarea
            value={testCV}
            onChange={(e) => setTestCV(e.target.value)}
            placeholder="Nhập nội dung CV để test phân tích..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={runCVAnalysisTest}
            disabled={isLoading || !testCV.trim()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : null}
            <span>Test CV Analysis</span>
          </button>
        </div>

        {/* Results */}
        {testResults && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Test Results
            </h3>
            
            <div className={`p-4 rounded-lg border-2 ${
              testResults.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {testResults.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  testResults.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResults.success ? '✅ Success' : '❌ Failed'}
                </span>
              </div>
              
              <p className={`text-sm ${
                testResults.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {testResults.message}
              </p>

              {testResults.data && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Response Data:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                    {JSON.stringify(testResults.data, null, 2)}
                  </pre>
                </div>
              )}

              {testResults.rawResponse && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Raw AI Response:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                    {testResults.rawResponse}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Environment Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Environment Info:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>API Key exists: {process.env.REACT_APP_OPENAI_API_KEY ? '✅ Yes' : '❌ No'}</div>
            <div>API Key format: {process.env.REACT_APP_OPENAI_API_KEY ? 
              `${process.env.REACT_APP_OPENAI_API_KEY.substring(0, 10)}...` : 
              'Not found'
            }</div>
            <div>Environment: {process.env.NODE_ENV}</div>
          </div>
        </div>

        {/* Model Info */}
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">🚀 Model Information:</h4>
          <div className="text-sm text-green-700 space-y-1">
            <div>• Current model: GPT-4o-mini (Latest & Best)</div>
            <div>• Quality: High (similar to GPT-4)</div>
            <div>• Cost: $0 (free plan compatible)</div>
            <div>• Speed: Fast (3-8 seconds)</div>
          </div>
        </div>

        {/* Quota Info */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">⚠️ Quota Information:</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <div>• Free plan: $5 credit/month</div>
            <div>• Check usage: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Usage Dashboard</a></div>
            <div>• Add payment: <a href="https://platform.openai.com/account/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Billing</a></div>
            <div>• App will use mock data when quota exceeded</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITest;
