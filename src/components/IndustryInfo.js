import React from 'react';
import { Briefcase, Users, Target, Award } from 'lucide-react';

const IndustryInfo = ({ selectedIndustry, selectedRole }) => {
  if (!selectedIndustry || !selectedRole) return null;

  const getLevelDescription = (level) => {
    switch (level) {
      case 'entry':
        return {
          title: 'Mới bắt đầu',
          description: 'Dành cho người mới vào nghề, cần học hỏi và tích lũy kinh nghiệm',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'senior':
        return {
          title: 'Chuyên nghiệp',
          description: 'Có kinh nghiệm và kỹ năng chuyên sâu, có thể dẫn dắt team',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'expert':
        return {
          title: 'Chuyên gia',
          description: 'Cấp độ cao nhất, có thể tư vấn và định hướng chiến lược',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100'
        };
      default:
        return {
          title: 'Không xác định',
          description: 'Cấp độ chưa được xác định',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const levelInfo = getLevelDescription(selectedRole.level);

  return (
    <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Phân tích cho {selectedRole.name}
          </h3>
          <p className="text-gray-600">
            Chuyên ngành: {selectedIndustry.name}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-gray-900">Cấp độ</h4>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${levelInfo.bgColor} ${levelInfo.color}`}>
            {levelInfo.title}
          </span>
          <p className="text-sm text-gray-600 mt-2">{levelInfo.description}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-gray-900">Tiêu chí đánh giá</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Kỹ năng chuyên ngành</li>
            <li>• Kinh nghiệm thực tế</li>
            <li>• Khả năng lãnh đạo</li>
            <li>• Tư duy chiến lược</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h4 className="font-medium text-gray-900">Yêu cầu</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Chứng chỉ chuyên môn</li>
            <li>• Dự án thực tế</li>
            <li>• Kinh nghiệm team work</li>
            <li>• Khả năng giải quyết vấn đề</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndustryInfo;
