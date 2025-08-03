import React, { useState } from 'react';
import { gradients } from '../../utils/colors';

interface TraditionalVotingCardProps {
  title: string;
  titleNepali?: string;
  description: string;
  onVote: (option: 'gajjab' | 'yesto-ni-hunxa' | 'bekar') => void;
  results?: { gajjab: number; 'yesto-ni-hunxa': number; bekar: number };
  showResults?: boolean;
  userVote?: string | null;
}

export function TraditionalVotingCard({ 
  title, 
  titleNepali, 
  description, 
  onVote, 
  results = { gajjab: 0, 'yesto-ni-hunxa': 0, bekar: 0 },
  showResults = false,
  userVote = null
}: TraditionalVotingCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (option: 'gajjab' | 'yesto-ni-hunxa' | 'bekar') => {
    setIsVoting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onVote(option);
    setIsVoting(false);
  };

  const totalVotes = results.gajjab + results['yesto-ni-hunxa'] + results.bekar;
  
  const options = [
    { 
      key: 'gajjab' as const, 
      emoji: '🙌', 
      label: 'Gajjab', 
      labelNepali: 'गजब',
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    { 
      key: 'yesto-ni-hunxa' as const, 
      emoji: '😐', 
      label: 'Yesto ni hunxa gathe', 
      labelNepali: 'यस्तो नी हुन्छ गथे',
      color: 'from-yellow-500 to-orange-500',
      hoverColor: 'hover:from-yellow-600 hover:to-orange-600'
    },
    { 
      key: 'bekar' as const, 
      emoji: '👎', 
      label: 'Bekar', 
      labelNepali: 'बेकार',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
      <div className="bg-white rounded-lg m-1 p-6 relative">
        
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {titleNepali && <span className="block text-2xl mb-1">{titleNepali}</span>}
            {title}
          </h3>
          <p className="text-gray-600">{description}</p>
          
          {/* Traditional Card Badge */}
          <div className="inline-flex items-center mt-3 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-blue-100 text-sm font-medium">
            <span className="text-red-600">पारम्परिक मतदान</span>
          </div>
        </div>

        {/* Voting Options */}
        <div className="space-y-4">
          {options.map((option) => {
            const percentage = totalVotes > 0 ? (results[option.key] / totalVotes) * 100 : 0;
            const isSelected = userVote === option.key;
            
            return (
              <div key={option.key} className="relative">
                <button
                  onClick={() => handleVote(option.key)}
                  disabled={isVoting || showResults}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : showResults
                      ? 'border-gray-200 cursor-default'
                      : `border-gray-200 hover:border-red-300 ${option.hoverColor} hover:text-white hover:shadow-lg transform hover:scale-105`
                  } ${isVoting ? 'animate-pulse' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <div className="text-left">
                        <div className="font-semibold">{option.labelNepali}</div>
                        <div className="text-sm opacity-80">{option.label}</div>
                      </div>
                    </div>
                    
                    {showResults && (
                      <div className="text-right">
                        <div className="font-bold">{results[option.key]}</div>
                        <div className="text-sm opacity-70">{percentage.toFixed(1)}%</div>
                      </div>
                    )}
                  </div>
                </button>

                {/* Progress Bar */}
                {showResults && (
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${option.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Results Summary */}
        {showResults && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>कुल मत: {totalVotes}</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Anonymous & Secure</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}