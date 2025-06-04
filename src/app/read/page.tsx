"use client";

import { useEffect, useState } from 'react';
import MessageFeed from '@/components/MessageFeed';
import { generateAnonToken } from '@/lib/utils';

export default function ReadPage() {
  const [anonToken, setAnonToken] = useState<string>('');
  
  useEffect(() => {
    // Generate or retrieve anonymous token for reactions
    const storedToken = localStorage.getItem('anonToken');
    const token = storedToken || generateAnonToken();
    
    if (!storedToken) {
      localStorage.setItem('anonToken', token);
    }
    
    setAnonToken(token);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Читайте <span className="text-primaryPink">невысказанные мысли</span> других людей
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Здесь собраны анонимные сообщения от людей со всего мира. 
          Возможно, вы найдете здесь отражение своих собственных мыслей.
        </p>
      </div>
      
      {anonToken && <MessageFeed anonToken={anonToken} />}
    </div>
  );
} 