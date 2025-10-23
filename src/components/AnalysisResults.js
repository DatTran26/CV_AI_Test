import React from 'react';
import { CheckCircle, AlertTriangle, Star, TrendingUp, FileText, RotateCcw, Award, Activity, Target, Users, Briefcase, Settings } from 'lucide-react';
import IndustryInfo from './IndustryInfo';

const AnalysisResults = ({ data, onReset, selectedIndustry, selectedRole, onAdvancedMode }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Kết quả phân tích CV
              </h2>
              <p className="text-primary-100">
                AI đã hoàn thành việc phân tích CV của bạn
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onReset}
                className="flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Phân tích CV khác</span>
              </button>
              {!selectedRole && (
                <button
                  onClick={onAdvancedMode}
                  className="flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Chế độ nâng cao</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Industry Info */}
          {selectedIndustry && selectedRole && (
            <IndustryInfo 
              selectedIndustry={selectedIndustry} 
              selectedRole={selectedRole} 
            />
          )}

          {/* Role Suggestions */}
          {data.suggestedRoles && data.suggestedRoles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 text-green-600 mr-2" />
                Gợi ý vai trò phù hợp
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Vai trò phù hợp nhất</h4>
                    <p className="text-green-700">{data.topMatch?.name} - {data.topMatch?.match}% phù hợp</p>
                    <p className="text-sm text-green-600 mt-1">{data.topMatch?.reason}</p>
                  </div>
                </div>
              </div>
              
              {data.suggestedRoles.map((industry, index) => (
                <div key={index} className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">{industry.industry}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {industry.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{role.name}</h5>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            role.match >= 80 ? 'bg-green-100 text-green-800' :
                            role.match >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {role.match}% phù hợp
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{role.reason}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          role.level === 'expert' ? 'bg-purple-100 text-purple-800' :
                          role.level === 'senior' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {role.level === 'expert' ? 'Chuyên gia' :
                           role.level === 'senior' ? 'Chuyên nghiệp' : 'Mới bắt đầu'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {data.analysisSummary && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">{data.analysisSummary}</p>
                </div>
              )}
            </div>
          )}

          {/* Overall Score */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-24 h-24 rounded-full ${getScoreBgColor(data.overallScore)} flex items-center justify-center`}>
                <span className={`text-3xl font-bold ${getScoreColor(data.overallScore)}`}>
                  {data.overallScore}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-900 mb-2">
              Điểm tổng thể
            </h3>
            <p className="text-center text-gray-600">
              {data.overallScore >= 80 ? 'Xuất sắc!' : 
               data.overallScore >= 60 ? 'Tốt, cần cải thiện thêm' : 
               'Cần cải thiện nhiều'}
            </p>
          </div>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {data.scores.map((score, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${getScoreBgColor(score.value)} flex items-center justify-center mx-auto mb-3`}>
                  <span className={`text-xl font-bold ${getScoreColor(score.value)}`}>
                    {score.value}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{score.category}</h4>
                <p className="text-sm text-gray-600">{score.description}</p>
              </div>
            ))}
          </div>

          {/* Strengths */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Điểm mạnh
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.strengths.map((strength, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">{strength.title}</h4>
                      <p className="text-sm text-green-700">{strength.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
              Cần cải thiện
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.improvements.map((improvement, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">{improvement.title}</h4>
                      <p className="text-sm text-yellow-700 mb-2">{improvement.description}</p>
                      <div className="text-sm text-yellow-600">
                        <strong>Gợi ý:</strong> {improvement.suggestion}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              Phân tích chi tiết
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="prose max-w-none">
                {data.detailedAnalysis.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 text-purple-600 mr-2" />
                Chứng chỉ khuyến nghị
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {data.certifications.map((cert, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    cert.priority === 'high' ? 'border-red-200 bg-red-50' :
                    cert.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <Award className={`w-5 h-5 mt-0.5 ${
                        cert.priority === 'high' ? 'text-red-600' :
                        cert.priority === 'medium' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{cert.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          cert.priority === 'high' ? 'bg-red-100 text-red-800' :
                          cert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {cert.priority === 'high' ? 'Ưu tiên cao' :
                           cert.priority === 'medium' ? 'Ưu tiên trung bình' : 'Ưu tiên thấp'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities */}
          {data.activities && data.activities.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-6 h-6 text-blue-600 mr-2" />
                Hoạt động nên tham gia
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {data.activities.map((activity, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">{activity.name}</h4>
                        <p className="text-sm text-blue-700 mb-2">{activity.description}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          activity.type === 'online' ? 'bg-green-100 text-green-800' :
                          activity.type === 'offline' ? 'bg-orange-100 text-orange-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {activity.type === 'online' ? 'Trực tuyến' :
                           activity.type === 'offline' ? 'Trực tiếp' : 'Workshop'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {data.missingSkills && data.missingSkills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-6 h-6 text-orange-600 mr-2" />
                Kỹ năng cần bổ sung
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {data.missingSkills.map((skill, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    skill.importance === 'high' ? 'border-red-200 bg-red-50' :
                    skill.importance === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <Target className={`w-5 h-5 mt-0.5 ${
                        skill.importance === 'high' ? 'text-red-600' :
                        skill.importance === 'medium' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{skill.skill}</h4>
                        <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          skill.importance === 'high' ? 'bg-red-100 text-red-800' :
                          skill.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {skill.importance === 'high' ? 'Quan trọng' :
                           skill.importance === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Level & Industry Fit */}
          {(data.expertLevel || data.industryFit) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-indigo-600 mr-2" />
                Đánh giá chuyên môn
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {data.expertLevel && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-medium text-indigo-800 mb-2">Cấp độ chuyên gia</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data.expertLevel === 'expert' ? 'bg-purple-100 text-purple-800' :
                        data.expertLevel === 'senior' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {data.expertLevel === 'expert' ? 'Chuyên gia' :
                         data.expertLevel === 'senior' ? 'Chuyên nghiệp' : 'Mới bắt đầu'}
                      </span>
                    </div>
                  </div>
                )}
                {data.industryFit && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-medium text-indigo-800 mb-2">Mức độ phù hợp ngành</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data.industryFit === 'phù hợp' ? 'bg-green-100 text-green-800' :
                        data.industryFit === 'không phù hợp' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {data.industryFit}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Khuyến nghị hành động
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.recommendations.map((rec, index) => (
                <div key={index} className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-800 mb-1">{rec.title}</h4>
                      <p className="text-sm text-primary-700">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
