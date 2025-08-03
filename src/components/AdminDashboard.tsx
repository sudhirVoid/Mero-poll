import React, { useState } from 'react';
import { Plus, Edit, BarChart3, Users, MessageSquare, Eye, Trash2, Clock, MapPin, Settings } from 'lucide-react';
import { gradients } from '../utils/colors';
import { VotingCardType } from '../types/voting';

interface AdminDashboardProps {
  language: 'en' | 'ne';
}

export function AdminDashboard({ language }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    titleNepali: '',
    description: '',
    category: 'daily',
    votingType: 'traditional' as VotingCardType,
    duration: 24,
    location: '',
    imageUrl: ''
  });

  const tabs = [
    { id: 'create', label: 'Create Post', labelNepali: 'पोस्ट सिर्जना', icon: Plus },
    { id: 'manage', label: 'Manage Posts', labelNepali: 'पोस्ट व्यवस्थापन', icon: Edit },
    { id: 'analytics', label: 'Analytics', labelNepali: 'विश्लेषण', icon: BarChart3 },
    { id: 'users', label: 'Users', labelNepali: 'प्रयोगकर्ताहरू', icon: Users },
    { id: 'comments', label: 'Comments', labelNepali: 'टिप्पणीहरू', icon: MessageSquare }
  ];

  const votingTypes = [
    { value: 'traditional', label: 'Traditional', labelNepali: 'पारम्परिक मतदान' },
    { value: 'faceoff', label: 'Face-Off', labelNepali: 'द्विपक्षीय मुकाबला' },
    { value: 'multichoice', label: 'Multi-Choice', labelNepali: 'बहुविकल्पीय' },
    { value: 'yesno', label: 'Yes/No', labelNepali: 'हो/छैन' },
    { value: 'quickpoll', label: 'Quick Poll', labelNepali: 'द्रुत मतदान' },
    { value: 'ranking', label: 'Ranking', labelNepali: 'श्रेणीकरण' },
    { value: 'gift', label: 'Gift Voting', labelNepali: 'उपहार मतदान' },
    { value: 'timer', label: 'Timer-Based', labelNepali: 'समयमा आधारित' },
    { value: 'geo', label: 'Geo-Targeted', labelNepali: 'स्थान आधारित' },
    { value: 'story', label: 'Story Poll', labelNepali: 'कथा मतदान' },
    { value: 'prediction', label: 'Prediction', labelNepali: 'भविष्यवाणी' },
    { value: 'bracket', label: 'Tournament', labelNepali: 'प्रतियोगिता' }
  ];

  const categories = [
    { value: 'daily', label: 'Daily', labelNepali: 'दैनिक' },
    { value: 'politician', label: 'Politicians', labelNepali: 'राजनीतिज्ञ' },
    { value: 'community', label: 'Community', labelNepali: 'समुदाय' },
    { value: 'sports', label: 'Sports', labelNepali: 'खेलकुद' },
    { value: 'entertainment', label: 'Entertainment', labelNepali: 'मनोरञ्जन' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Creating post:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ne' ? 'व्यवस्थापक डैशबोर्ड' : 'Admin Dashboard'}
        </h1>
        <p className="text-gray-600">
          {language === 'ne' 
            ? 'मतदान पोस्टहरू सिर्जना र व्यवस्थापन गर्नुहोस्' 
            : 'Create and manage voting posts'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? `${gradients.nepal} text-white shadow-lg`
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">
                {language === 'ne' ? tab.labelNepali : tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Create Post Tab */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Form */}
          <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
            <div className="bg-white rounded-lg m-1 p-6 relative">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'ne' ? 'नयाँ पोस्ट सिर्जना गर्नुहोस्' : 'Create New Post'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ne' ? 'शीर्षक (अंग्रेजी)' : 'Title (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter post title..."
                  />
                </div>

                {/* Title Nepali */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ne' ? 'शीर्षक (नेपाली)' : 'Title (Nepali)'}
                  </label>
                  <input
                    type="text"
                    value={formData.titleNepali}
                    onChange={(e) => setFormData({ ...formData, titleNepali: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="नेपाली शीर्षक लेख्नुहोस्..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ne' ? 'विवरण' : 'Description'}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe your voting post..."
                  />
                </div>

                {/* Category and Voting Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ne' ? 'श्रेणी' : 'Category'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {language === 'ne' ? cat.labelNepali : cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ne' ? 'मतदान प्रकार' : 'Voting Type'}
                    </label>
                    <select
                      value={formData.votingType}
                      onChange={(e) => setFormData({ ...formData, votingType: e.target.value as VotingCardType })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {votingTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {language === 'ne' ? type.labelNepali : type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Duration and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock size={16} className="inline mr-1" />
                      {language === 'ne' ? 'अवधि (घण्टा)' : 'Duration (hours)'}
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                      min="1"
                      max="168"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      {language === 'ne' ? 'स्थान (वैकल्पिक)' : 'Location (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Kathmandu, Bhaktapur..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-4 ${gradients.nepal} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  {language === 'ne' ? 'पोस्ट सिर्जना गर्नुहोस्' : 'Create Post'}
                </button>
              </form>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
            <div className="bg-white rounded-lg m-1 p-6 relative">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'ne' ? 'पूर्वावलोकन' : 'Preview'}
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <Eye size={48} className="mx-auto mb-4 opacity-50" />
                  <p>{language === 'ne' 
                    ? 'तपाईंको पोस्ट यहाँ देखिनेछ' 
                    : 'Your post preview will appear here'}</p>
                  <p className="text-sm mt-2">
                    {language === 'ne'
                      ? 'फर्म भर्न सुरु गर्नुहोस्'
                      : 'Start filling the form to see preview'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Posts Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Posts', labelNepali: 'सक्रिय पोस्ट', value: '12', color: 'text-green-600' },
              { label: 'Total Votes', labelNepali: 'कुल मत', value: '1,234', color: 'text-blue-600' },
              { label: 'Comments', labelNepali: 'टिप्पणी', value: '456', color: 'text-purple-600' },
              { label: 'Users', labelNepali: 'प्रयोगकर्ता', value: '789', color: 'text-red-600' }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">
                  {language === 'ne' ? stat.labelNepali : stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Posts Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'ne' ? 'पोस्ट सूची' : 'Posts List'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ne' ? 'शीर्षक' : 'Title'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ne' ? 'प्रकार' : 'Type'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ne' ? 'मत' : 'Votes'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ne' ? 'स्थिति' : 'Status'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ne' ? 'कार्य' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3].map((item) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Sample Post {item}</div>
                        <div className="text-sm text-gray-500">नमूना पोस्ट {item}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Traditional
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {123 * item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ne' ? 'मतदान प्रवृत्ति' : 'Voting Trends'}
            </h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">
                <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
                <p>Chart will be implemented</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ne' ? 'लोकप्रिय पोस्ट' : 'Popular Posts'}
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Popular Post {item}</div>
                    <div className="text-sm text-gray-500">{1000 * item} votes</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">{(item * 25)}%</div>
                    <div className="text-xs text-gray-500">engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}