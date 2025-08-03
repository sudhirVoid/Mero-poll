import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface YesNoCardProps {
  title: string;
  titleNepali?: string;
  question: string;
  questionNepali?: string;
  onVote: (vote: 'yes' | 'no') => void;
  results?: { yes: number; no: number };
  showResults?: boolean;
  userVote?: string | null;
}

export function YesNoCard({ 
  title, 
  titleNepali,
  question, 
  questionNepali,
  onVote, 
  results = { yes: 0, no: 0 },
  showResults = false,
  userVote = null
}: YesNoCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (vote: 'yes' | 'no') => {
    setIsVoting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onVote(vote);
    setIsVoting(false);
  };

  const totalVotes = results.yes + results.no;
  const yesPercentage = totalVotes > 0 ? (results.yes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (results.no / totalVotes) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
      <div className="bg-white rounded-lg m-1 p-6 relative">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {titleNepali && <span className="block text-2xl mb-2">{titleNepali}</span>}
            {title}
          </h3>
          
          <div className="text-lg font-medium text-gray-700 mb-4">
            {questionNepali && <div className="text-xl mb-2">{questionNepali}</div>}
            {question}
          </div>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-red-100 text-sm font-medium">
            <span className="text-gray-600">हो/छैन मतदान</span>
          </div>
        </div>

        {/* Voting Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Yes Button */}
          <button
            onClick={() => handleVote('yes')}
            disabled={isVoting || showResults}
            className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              userVote === 'yes'
                ? 'border-green-500 bg-green-50 scale-105 shadow-lg'
                : showResults
                ? 'border-gray-200 cursor-default'
                : 'border-gray-200 hover:border-green-400 hover:bg-green-50 hover:scale-105 hover:shadow-lg'
            } ${isVoting ? 'animate-pulse' : ''}`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                userVote === 'yes' ? 'bg-green-500' : 'bg-green-100'
              } transition-colors duration-300`}>
                <Check size={32} className={userVote === 'yes' ? 'text-white' : 'text-green-600'} />
              </div>
              <div className="font-bold text-lg text-gray-900 mb-2">
                <div>हो</div>
                <div className="text-sm">Yes</div>
              </div>
              
              {showResults && (
                <div className="space-y-2">
                  <div className="font-bold text-2xl text-green-600">{results.yes}</div>
                  <div className="text-sm text-gray-600">{yesPercentage.toFixed(1)}%</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${yesPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </button>

          {/* No Button */}
          <button
            onClick={() => handleVote('no')}
            disabled={isVoting || showResults}
            className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              userVote === 'no'
                ? 'border-red-500 bg-red-50 scale-105 shadow-lg'
                : showResults
                ? 'border-gray-200 cursor-default'
                : 'border-gray-200 hover:border-red-400 hover:bg-red-50 hover:scale-105 hover:shadow-lg'
            } ${isVoting ? 'animate-pulse' : ''}`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                userVote === 'no' ? 'bg-red-500' : 'bg-red-100'
              } transition-colors duration-300`}>
                <X size={32} className={userVote === 'no' ? 'text-white' : 'text-red-600'} />
              </div>
              <div className="font-bold text-lg text-gray-900 mb-2">
                <div>छैन</div>
                <div className="text-sm">No</div>
              </div>
              
              {showResults && (
                <div className="space-y-2">
                  <div className="font-bold text-2xl text-red-600">{results.no}</div>
                  <div className="text-sm text-gray-600">{noPercentage.toFixed(1)}%</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${noPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Results Summary */}
        {showResults && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">कुल मत: {totalVotes}</div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Your vote is anonymous and secure</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}