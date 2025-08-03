import React, { useState } from 'react';
import { TraditionalVotingCard } from './voting-cards/TraditionalVotingCard';
import { FaceOffCard } from './voting-cards/FaceOffCard';
import { MultiChoiceGridCard } from './voting-cards/MultiChoiceGridCard';
import { YesNoCard } from './voting-cards/YesNoCard';
import { QuickPollCard } from './voting-cards/QuickPollCard';
import { gradients } from '../utils/colors';

interface VotingCardsGalleryProps {
  language: 'en' | 'ne';
}

export function VotingCardsGallery({ language }: VotingCardsGalleryProps) {
  const [votedCards, setVotedCards] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleVote = (cardId: string, vote: any) => {
    setVotedCards(prev => ({ ...prev, [cardId]: vote }));
    // Show results after voting
    setTimeout(() => {
      setShowResults(prev => ({ ...prev, [cardId]: true }));
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'ne' ? 'मतदान कार्डहरू' : 'Voting Cards Gallery'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'ne' 
            ? 'विभिन्न प्रकारका मतदान कार्डहरू अन्वेषण गर्नुहोस् र तपाईंको मनपर्ने कुरामा मत दिनुहोस्'
            : 'Explore different types of voting cards and cast your vote on topics that matter to you'
          }
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Traditional Voting Card */}
        <TraditionalVotingCard
          title="What do you think about the new traffic rules?"
          titleNepali="नयाँ ट्राफिक नियमबारे तपाईंको के विचार छ?"
          description="Share your opinion on the recently implemented traffic regulations in Kathmandu."
          onVote={(vote) => handleVote('traditional', vote)}
          results={{ gajjab: 45, 'yesto-ni-hunxa': 23, bekar: 12 }}
          showResults={showResults['traditional']}
          userVote={votedCards['traditional']}
        />

        {/* Face-Off Card */}
        <FaceOffCard
          title="Who would make a better mayor?"
          titleNepali="कसले राम्रो मेयर बन्न सक्छ?"
          candidate1={{
            name: "Candidate A",
            nameNepali: "उम्मेदवार क",
            imageUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
            votes: 156
          }}
          candidate2={{
            name: "Candidate B", 
            nameNepali: "उम्मेदवार ख",
            imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
            votes: 134
          }}
          onVote={(vote) => handleVote('faceoff', vote)}
          showResults={showResults['faceoff']}
          userVote={votedCards['faceoff']}
          timeLeft={3600}
        />

        {/* Multi-Choice Grid Card */}
        <MultiChoiceGridCard
          title="Best Nepali food?"
          titleNepali="सबैभन्दा राम्रो नेपाली खाना?"
          options={[
            { 
              id: '1', 
              name: 'Dal Bhat', 
              nameNepali: 'दाल भात',
              imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150',
              votes: 89 
            },
            { 
              id: '2', 
              name: 'Momo', 
              nameNepali: 'मोमो',
              imageUrl: 'https://images.pexels.com/photos/4449130/pexels-photo-4449130.jpeg?auto=compress&cs=tinysrgb&w=150',
              votes: 123 
            },
            { 
              id: '3', 
              name: 'Choila', 
              nameNepali: 'छोइला',
              imageUrl: 'https://images.pexels.com/photos/5474640/pexels-photo-5474640.jpeg?auto=compress&cs=tinysrgb&w=150',
              votes: 67 
            },
            { 
              id: '4', 
              name: 'Sel Roti', 
              nameNepali: 'सेल रोटी',
              imageUrl: 'https://images.pexels.com/photos/4577179/pexels-photo-4577179.jpeg?auto=compress&cs=tinysrgb&w=150',
              votes: 45 
            }
          ]}
          onVote={(vote) => handleVote('multichoice', vote)}
          showResults={showResults['multichoice']}
          userVote={votedCards['multichoice']}
        />

        {/* Yes/No Card */}
        <YesNoCard
          title="Infrastructure Development"
          titleNepali="पूर्वाधार विकास"
          question="Should the government prioritize road development over digital infrastructure?"
          questionNepali="के सरकारले डिजिटल पूर्वाधारभन्दा सडक विकासलाई प्राथमिकता दिनुपर्छ?"
          onVote={(vote) => handleVote('yesno', vote)}
          results={{ yes: 67, no: 45 }}
          showResults={showResults['yesno']}
          userVote={votedCards['yesno']}
        />

        {/* Quick Poll Card */}
        <QuickPollCard
          title="How are you feeling today?"
          titleNepali="आज तपाईं कस्तो महसुस गर्दै हुनुहुन्छ?"
          options={[
            { id: '1', emoji: '😊', label: 'Happy', labelNepali: 'खुसी', votes: 34 },
            { id: '2', emoji: '😐', label: 'Neutral', labelNepali: 'सामान्य', votes: 23 },
            { id: '3', emoji: '😔', label: 'Sad', labelNepali: 'दुखी', votes: 12 },
            { id: '4', emoji: '😴', label: 'Tired', labelNepali: 'थकित', votes: 18 },
            { id: '5', emoji: '🤔', label: 'Confused', labelNepali: 'भ्रमित', votes: 8 }
          ]}
          onVote={(vote) => handleVote('quickpoll', vote)}
          showResults={showResults['quickpoll']}
          userVote={votedCards['quickpoll']}
        />

        {/* More Cards Coming Soon */}
        <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
          <div className="bg-white rounded-lg m-1 p-6 relative">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'ne' ? 'थप कार्डहरू आउँदै छन्' : 'More Cards Coming Soon'}
              </h3>
              <p className="text-gray-600">
                {language === 'ne' 
                  ? 'Swipe Battle, Ranking, Gift Voting, र अन्य 7 कार्डहरू चाँडै आउनेछन्'
                  : 'Swipe Battle, Ranking, Gift Voting, and 7 more cards coming soon'
                }
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 max-w-xs mx-auto">
                {['🔄', '🏆', '🎁', '⏰', '📍', '📱', '🔮', '🏀'].map((emoji, i) => (
                  <div key={i} className="text-2xl p-2 bg-gray-100 rounded-lg opacity-50">
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}