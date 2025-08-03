import React, { useState } from 'react';
import { gradients } from '../../utils/colors';

interface FaceOffCardProps {
  title: string;
  titleNepali?: string;
  candidate1: { name: string; nameNepali?: string; imageUrl: string; votes: number };
  candidate2: { name: string; nameNepali?: string; imageUrl: string; votes: number };
  onVote: (candidate: 1 | 2) => void;
  showResults?: boolean;
  userVote?: number | null;
  timeLeft?: number;
}

export function FaceOffCard({ 
  title, 
  titleNepali,
  candidate1, 
  candidate2, 
  onVote, 
  showResults = false,
  userVote = null,
  timeLeft
}: FaceOffCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (candidate: 1 | 2) => {
    setIsVoting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onVote(candidate);
    setIsVoting(false);
  };

  const totalVotes = candidate1.votes + candidate2.votes;
  const candidate1Percentage = totalVotes > 0 ? (candidate1.votes / totalVotes) * 100 : 50;
  const candidate2Percentage = totalVotes > 0 ? (candidate2.votes / totalVotes) * 100 : 50;

  return (
    <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
      <div className="bg-white rounded-lg m-1 relative">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {titleNepali && <span className="block text-xl mb-1">{titleNepali}</span>}
                {title}
              </h3>
              <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-blue-100 text-sm font-medium">
                <span className="text-blue-600">द्विपक्षीय मुकाबला</span>
              </div>
            </div>
            {timeLeft && timeLeft > 0 && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Time left</div>
                <div className="font-bold text-red-600">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
              </div>
            )}
          </div>
        </div>

        {/* Candidates */}
        <div className="grid grid-cols-2 gap-0">
          {/* Candidate 1 */}
          <div className="relative">
            <button
              onClick={() => handleVote(1)}
              disabled={isVoting || showResults}
              className={`w-full p-6 transition-all duration-300 ${
                userVote === 1
                  ? 'bg-red-50 border-r-2 border-red-500'
                  : showResults
                  ? 'cursor-default border-r border-gray-200'
                  : 'hover:bg-red-50 border-r border-gray-200 hover:border-red-300 transform hover:scale-105'
              } ${isVoting ? 'animate-pulse' : ''}`}
            >
              <div className="text-center">
                <img
                  src={candidate1.imageUrl}
                  alt={candidate1.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-3 border-white shadow-lg"
                />
                <div className="font-semibold text-gray-900">
                  {candidate1.nameNepali && (
                    <div className="text-lg mb-1">{candidate1.nameNepali}</div>
                  )}
                  <div className="text-sm">{candidate1.name}</div>
                </div>
                
                {showResults && (
                  <div className="mt-3">
                    <div className="font-bold text-xl text-red-600">{candidate1.votes}</div>
                    <div className="text-sm text-gray-600">{candidate1Percentage.toFixed(1)}%</div>
                  </div>
                )}
              </div>
            </button>

            {/* Progress Bar */}
            {showResults && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-red-500 transition-all duration-1000 ease-out"
                  style={{ width: `${candidate1Percentage}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Candidate 2 */}
          <div className="relative">
            <button
              onClick={() => handleVote(2)}
              disabled={isVoting || showResults}
              className={`w-full p-6 transition-all duration-300 ${
                userVote === 2
                  ? 'bg-blue-50 border-l-2 border-blue-500'
                  : showResults
                  ? 'cursor-default'
                  : 'hover:bg-blue-50 hover:border-blue-300 transform hover:scale-105'
              } ${isVoting ? 'animate-pulse' : ''}`}
            >
              <div className="text-center">
                <img
                  src={candidate2.imageUrl}
                  alt={candidate2.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-3 border-white shadow-lg"
                />
                <div className="font-semibold text-gray-900">
                  {candidate2.nameNepali && (
                    <div className="text-lg mb-1">{candidate2.nameNepali}</div>
                  )}
                  <div className="text-sm">{candidate2.name}</div>
                </div>
                
                {showResults && (
                  <div className="mt-3">
                    <div className="font-bold text-xl text-blue-600">{candidate2.votes}</div>
                    <div className="text-sm text-gray-600">{candidate2Percentage.toFixed(1)}%</div>
                  </div>
                )}
              </div>
            </button>

            {/* Progress Bar */}
            {showResults && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: `${candidate2Percentage}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* VS Divider */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className={`w-12 h-12 ${gradients.nepal} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
            <span className="text-white font-bold">VS</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>कुल मत: {totalVotes}</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Anonymous</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}