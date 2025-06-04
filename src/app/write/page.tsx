"use client";

import { useEffect, useState } from 'react';
import MessageForm from '@/components/MessageForm';
import { generateAnonToken } from '@/lib/utils';

export default function WritePage() {
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
          Поделитесь <span className="text-primaryPink">невысказанным</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Здесь вы можете анонимно выразить то, что не решаетесь сказать вслух.
          Выберите категорию и напишите свое сообщение.
        </p>
      </div>
      
      {anonToken && <MessageForm anonToken={anonToken} />}
      
      <div className="mt-12 bg-white dark:bg-darkGray border border-gray-200 dark:border-gray-700 rounded-xl shadow-soft p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Почему это важно?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Иногда нам нужно выговориться, но мы не можем сделать это в обычной жизни. 
          Анонимное пространство дает возможность освободиться от тяжести невысказанных мыслей.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Ваше сообщение может быть прочитано другими людьми, которые, возможно, 
          чувствуют то же самое. Так мы создаем невидимую связь между людьми, 
          которые никогда не встретятся, но поймут друг друга.
        </p>
      </div>
    </div>
  );
} 