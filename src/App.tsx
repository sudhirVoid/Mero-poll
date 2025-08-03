import React, { useState } from 'react';
import { Header } from './components/Header';
import { VotingCardsGallery } from './components/VotingCardsGallery';
import { AdminDashboard } from './components/AdminDashboard';
import { CommentSystem } from './components/CommentSystem';
import { Footer } from './components/Footer';
import { Comment } from './types/voting';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState<'en' | 'ne'>('en');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'This is a great initiative for Nepal!',
      author: 'Anonymous_User_1',
      timestamp: new Date(),
      votes: 12,
      reaction: 'gajjab'
    },
    {
      id: '2', 
      text: 'यो राम्रो योजना हो तर कार्यान्वयन महत्वपूर्ण छ।',
      author: 'Anonymous_User_2',
      timestamp: new Date(Date.now() - 3600000),
      votes: 8,
      reaction: 'yesto-ni-hunxa'
    }
  ]);

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'en' ? 'ne' : 'en');
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: `Anonymous_User_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date(),
      votes: 0,
      reaction: null
    };
    setComments(prev => [newComment, ...prev]);
  };

  const handleReactToComment = (commentId: string, reaction: 'gajjab' | 'bekar' | 'yesto-ni-hunxa') => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, reaction, votes: comment.votes + 1 }
        : comment
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
      case 'explore':
        return (
          <>
            <VotingCardsGallery language={language} />
            <CommentSystem
              postId="sample"
              postType="daily"
              comments={comments}
              onAddComment={handleAddComment}
              onReactToComment={handleReactToComment}
              language={language}
            />
          </>
        );
      case 'admin':
        return <AdminDashboard language={language} />;
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
              <div className="bg-white rounded-lg m-1 p-12 relative">
                <div className="text-6xl mb-4">👤</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'ne' ? 'मेरो मतदान इतिहास' : 'My Voting History'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ne' 
                    ? 'तपाईंका सबै मतहरू गुमनाम छन् र तपाईंको व्यक्तिगत पहिचानसँग जोडिएको छैन।'
                    : 'All your votes are anonymous and not linked to your personal identity.'}
                </p>
                <div className="mt-6 flex items-center justify-center space-x-2 text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    {language === 'ne' ? 'गोपनीयता सुरक्षित' : 'Privacy Protected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <VotingCardsGallery language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        onLanguageToggle={handleLanguageToggle}
      />
      
      <main className="min-h-screen">
        {renderContent()}
      </main>
      
      <Footer language={language} />
    </div>
  );
}

export default App;