"use client";

import { useEffect, useState } from 'react';
import LetterForm from '@/components/LetterForm';
import { generateAnonToken } from '@/lib/utils';

export default function FuturePage() {
  const [anonToken, setAnonToken] = useState<string>('');
  
  useEffect(() => {
    // Generate or retrieve anonymous token
    let token = localStorage.getItem('anonToken');
    if (!token) {
      token = generateAnonToken();
      localStorage.setItem('anonToken', token);
    }
    setAnonToken(token);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Письмо <span className="text-primaryPink">в будущее</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Напишите письмо своему будущему я. Оно будет доставлено на указанный email 
          в выбранную вами дату.
        </p>
      </div>
      
      {anonToken && <LetterForm anonToken={anonToken} />}
      
      <div className="mt-12 bg-white dark:bg-darkGray border border-gray-200 dark:border-gray-700 rounded-xl shadow-soft p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Зачем писать письмо в будущее?
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primaryPink/10 flex items-center justify-center text-primaryPink">
              🎯
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Напоминание о целях</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Запишите свои текущие цели и мечты, чтобы в будущем оценить свой прогресс
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primaryPink/10 flex items-center justify-center text-primaryPink">
              💭
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Сохранение мыслей</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Зафиксируйте свои текущие мысли и чувства, чтобы вспомнить о них позже
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primaryPink/10 flex items-center justify-center text-primaryPink">
              🌱
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Отслеживание роста</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Увидьте, как изменились ваши взгляды, приоритеты и жизненные обстоятельства
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 