import React, { useState } from 'react';
import { Home, BarChart3, Settings, User, Globe, Menu, X } from 'lucide-react';
import { gradients } from '../utils/colors';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: 'en' | 'ne';
  onLanguageToggle: () => void;
}

export function Header({ activeTab, onTabChange, language, onLanguageToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', labelNepali: 'गृहपृष्ठ', icon: Home },
    { id: 'explore', label: 'Explore', labelNepali: 'अन्वेषण', icon: BarChart3 },
    { id: 'admin', label: 'Admin', labelNepali: 'व्यवस्थापक', icon: Settings },
    { id: 'profile', label: 'My Votes', labelNepali: 'मेरो मत', icon: User }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-red-600 to-blue-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${gradients.nepal} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent">
                MeroVote
              </h1>
              <p className="text-xs text-gray-500">
                {language === 'ne' ? 'मेरो मत' : 'Anonymous Voting'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? `${gradients.nepal} text-white shadow-lg`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">
                    {language === 'ne' ? item.labelNepali : item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLanguageToggle}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200"
            >
              <Globe size={18} />
              <span className="font-medium">{language === 'ne' ? 'EN' : 'नेपाली'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? `${gradients.nepal} text-white`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">
                      {language === 'ne' ? item.labelNepali : item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}