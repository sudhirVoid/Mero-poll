import React, { useState } from 'react';
import { MessageSquare, Heart, ThumbsUp, ThumbsDown, Send, Edit3, Trash2 } from 'lucide-react';
import { Comment } from '../types/voting';

interface CommentSystemProps {
  postId: string;
  postType: 'daily' | 'politician' | 'community' | 'sports' | 'entertainment';
  comments: Comment[];
  onAddComment: (text: string) => void;
  onReactToComment: (commentId: string, reaction: 'gajjab' | 'bekar' | 'yesto-ni-hunxa') => void;
  language: 'en' | 'ne';
}

export function CommentSystem({ 
  postId, 
  postType, 
  comments, 
  onAddComment, 
  onReactToComment, 
  language 
}: CommentSystemProps) {
  const [newComment, setNewComment] = useState('');
  const [wordCount, setWordCount] = useState(0);
  
  // Word limit based on post type
  const maxWords = postType === 'daily' ? 20 : 100;
  
  const handleCommentChange = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    if (words.length <= maxWords) {
      setNewComment(text);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && wordCount <= maxWords) {
      onAddComment(newComment.trim());
      setNewComment('');
      setWordCount(0);
    }
  };

  const reactions = [
    { key: 'gajjab', emoji: '🙌', label: 'Gajjab', labelNepali: 'गजब', color: 'text-green-600' },
    { key: 'yesto-ni-hunxa', emoji: '😐', label: 'Yesto ni hunxa', labelNepali: 'यस्तो नी हुन्छ', color: 'text-yellow-600' },
    { key: 'bekar', emoji: '👎', label: 'Bekar', labelNepali: 'बेकार', color: 'text-red-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border-4 border-transparent bg-clip-padding relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-blue-800 rounded-xl"></div>
      <div className="bg-white rounded-lg m-1 p-6 relative">
        
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <MessageSquare className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">
            {language === 'ne' ? 'टिप्पणीहरू' : 'Comments'} ({comments.length})
          </h3>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => handleCommentChange(e.target.value)}
              placeholder={language === 'ne' 
                ? 'आफ्नो विचार साझा गर्नुहोस्...' 
                : 'Share your thoughts...'}
              className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={3}
            />
            
            {/* Word Counter */}
            <div className={`absolute bottom-3 right-12 text-xs ${
              wordCount > maxWords - 5 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {wordCount}/{maxWords}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!newComment.trim() || wordCount > maxWords}
              className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-red-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>

          {/* Warning for word limit */}
          {wordCount > maxWords - 5 && (
            <div className="mt-2 text-sm text-orange-600">
              {language === 'ne' 
                ? `केवल ${maxWords - wordCount} शब्द बाँकी छ!`
                : `Only ${maxWords - wordCount} words remaining!`}
            </div>
          )}
        </form>

        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>{language === 'ne' 
                ? 'अहिलेसम्म कुनै टिप्पणी छैन। पहिलो टिप्पणी गर्नुहोस्!'
                : 'No comments yet. Be the first to comment!'}</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleDateString('ne-NP')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{comment.text}</p>
                    
                    {/* Reaction Buttons */}
                    <div className="flex items-center space-x-4">
                      {reactions.map((reaction) => (
                        <button
                          key={reaction.key}
                          onClick={() => onReactToComment(comment.id, reaction.key as any)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all duration-200 ${
                            comment.reaction === reaction.key
                              ? 'bg-white shadow-md scale-105'
                              : 'hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          <span className="text-sm">{reaction.emoji}</span>
                          <span className={`text-xs font-medium ${reaction.color}`}>
                            {language === 'ne' ? reaction.labelNepali : reaction.label}
                          </span>
                        </button>
                      ))}
                      
                      <div className="flex items-center space-x-1 text-gray-500 text-xs">
                        <Heart size={12} />
                        <span>{comment.votes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}