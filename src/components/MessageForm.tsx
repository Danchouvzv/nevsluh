"use client";

import { useState, useRef, useEffect } from 'react';
import { addMessage } from '../lib/firestore';
import { MessageCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageFormProps {
  anonToken: string;
  onSuccess?: () => void;
}

export default function MessageForm({ anonToken, onSuccess }: MessageFormProps) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<MessageCategory>(MessageCategory.DREAM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const MAX_LENGTH = 1000;
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [isTyping]);
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_LENGTH) {
      setMessage(text);
      setCharCount(text.length);
      setIsTyping(true);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Пожалуйста, введите сообщение');
      shakeTextarea();
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await addMessage({
        body: message.trim(),
        category,
        anonToken,
      });
      
      setMessage('');
      setCharCount(0);
      setShowSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        if (onSuccess) onSuccess();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting message:', error);
      setError('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const shakeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.classList.add('shake-animation');
      setTimeout(() => {
        textareaRef.current?.classList.remove('shake-animation');
      }, 500);
    }
  };
  
  const categories = [
    { value: MessageCategory.DREAM, label: 'Мечта', emoji: '✨', color: 'from-blue-500 to-purple-500' },
    { value: MessageCategory.PAIN, label: 'Боль', emoji: '💔', color: 'from-red-500 to-pink-600' },
    { value: MessageCategory.HOPE, label: 'Надежда', emoji: '🌱', color: 'from-green-500 to-teal-500' },
    { value: MessageCategory.QUESTION, label: 'Вопрос', emoji: '❓', color: 'from-purple-500 to-indigo-500' },
    { value: MessageCategory.CONFESSION, label: 'Признание', emoji: '🤫', color: 'from-primaryPink to-accentPink' },
    { value: MessageCategory.STORY, label: 'История', emoji: '📖', color: 'from-amber-500 to-orange-500' },
  ];
  
  const currentCategory = categories.find(cat => cat.value === category) || categories[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-darkGray border border-gray-200 dark:border-gray-700 rounded-xl shadow-soft p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <motion.span 
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mr-3 text-3xl"
        >
          {currentCategory.emoji}
        </motion.span>
        Поделитесь своей мыслью
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Выберите категорию
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative overflow-hidden flex items-center justify-center px-4 py-3 rounded-xl border transition-all duration-300 ${
                  category === cat.value
                    ? 'border-transparent text-white shadow-md'
                    : 'bg-white dark:bg-darkGray text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-transparent hover:text-white'
                }`}
              >
                {/* Gradient background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} transition-opacity duration-300 ${
                    category === cat.value ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                
                {/* Content */}
                <span className="mr-2 text-xl relative z-10">{cat.emoji}</span>
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ваше сообщение
          </label>
          <div className="relative">
            <textarea
              ref={textareaRef}
              id="message"
              value={message}
              onChange={handleMessageChange}
              rows={5}
              placeholder={`Напишите ${currentCategory.label.toLowerCase()}...`}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primaryPink focus:border-primaryPink bg-white dark:bg-darkGray text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
              disabled={isSubmitting}
            ></textarea>
            
            <AnimatePresence>
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-2 right-2"
                >
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryPink opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryPink"></span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className={`absolute bottom-3 right-3 text-xs transition-colors duration-300 ${
              charCount > MAX_LENGTH * 0.8 
                ? 'text-amber-500 dark:text-amber-400' 
                : charCount > MAX_LENGTH * 0.95 
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
            }`}>
              {charCount}/{MAX_LENGTH}
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ваше сообщение успешно отправлено!
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting || message.trim().length === 0}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
              isSubmitting || message.trim().length === 0
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-primaryPink to-accentPink hover:shadow-lg hover:shadow-primaryPink/30'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </span>
            ) : 'Отправить'}
          </motion.button>
        </div>
      </form>

      <style jsx global>{`
        .shake-animation {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </motion.div>
  );
} 