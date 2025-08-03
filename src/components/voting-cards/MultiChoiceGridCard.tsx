import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface MultiChoiceOption {
  id: string;
  name: string;
  nameNepali?: string;
  imageUrl: string;
  votes: number;
}

interface MultiChoiceGridCardProps {
  title: string;
  titleNepali?: string;
  options: MultiChoiceOption[];
  onVote: (optionId: string) => void;
  showResults?: boolean;
  userVote?: string | null;
}

export function MultiChoiceGridCard({ 
  title, 
  titleNepali,
  options, 
  onVote, 
  showResults = false,
  userVote = null
}: MultiChoiceGridCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (optionId: string) => {
    setIsVoting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onVote(optionId);
    setIsVoting(false);
  };

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
      <div className="bg-white rounded-lg m-1 p-6 relative">
        
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {titleNepali && <span className="block text-2xl mb-1">{titleNepali}</span>}
            {title}
          </h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-blue-100 text-sm font-medium">
            <span className="text-purple-600">बहुविकल्पीय छनोट</span>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options.map((option) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isSelected = userVote === option.id;
            
            return (
              <div key={option.id} className="relative">
                <button
                  onClick={() => handleVote(option.id)}
                  disabled={isVoting || showResults}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : showResults
                      ? 'border-gray-200 cursor-default'
                      : 'border-gray-200 hover:border-red-300 hover:shadow-lg hover:scale-105'
                  } ${isVoting ? 'animate-pulse' : ''}`}
                >
                  <div className="text-center">
                    <img
                      src={option.imageUrl}
                      alt={option.name}
                      className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-white shadow-md object-cover"
                    />
                    <div className="font-medium text-gray-900">
                      {option.nameNepali && (
                        <div className="text-sm mb-1">{option.nameNepali}</div>
                      )}
                      <div className="text-xs">{option.name}</div>
                    </div>

                    {showResults && (
                      <div className="mt-3">
                        <div className="flex justify-center mb-1">
                          {[...Array(Math.min(5, Math.floor(percentage / 10)))].map((_, i) => (
                            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="font-bold text-lg text-purple-600">{option.votes}</div>
                        <div className="text-xs text-gray-600">{percentage.toFixed(1)}%</div>
                      </div>
                    )}
                  </div>
                </button>

                {/* Progress Indicator */}
                {showResults && (
                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>कुल मत: {totalVotes}</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Secure Voting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}