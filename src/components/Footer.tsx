import React from 'react';
import { Heart, Shield, Globe, Facebook, Instagram, Youtube, Camera } from 'lucide-react';
import { gradients } from '../utils/colors';

interface FooterProps {
  language: 'en' | 'ne';
}

export function Footer({ language }: FooterProps) {
  const footerLinks = [
    {
      title: language === 'ne' ? 'कानुनी' : 'Legal',
      links: [
        { label: language === 'ne' ? 'गोपनीयता नीति' : 'Privacy Policy', href: '#privacy' },
        { label: language === 'ne' ? 'सेवाका सर्तहरू' : 'Terms of Service', href: '#terms' },
        { label: language === 'ne' ? 'कुकी नीति' : 'Cookie Policy', href: '#cookies' }
      ]
    },
    {
      title: language === 'ne' ? 'समुदाय' : 'Community',
      links: [
        { label: language === 'ne' ? 'हाम्रो बारेमा' : 'About Us', href: '#about' },
        { label: language === 'ne' ? 'सम्पर्क' : 'Contact', href: '#contact' },
        { label: language === 'ne' ? 'सहायता' : 'Help Center', href: '#help' }
      ]
    },
    {
      title: language === 'ne' ? 'विशेषताहरू' : 'Features',
      links: [
        { label: language === 'ne' ? 'गुमनाम मतदान' : 'Anonymous Voting', href: '#anonymous' },
        { label: language === 'ne' ? 'सुरक्षा' : 'Security', href: '#security' },
        { label: language === 'ne' ? 'विश्लेषण' : 'Analytics', href: '#analytics' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#facebook', label: 'Facebook' },
    { icon: Instagram, href: '#instagram', label: 'Instagram' },
    { icon: Camera, href: '#tiktok', label: 'TikTok' },
    { icon: Youtube, href: '#youtube', label: 'YouTube' }
  ];

  return (
    <footer className="bg-white border-t-4 border-gradient-to-r from-red-600 to-blue-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-lg ${gradients.nepal} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent">
                  MeroVote
                </h2>
                <p className="text-sm text-gray-500">
                  {language === 'ne' ? 'मेरो मत' : 'Your Voice Matters'}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              {language === 'ne' 
                ? 'नेपालको पहिलो गुमनाम मतदान प्लेटफर्म। तपाईंको मत, तपाईंको गोपनीयता।'
                : 'Nepal\'s first anonymous voting platform. Your vote, your privacy.'
              }
            </p>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <Shield size={16} />
              <span className="font-medium">
                {language === 'ne' ? '१००% सुरक्षित' : '100% Secure'}
              </span>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">
                {language === 'ne' ? 'हामीलाई फलो गर्नुहोस्:' : 'Follow us:'}
              </span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-blue-800 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            {/* Language & Globe */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Globe size={16} />
                <span>{language === 'ne' ? 'नेपाल' : 'Nepal'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart size={16} className="text-red-500" />
                <span>{language === 'ne' ? 'स्वदेशी' : 'Made in Nepal'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`${gradients.nepal} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm">
            <p className="mb-2 md:mb-0">
              © 2025 MeroVote. {language === 'ne' 
                ? 'सबै अधिकार सुरक्षित।' 
                : 'All rights reserved.'}
            </p>
            <p className="flex items-center space-x-2">
              <Shield size={16} />
              <span>
                {language === 'ne' 
                  ? 'तपाईंको मत गुमनाम र सुरक्षित छ' 
                  : 'Your vote is anonymous and secure'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}