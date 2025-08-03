import React, { useState } from 'react';

interface QuickPollOption {
  id: string;
  emoji: string;
  label: string;
  labelNepali?: string;
  votes: number;
}

interface QuickPollCardProps {
  title: string;
  titleNepali?: string;
  options: QuickPollOption[];
  onVote: (optionId: string) => void;
  showResults?: boolean;
  userVote?: string | null;
}

export function QuickPollCard({ 
  title, 
  titleNepali,
  options, 
  onVote, 
  showResults = false,
  userVote = null
}: QuickPollCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (optionId: string) => {
    setIsVoting(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onVote(optionId);
    setIsVoting(false);
  };

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
      <div className="bg-white rounded-lg m-1 p-6 relative">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {titleNepali && <span className="block text-xl mb-2">{titleNepali}</span>}
            {title}
          </h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-sm font-medium">
            <span className="text-orange-600">द्रुत मतदान</span>
          </div>
        </div>

        {/* Quick Poll Options */}
        <div className="flex flex-wrap justify-center gap-3">
          {options.map((option) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isSelected = userVote === option.id;
            
            return (
              <div key={option.id} className="relative">
                <button
                  onClick={() => handleVote(option.id)}
                  disabled={isVoting || showResults}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 scale-110 shadow-lg'
                      : showResults
                      ? 'border-gray-200 cursor-default'
                      : 'border-gray-200 hover:border-orange-400 hover:scale-110 hover:shadow-lg'
                  } ${isVoting ? 'animate-pulse' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{option.emoji}</div>
                    <div className="font-medium text-gray-900">
                      {option.labelNepali && (
                        <div className="text-sm mb-1">{option.labelNepali}</div>
                      )}
                      <div className="text-xs">{option.label}</div>
                    </div>

                    {showResults && (
                      <div className="mt-2">
                        <div className="font-bold text-orange-600">{option.votes}</div>
                        <div className="text-xs text-gray-600">{percentage.toFixed(0)}%</div>
                      </div>
                    )}
                  </div>

                  {/* Vote ripple effect */}
                  {isSelected && !showResults && (
                    <div className="absolute inset-0 rounded-2xl bg-purple-400 opacity-20 animate-ping"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Results Summary */}
        {showResults && (
          <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">कुल मत: {totalVotes}</div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Anonymous voting</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}