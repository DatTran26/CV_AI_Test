import React, { useState } from 'react';
import { Briefcase, GraduationCap, Code, Palette, Calculator, Stethoscope, Building, Laptop } from 'lucide-react';

const IndustrySelector = ({ onIndustrySelect, selectedIndustry, selectedRole, onRoleSelect }) => {
  const industries = [
    {
      id: 'tech',
      name: 'Công nghệ thông tin',
      icon: Code,
      roles: [
        { id: 'junior-dev', name: 'Junior Developer', level: 'entry' },
        { id: 'senior-dev', name: 'Senior Developer', level: 'senior' },
        { id: 'tech-lead', name: 'Tech Lead', level: 'expert' },
        { id: 'architect', name: 'Solution Architect', level: 'expert' },
        { id: 'devops', name: 'DevOps Engineer', level: 'senior' },
        { id: 'data-scientist', name: 'Data Scientist', level: 'senior' },
        { id: 'ai-engineer', name: 'AI Engineer', level: 'expert' }
      ]
    },
    {
      id: 'design',
      name: 'Thiết kế & Sáng tạo',
      icon: Palette,
      roles: [
        { id: 'junior-designer', name: 'Junior Designer', level: 'entry' },
        { id: 'senior-designer', name: 'Senior Designer', level: 'senior' },
        { id: 'creative-director', name: 'Creative Director', level: 'expert' },
        { id: 'ux-designer', name: 'UX Designer', level: 'senior' },
        { id: 'ui-designer', name: 'UI Designer', level: 'senior' }
      ]
    },
    {
      id: 'finance',
      name: 'Tài chính & Kế toán',
      icon: Calculator,
      roles: [
        { id: 'junior-accountant', name: 'Junior Accountant', level: 'entry' },
        { id: 'senior-accountant', name: 'Senior Accountant', level: 'senior' },
        { id: 'financial-analyst', name: 'Financial Analyst', level: 'senior' },
        { id: 'cfo', name: 'CFO', level: 'expert' },
        { id: 'investment-banker', name: 'Investment Banker', level: 'expert' }
      ]
    },
    {
      id: 'healthcare',
      name: 'Y tế & Sức khỏe',
      icon: Stethoscope,
      roles: [
        { id: 'junior-doctor', name: 'Junior Doctor', level: 'entry' },
        { id: 'senior-doctor', name: 'Senior Doctor', level: 'senior' },
        { id: 'specialist', name: 'Medical Specialist', level: 'expert' },
        { id: 'nurse', name: 'Nurse', level: 'entry' },
        { id: 'pharmacist', name: 'Pharmacist', level: 'senior' }
      ]
    },
    {
      id: 'business',
      name: 'Kinh doanh & Quản lý',
      icon: Building,
      roles: [
        { id: 'junior-manager', name: 'Junior Manager', level: 'entry' },
        { id: 'senior-manager', name: 'Senior Manager', level: 'senior' },
        { id: 'director', name: 'Director', level: 'expert' },
        { id: 'ceo', name: 'CEO', level: 'expert' },
        { id: 'business-analyst', name: 'Business Analyst', level: 'senior' }
      ]
    },
    {
      id: 'education',
      name: 'Giáo dục & Đào tạo',
      icon: GraduationCap,
      roles: [
        { id: 'junior-teacher', name: 'Junior Teacher', level: 'entry' },
        { id: 'senior-teacher', name: 'Senior Teacher', level: 'senior' },
        { id: 'professor', name: 'Professor', level: 'expert' },
        { id: 'education-coordinator', name: 'Education Coordinator', level: 'senior' }
      ]
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'senior': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'entry': return 'Mới bắt đầu';
      case 'senior': return 'Chuyên nghiệp';
      case 'expert': return 'Chuyên gia';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Chọn chuyên ngành và vai trò
        </h2>
        <p className="text-gray-600">
          AI sẽ phân tích CV theo chuyên ngành và cấp độ phù hợp
        </p>
      </div>

      {/* Industry Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Chọn chuyên ngành
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <button
                key={industry.id}
                onClick={() => onIndustrySelect(industry)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${selectedIndustry?.id === industry.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-6 h-6 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    {industry.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Selection */}
      {selectedIndustry && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Chọn vai trò trong {selectedIndustry.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedIndustry.roles.map((role) => (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${selectedRole?.id === role.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{role.name}</h4>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(role.level)}`}>
                      {getLevelText(role.level)}
                    </span>
                  </div>
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectedIndustry && selectedRole && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Briefcase className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary-800">
                Phân tích cho: {selectedRole.name}
              </h4>
              <p className="text-sm text-primary-600">
                Chuyên ngành: {selectedIndustry.name} • Cấp độ: {getLevelText(selectedRole.level)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrySelector;
