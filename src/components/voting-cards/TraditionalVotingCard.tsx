import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { ThumbsUp, ThumbsDown, Meh, MessageSquare, Send, Shield, Users, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TraditionalVotingCardProps {
  title: string;
  titleNepali?: string;
  description: string;
  onVote: (option: 'gajjab' | 'yesto-ni-hunxa' | 'bekar') => void;
  results?: { gajjab: number; 'yesto-ni-hunxa': number; bekar: number };
  showResults?: boolean;
  userVote?: string | null;
  comments?: Array<{
    id: string;
    text: string;
    author: string;
    timestamp: Date;
    votes: number;
  }>;
  onAddComment?: (text: string) => void;
  language?: 'en' | 'ne';
}

export function TraditionalVotingCard({ 
  title, 
  titleNepali, 
  description, 
  onVote, 
  results = { gajjab: 0, 'yesto-ni-hunxa': 0, bekar: 0 },
  showResults = false,
  userVote = null,
  comments = [],
  onAddComment,
  language = 'en'
}: TraditionalVotingCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleVote = async (option: 'gajjab' | 'yesto-ni-hunxa' | 'bekar') => {
    setIsVoting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onVote(option);
    setIsVoting(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const totalVotes = results.gajjab + results['yesto-ni-hunxa'] + results.bekar;
  
  const options = [
    { 
      key: 'gajjab' as const, 
      icon: ThumbsUp,
      label: 'Gajjab', 
      labelNepali: 'गजब',
      variant: 'vote-positive' as const,
      bgColor: 'bg-nepal-vote-positive-light',
      textColor: 'text-nepal-vote-positive',
      progressColor: 'bg-nepal-vote-positive'
    },
    { 
      key: 'yesto-ni-hunxa' as const, 
      icon: Meh,
      label: 'Yesto ni hunxa gathe', 
      labelNepali: 'यस्तो नी हुन्छ गथे',
      variant: 'vote-neutral' as const,
      bgColor: 'bg-nepal-vote-neutral-light',
      textColor: 'text-nepal-vote-neutral',
      progressColor: 'bg-nepal-vote-neutral'
    },
    { 
      key: 'bekar' as const, 
      icon: ThumbsDown,
      label: 'Bekar', 
      labelNepali: 'बेकार',
      variant: 'vote-negative' as const,
      bgColor: 'bg-nepal-vote-negative-light',
      textColor: 'text-nepal-vote-negative',
      progressColor: 'bg-nepal-vote-negative'
    }
  ];

  return (
    <div className="voting-card-nepal nepal-shadow hover:nepal-shadow-hover transition-all duration-300 nepal-corner-accent nepal-glow">
      <div className="relative">
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold nepal-text-gradient mb-2">
                {titleNepali && (
                  <span className="block text-2xl mb-1 font-semibold text-nepal-blue-900">
                    {titleNepali}
                  </span>
                )}
                {title}
              </h3>
              <p className="text-nepal-blue-700 text-base leading-relaxed font-medium">
                {description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="nepal-badge">
              {language === 'ne' ? 'पारम्परिक मतदान' : 'Traditional Voting'}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>{language === 'ne' ? 'गुमनाम' : 'Anonymous'}</span>
            </div>
          </div>
        </div>

        <div className="px-6 pt-0">
          {/* Voting Options */}
          <div className="space-y-3">
            {options.map((option) => {
              const percentage = totalVotes > 0 ? (results[option.key] / totalVotes) * 100 : 0;
              const isSelected = userVote === option.key;
              const Icon = option.icon;
              
              return (
                <div key={option.key} className="relative">
                  <button
                    onClick={() => handleVote(option.key)}
                    disabled={isVoting || showResults}
                    className={`w-full p-4 rounded-lg transition-all duration-300 ${
                      isSelected 
                        ? 'nepal-btn-primary nepal-shadow' 
                        : 'nepal-btn-secondary nepal-glow'
                    } ${!showResults && !isSelected ? 'hover:scale-[1.02]' : ''} ${
                      isVoting ? 'animate-pulse' : ''
                    } ${showResults ? 'cursor-default' : ''}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full transition-colors ${
                          isSelected ? "bg-white/20" : "nepal-card-gradient"
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isSelected ? "text-current" : "text-nepal-blue-800"
                          }`} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-left">
                            {option.labelNepali}
                          </div>
                          <div className="text-xs opacity-80 text-left">
                            {option.label}
                          </div>
                        </div>
                      </div>
                      
                      {showResults && (
                        <div className="text-right">
                          <div className="font-bold text-lg nepal-text-gradient">{results[option.key]}</div>
                          <div className="text-xs opacity-70">{percentage.toFixed(1)}%</div>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Progress Bar */}
                  {showResults && (
                    <div className="mt-2 px-4">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${
                            option.key === 'gajjab' ? 'nepal-progress-red' : 
                            option.key === 'bekar' ? 'nepal-progress-blue' : 
                            'bg-gradient-to-r from-nepal-red-500 to-nepal-blue-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-nepal-blue-600 mt-1">
                        <span>{results[option.key]} votes</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 pt-4 flex-col space-y-4">
          {/* Results Summary */}
          {showResults && (
            <div className="w-full">
              <div className="w-full h-px bg-gradient-to-r from-nepal-red-300 to-nepal-blue-300 mb-4"></div>
              <div className="flex items-center justify-between text-sm text-nepal-blue-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {language === 'ne' ? 'कुल मत:' : 'Total votes:'} {totalVotes}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-nepal-red-600" />
                    <span>{language === 'ne' ? 'सुरक्षित' : 'Secure'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{language === 'ne' ? 'वास्तविक समय' : 'Real-time'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="w-full">
            <div className="w-full h-px bg-gradient-to-r from-nepal-red-300 to-nepal-blue-300 mb-4"></div>
            <button
              onClick={() => setShowComments(!showComments)}
              className="w-full text-left p-0 h-auto text-sm font-medium text-nepal-blue-700 hover:text-nepal-blue-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {language === 'ne' ? 'टिप्पणीहरू' : 'Comments'} ({comments.length})
            </button>

            {showComments && (
              <div className="mt-4 space-y-4">
                {/* Add Comment */}
                {onAddComment && (
                  <div className="space-y-2">
                    <textarea
                      placeholder={language === 'ne' ? 'आफ्नो विचार साझा गर्नुहोस्...' : 'Share your thoughts...'}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full min-h-[80px] p-3 border-2 border-nepal-blue-200 rounded-lg focus:border-nepal-blue-500 focus:outline-none resize-none nepal-card-gradient"
                      rows={3}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="ml-auto flex items-center nepal-btn-primary px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {language === 'ne' ? 'पठाउनुहोस्' : 'Post'}
                    </button>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {comments.length === 0 ? (
                    <div className="text-center py-6 text-nepal-blue-600">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        {language === 'ne' 
                          ? 'अहिलेसम्म कुनै टिप्पणी छैन।'
                          : 'No comments yet.'}
                      </p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="nepal-card-gradient rounded-lg p-3 border-2 border-nepal-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full nepal-gradient flex items-center justify-center text-xs font-bold text-white">
                              {comment.author.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium">{comment.author}</span>
                          </div>
                          <span className="text-xs text-nepal-blue-600">
                            {comment.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-nepal-blue-800 mb-2">{comment.text}</p>
                        <div className="flex items-center gap-2">
                          <button className="h-6 px-2 text-xs nepal-btn-secondary rounded flex items-center">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {comment.votes}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}