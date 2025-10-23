import React from 'react';
import { FileText, Brain, TestTube } from 'lucide-react';

const Header = ({ onTestMode }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CV Analyzer AI</h1>
              <p className="text-sm text-gray-600">Phân tích CV thông minh</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
            
            {onTestMode && (
              <button
                onClick={onTestMode}
                className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
              >
                <TestTube className="w-4 h-4" />
                <span>Test API</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
