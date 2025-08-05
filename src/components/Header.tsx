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
    <header className="nepal-header sticky top-0 z-50 nepal-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg nepal-gradient flex items-center justify-center nepal-shadow nepal-corner-accent">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold nepal-text-gradient">
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
                  className={`nepal-nav-pill flex items-center space-x-2 ${
                    activeTab === item.id
                      ? 'active'
                      : 'text-nepal-blue-900'
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
              className="nepal-btn-secondary flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 nepal-glow"
            >
              <Globe size={18} />
              <span className="font-medium">{language === 'ne' ? 'EN' : 'नेपाली'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg nepal-btn-secondary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-nepal-purple-300">
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
                    className={`nepal-nav-pill flex items-center space-x-3 w-full text-left ${
                      activeTab === item.id
                        ? 'active'
                        : 'text-nepal-blue-900'
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