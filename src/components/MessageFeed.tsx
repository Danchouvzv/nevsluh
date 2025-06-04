"use client";

import { useState, useEffect } from 'react';
import { getRandomPublicMessages, Message } from '../lib/firestore';
import MessageCard from './MessageCard';
import { MessageCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

interface MessageFeedProps {
  limit?: number;
  featured?: boolean;
}

export default function MessageFeed({ limit = 10, featured = false }: MessageFeedProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anonToken, setAnonToken] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | 'ALL'>('ALL');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    // Generate or retrieve anonymous token for reactions
    const storedToken = localStorage.getItem('anonToken');
    if (storedToken) {
      setAnonToken(storedToken);
    } else {
      const newToken = uuidv4();
      localStorage.setItem('anonToken', newToken);
      setAnonToken(newToken);
    }

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const fetchedMessages = await getRandomPublicMessages(limit);
        setMessages(fetchedMessages);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Не удалось загрузить сообщения. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [limit, featured]);

  const filteredMessages = selectedCategory === 'ALL' 
    ? messages 
    : messages.filter(message => message.category === selectedCategory);

  const getCategoryEmoji = (category: MessageCategory | 'ALL'): string => {
    switch (category) {
      case MessageCategory.DREAM: return '✨';
      case MessageCategory.PAIN: return '💔';
      case MessageCategory.HOPE: return '🌱';
      case MessageCategory.QUESTION: return '❓';
      case MessageCategory.CONFESSION: return '🤫';
      case MessageCategory.STORY: return '📖';
      case 'ALL': return '🔍';
      default: return '💭';
    }
  };

  const getCategoryLabel = (category: MessageCategory | 'ALL'): string => {
    switch (category) {
      case MessageCategory.DREAM: return 'Мечты';
      case MessageCategory.PAIN: return 'Боль';
      case MessageCategory.HOPE: return 'Надежда';
      case MessageCategory.QUESTION: return 'Вопросы';
      case MessageCategory.CONFESSION: return 'Признания';
      case MessageCategory.STORY: return 'Истории';
      case 'ALL': return 'Все';
      default: return 'Все';
    }
  };

  const categories: (MessageCategory | 'ALL')[] = [
    'ALL',
    MessageCategory.DREAM,
    MessageCategory.PAIN,
    MessageCategory.HOPE,
    MessageCategory.QUESTION,
    MessageCategory.CONFESSION,
    MessageCategory.STORY
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-100"
          >
            {featured ? 'Избранные сообщения' : 'Недавние сообщения'}
          </motion.h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="flex items-center px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="mr-2">{getCategoryEmoji(selectedCategory)}</span>
            <span>{getCategoryLabel(selectedCategory)}</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2"
              animate={{ rotate: isFilterVisible ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>
        
        <AnimatePresence>
          {isFilterVisible && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-primaryPink to-accentPink text-white shadow-md' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{getCategoryEmoji(category)}</span>
                    <span>{getCategoryLabel(category)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-darkGray border border-gray-200 dark:border-gray-700 rounded-xl p-6 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded-full mt-2"></div>
                  </div>
                </div>
                <div className="h-8 w-16 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-5/6"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-800 dark:text-red-300 p-4 rounded-lg text-center"
        >
          {error}
        </motion.div>
      ) : filteredMessages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-8 rounded-xl text-center"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            Сообщений не найдено
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {selectedCategory !== 'ALL' 
              ? `В категории "${getCategoryLabel(selectedCategory)}" пока нет сообщений.`
              : 'Пока никто не поделился своими мыслями. Будьте первым!'}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCard message={message} anonToken={anonToken} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
} 