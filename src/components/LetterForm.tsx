"use client";

import { useState, useRef, useEffect } from 'react';
import { addFutureLetter } from '../lib/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, addYears } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function LetterForm() {
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date>(addMonths(new Date(), 3));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_CHARS = 2000;
  
  const timeOptions = [
    { value: 3, label: '3 месяца', unit: 'month' },
    { value: 6, label: '6 месяцев', unit: 'month' },
    { value: 1, label: '1 год', unit: 'year' },
    { value: 2, label: '2 года', unit: 'year' },
    { value: 5, label: '5 лет', unit: 'year' }
  ];
  
  useEffect(() => {
    setCharCount(body.length);
  }, [body]);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setBody(value);
      setIsTyping(true);
    }
  };

  const handleTimeChange = (option: { value: number; unit: string }) => {
    const newDate = option.unit === 'month' 
      ? addMonths(new Date(), option.value)
      : addYears(new Date(), option.value);
    
    setDeliveryDate(newDate);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!body.trim()) {
      setError('Пожалуйста, напишите текст письма');
      shakeTextarea();
      return;
    }
    
    if (!recipient.trim()) {
      setError('Пожалуйста, укажите получателя');
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setError('Пожалуйста, укажите корректный email');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addFutureLetter({
        body,
        recipient,
        email,
        deliveryDate: deliveryDate.toISOString(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      
      setSuccess(true);
      setBody('');
      setRecipient('');
      setEmail('');
      setDeliveryDate(addMonths(new Date(), 3));
    } catch (err) {
      console.error('Error submitting letter:', err);
      setError('Произошла ошибка при отправке письма. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shakeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.classList.add('shake');
      setTimeout(() => {
        textareaRef.current?.classList.remove('shake');
      }, 600);
    }
  };

  const getCharCountColor = () => {
    const percentage = charCount / MAX_CHARS;
    if (percentage < 0.7) return 'text-green-500 dark:text-green-400';
    if (percentage < 0.9) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-darkGray rounded-xl shadow-soft overflow-hidden">
        <div className="relative overflow-hidden">
          {/* Decorative header */}
          <div className="absolute inset-0 bg-gradient-to-r from-primaryPink to-accentPink opacity-90 h-24"></div>
          <div className="absolute top-0 left-0 w-full h-24 bg-[url('/images/pattern.svg')] bg-repeat opacity-10"></div>
          
          <div className="relative pt-16 px-6 pb-6">
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
            >
              <div className="text-3xl">✉️</div>
            </motion.div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mt-10 mb-6">
              Письмо в будущее
            </h2>
            
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6"
                >
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                    Письмо отправлено в будущее!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 mb-4">
                    Оно будет доставлено {format(deliveryDate, 'PPP', { locale: ru })}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Написать еще одно письмо
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Кому вы пишете?
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Например: Будущему мне, Моему ребенку, Моему партнеру..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primaryPink focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ваше письмо
                      </label>
                      <span className={`text-xs ${getCharCountColor()}`}>
                        {charCount}/{MAX_CHARS}
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={body}
                        onChange={handleTextChange}
                        placeholder="Напишите письмо своему будущему я или близкому человеку..."
                        rows={8}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primaryPink focus:border-transparent transition-all duration-200 resize-none"
                      />
                      <AnimatePresence>
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-3 right-3 text-xs text-gray-400"
                          >
                            печатает...
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Когда доставить письмо?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {timeOptions.map((option) => (
                        <motion.button
                          key={`${option.value}-${option.unit}`}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeChange(option)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            (option.unit === 'month' && option.value === 3 && deliveryDate.getTime() === addMonths(new Date(), 3).getTime()) ||
                            (option.unit === 'month' && option.value === 6 && deliveryDate.getTime() === addMonths(new Date(), 6).getTime()) ||
                            (option.unit === 'year' && option.value === 1 && deliveryDate.getTime() === addYears(new Date(), 1).getTime()) ||
                            (option.unit === 'year' && option.value === 2 && deliveryDate.getTime() === addYears(new Date(), 2).getTime()) ||
                            (option.unit === 'year' && option.value === 5 && deliveryDate.getTime() === addYears(new Date(), 5).getTime())
                              ? 'bg-gradient-to-r from-primaryPink to-accentPink text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Письмо будет доставлено: {format(deliveryDate, 'PPP', { locale: ru })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email для доставки
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primaryPink focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primaryPink to-accentPink hover:shadow-lg hover:shadow-primaryPink/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </div>
                    ) : (
                      'Отправить письмо в будущее'
                    )}
                  </motion.button>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    Мы отправим ваше письмо на указанный email в выбранную дату.
                    <br />Письмо хранится в зашифрованном виде и доступно только получателю.
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .shake {
          animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </motion.div>
  );
} 