import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-darkGray shadow-soft-up mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-primaryPink">nevsluh</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Пространство для невысказанных мыслей
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">О проекте</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primaryPink transition-colors duration-200">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primaryPink transition-colors duration-200">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Разделы</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/write" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primaryPink transition-colors duration-200">
                    Написать
                  </a>
                </li>
                <li>
                  <a href="/read" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primaryPink transition-colors duration-200">
                    Читать
                  </a>
                </li>
                <li>
                  <a href="/future" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primaryPink transition-colors duration-200">
                    Письма в будущее
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} nevsluh. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
} 