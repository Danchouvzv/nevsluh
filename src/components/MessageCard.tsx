"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Message, MessageCategory } from '../types';
import { addReaction } from '../lib/firestore';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to get category emoji
const getCategoryEmoji = (category: MessageCategory): string => {
  switch (category) {
    case MessageCategory.DREAM:
      return '✨';
    case MessageCategory.PAIN:
      return '💔';
    case MessageCategory.HOPE:
      return '🌱';
    case MessageCategory.QUESTION:
      return '❓';
    case MessageCategory.CONFESSION:
      return '🤫';
    case MessageCategory.STORY:
      return '📖';
    default:
      return '💭';
  }
};

// Helper function to get category name in Russian
const getCategoryName = (category: MessageCategory): string => {
  switch (category) {
    case MessageCategory.DREAM:
      return 'Мечта';
    case MessageCategory.PAIN:
      return 'Боль';
    case MessageCategory.HOPE:
      return 'Надежда';
    case MessageCategory.QUESTION:
      return 'Вопрос';
    case MessageCategory.CONFESSION:
      return 'Признание';
    case MessageCategory.STORY:
      return 'История';
    default:
      return 'Сообщение';
  }
};

interface MessageCardProps {
  message: Message;
  anonToken: string;
}

export default function MessageCard({ message, anonToken }: MessageCardProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionCount, setReactionCount] = useState(message.reactionCount);
  const [isReacting, setIsReacting] = useState(false);
  const [showAIReply, setShowAIReply] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const handleReaction = async () => {
    if (hasReacted || isReacting) return;
    
    setIsReacting(true);
    
    try {
      const success = await addReaction(message.id, anonToken);
      
      if (success) {
        setHasReacted(true);
        setReactionCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    } finally {
      setIsReacting(false);
    }
  };
  
  const formattedDate = formatDistanceToNow(new Date(message.createdAt), { 
    addSuffix: true,
    locale: ru 
  });
  
  const getCategoryColor = (category: MessageCategory) => {
    switch (category) {
      case MessageCategory.DREAM:
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-800 dark:text-blue-300',
          gradient: 'from-blue-500 to-purple-500',
          shadow: 'shadow-blue-500/20'
        };
      case MessageCategory.PAIN:
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-800 dark:text-red-300',
          gradient: 'from-red-500 to-pink-600',
          shadow: 'shadow-red-500/20'
        };
      case MessageCategory.HOPE:
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-800 dark:text-green-300',
          gradient: 'from-green-500 to-teal-500',
          shadow: 'shadow-green-500/20'
        };
      case MessageCategory.QUESTION:
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          text: 'text-purple-800 dark:text-purple-300',
          gradient: 'from-purple-500 to-indigo-500',
          shadow: 'shadow-purple-500/20'
        };
      case MessageCategory.CONFESSION:
        return {
          bg: 'bg-pink-100 dark:bg-pink-900/30',
          text: 'text-pink-800 dark:text-pink-300',
          gradient: 'from-primaryPink to-accentPink',
          shadow: 'shadow-pink-500/20'
        };
      case MessageCategory.STORY:
        return {
          bg: 'bg-amber-100 dark:bg-amber-900/30',
          text: 'text-amber-800 dark:text-amber-300',
          gradient: 'from-amber-500 to-orange-500',
          shadow: 'shadow-amber-500/20'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          text: 'text-gray-800 dark:text-gray-300',
          gradient: 'from-gray-500 to-gray-600',
          shadow: 'shadow-gray-500/20'
        };
    }
  };

  const getCategoryLabel = (category: MessageCategory) => {
    switch (category) {
      case MessageCategory.DREAM: return 'Мечта';
      case MessageCategory.PAIN: return 'Боль';
      case MessageCategory.HOPE: return 'Надежда';
      case MessageCategory.QUESTION: return 'Вопрос';
      case MessageCategory.CONFESSION: return 'Признание';
      case MessageCategory.STORY: return 'История';
      default: return 'Мысль';
    }
  };
  
  const categoryEmoji = getCategoryEmoji(message.category);
  const categoryLabel = getCategoryLabel(message.category);
  const categoryColor = getCategoryColor(message.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="relative rounded-xl overflow-hidden"
    >
      {/* Gradient border effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${categoryColor.gradient} opacity-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : ''}`}
      />
      
      <div className="absolute inset-[1px] bg-white dark:bg-darkGray rounded-[11px]" />
      
      <div className="relative p-6 z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${categoryColor.bg} mr-3`}
            >
              <span className="text-xl">{categoryEmoji}</span>
            </motion.div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}>
                {categoryLabel}
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReaction}
            disabled={hasReacted || isReacting}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-colors duration-300 ${
              hasReacted
                ? 'bg-primaryPink/10 text-primaryPink'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primaryPink/10 hover:text-primaryPink'
            }`}
          >
            <motion.span 
              animate={hasReacted ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="mr-1"
            >
              🔥
            </motion.span>
            <span>{reactionCount}</span>
          </motion.button>
        </div>
        
        <div className="prose dark:prose-invert max-w-none mb-4">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{message.body}</p>
        </div>
        
        {message.aiReply && (
          <div className="mt-5">
            <button
              onClick={() => setShowAIReply(!showAIReply)}
              className="text-sm text-primaryPink hover:text-accentPink focus:outline-none flex items-center transition-colors duration-200"
            >
              <span>{showAIReply ? 'Скрыть отклик' : 'Показать отклик'}</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1"
                animate={{ rotate: showAIReply ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            
            <AnimatePresence>
              {showAIReply && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-5 rounded-lg relative overflow-hidden"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-lightPink/30 to-primaryPink/10 dark:from-darkPink/20 dark:to-primaryPink/5 opacity-50" />
                  
                  <div className="relative flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primaryPink to-accentPink flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic whitespace-pre-wrap leading-relaxed">
                      {message.aiReply}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
} 