"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primaryPink to-accentPink">
              О проекте
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Невслух — это платформа для анонимного обмена мыслями, чувствами и историями
            </p>
          </motion.div>
          
          {/* Mission section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primaryPink/5 dark:bg-primaryPink/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accentPink/5 dark:bg-accentPink/10 rounded-full blur-3xl" />
              
              <div className="relative bg-white dark:bg-darkGray rounded-2xl shadow-soft overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primaryPink to-accentPink" />
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-primaryPink to-accentPink rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
                      ✨
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Наша миссия</h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          Мы создали Невслух, чтобы дать людям безопасное пространство для выражения своих истинных мыслей, чувств и историй — всего того, что иногда трудно или невозможно сказать вслух.
                        </p>
                        <p>
                          В современном мире, где социальные сети требуют постоянной демонстрации идеальной жизни, мы предлагаем место, где можно быть настоящим, уязвимым и честным — без страха осуждения или последствий.
                        </p>
                        <p>
                          Мы верим, что возможность анонимно поделиться своими переживаниями и получить эмпатичный отклик может стать первым шагом к принятию себя и исцелению.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* How it works */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Как это работает</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "✏️",
                  title: "Напишите",
                  description: "Поделитесь своими мыслями, мечтами, страхами или историями анонимно, выбрав подходящую категорию.",
                  color: "from-blue-400 to-indigo-500"
                },
                {
                  icon: "🤖",
                  title: "Получите отклик",
                  description: "Наш AI предложит эмпатичный отклик на ваше сообщение, помогая осмыслить и принять ваши чувства.",
                  color: "from-primaryPink to-accentPink"
                },
                {
                  icon: "🔍",
                  title: "Исследуйте",
                  description: "Читайте анонимные истории других людей, находите созвучные вашим переживаниям и оставляйте реакции.",
                  color: "from-amber-400 to-orange-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Features */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Особенности платформы</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Полная анонимность",
                  description: "Мы не собираем личные данные и не требуем регистрации. Ваши сообщения никак не связаны с вашей личностью.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )
                },
                {
                  title: "AI поддержка",
                  description: "Искусственный интеллект генерирует эмпатичные отклики на ваши сообщения, предлагая новый взгляд на ситуацию.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )
                },
                {
                  title: "Письма в будущее",
                  description: "Отправьте письмо своему будущему я или близкому человеку, которое будет доставлено в указанную дату.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: "Категории сообщений",
                  description: "Различные категории для разных типов сообщений: мечты, боль, надежда, вопросы, признания и истории.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-primaryPink/10 dark:bg-primaryPink/20 flex items-center justify-center text-primaryPink">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Team/Values */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-20"
          >
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primaryPink/5 dark:bg-primaryPink/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accentPink/5 dark:bg-accentPink/10 rounded-full blur-3xl" />
              
              <div className="relative bg-white dark:bg-darkGray rounded-2xl shadow-soft overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accentPink to-primaryPink" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Наши ценности</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        emoji: "🛡️",
                        title: "Безопасность",
                        description: "Мы создаем безопасное пространство, где каждый может выразить себя без страха осуждения или последствий."
                      },
                      {
                        emoji: "🤝",
                        title: "Эмпатия",
                        description: "Мы верим в силу эмпатии и понимания, которые помогают людям чувствовать себя услышанными и принятыми."
                      },
                      {
                        emoji: "🔒",
                        title: "Приватность",
                        description: "Мы уважаем вашу приватность и гарантируем анонимность всех сообщений на платформе."
                      },
                      {
                        emoji: "💡",
                        title: "Инновации",
                        description: "Мы используем современные технологии, чтобы создать уникальный опыт для наших пользователей."
                      }
                    ].map((value, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-4 text-2xl">{value.emoji}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{value.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Call to action */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="bg-gradient-to-r from-primaryPink to-accentPink rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы поделиться своими мыслями?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Присоединяйтесь к тысячам людей, которые уже делятся своими историями, мечтами и признаниями на нашей платформе
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/write" className="inline-block px-8 py-4 bg-white text-primaryPink font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Написать сообщение
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/read" className="inline-block px-8 py-4 bg-transparent text-white font-medium rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
                    Читать истории
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
} 