"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MessageFeed from '../components/MessageFeed';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [particles, setParticles] = useState<Array<{top: string, left: string, size: number, delay: number}>>([]);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({
    features: false,
    messages: false,
    howItWorks: false,
    cta: false
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    // Генерируем позиции частиц только на клиенте
    const newParticles = Array(8).fill(0).map(() => ({
      top: `${20 + Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Проверяем видимость секций
      const checkVisibility = (ref: React.RefObject<HTMLDivElement>, sectionName: string) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          setVisibleSections(prev => ({ ...prev, [sectionName]: isVisible }));
        }
      };
      
      checkVisibility(featuresRef, 'features');
      checkVisibility(messagesRef, 'messages');
      checkVisibility(howItWorksRef, 'howItWorks');
      checkVisibility(ctaRef, 'cta');
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Параллакс эффект для героя
  const heroParallax = scrollY * 0.4;

  // Иконки для фич
  const featureIcons = {
    privacy: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    ),
    support: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
      </svg>
    ),
    future: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
      </svg>
    )
  };

  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section с параллакс эффектом */}
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden py-28 md:py-36"
        style={{
          transform: `translateY(${heroParallax}px)`,
          opacity: opacity,
          scale: scale
        }}
      >
        {/* Фоновый градиент */}
        <div className="absolute inset-0 bg-gradient-to-br from-lightPink/20 to-primaryPink/10 dark:from-darkPink/20 dark:to-primaryPink/10 z-0 blur-in" />
        
        {/* Большие размытые круги */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-10 w-80 h-80 bg-primaryPink/15 dark:bg-primaryPink/15 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 right-10 w-[25rem] h-[25rem] bg-accentPink/15 dark:bg-accentPink/15 rounded-full blur-3xl"
        />
        
        {/* Анимированные частицы */}
        <div className="hidden md:block">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primaryPink to-accentPink"
              style={{
                top: particle.top,
                left: particle.left,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.6, 0.8, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6 text-shadow reveal-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-gradient">Невслух</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed typewriter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Платформа для анонимных признаний и мыслей
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href="/write" className="creative-button inline-block px-8 py-4 bg-gradient-to-r from-primaryPink to-accentPink text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Поделиться мыслью
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href="/read" className="creative-button inline-block px-8 py-4 bg-pink-light text-gray-800 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-accent">
                    Читать истории
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Плавающие карточки с фичами */}
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 relative">
              {[
                {
                  icon: featureIcons.privacy,
                  title: "Анонимность",
                  description: "Делитесь своими мыслями без страха быть узнанными. Полная анонимность гарантирована.",
                  delay: 0.2,
                  y: -5
                },
                {
                  icon: featureIcons.support,
                  title: "Поддержка",
                  description: "Получите эмпатичные отклики от AI, который поможет вам осмыслить свои чувства.",
                  delay: 0.4,
                  y: 10
                },
                {
                  icon: featureIcons.future,
                  title: "Письма в будущее",
                  description: "Отправьте письмо своему будущему я или близкому человеку, которое будет доставлено в указанную дату.",
                  delay: 0.6,
                  y: -8
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visibleSections.features ? { opacity: 1, y: feature.y } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: feature.delay,
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                  className="gradient-border hover-card card-3d"
                >
                  <div className="bg-pink-light dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-primaryPink to-accentPink rounded-lg flex items-center justify-center text-white text-3xl mb-4 mx-auto glow">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Волнистый разделитель */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12 md:h-20"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,56.44Z"
              className="fill-gray-50 dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </motion.section>
      
      {/* Recent messages section */}
      <section ref={messagesRef} className="py-20 bg-pink-light dark:bg-gray-900 relative">
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primaryPink/5 to-accentPink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-accentPink/5 to-primaryPink/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={visibleSections.messages ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections.messages ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient highlight-on-scroll">
                  Истории других людей
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto highlight-on-scroll">
                  Прочитайте анонимные истории и переживания других людей. Возможно, вы найдете что-то созвучное вашим мыслям.
                </p>
              </motion.div>
              
              <div className={`transition-all duration-700 ${visibleSections.messages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <MessageFeed limit={3} featured={true} />
              </div>
              
              <div className="text-center mt-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`transition-all duration-700 delay-300 ${visibleSections.messages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <Link href="/read" className="creative-button inline-block px-6 py-3 bg-gradient-to-r from-primaryPink to-accentPink text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Смотреть больше историй
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section ref={howItWorksRef} className="py-20 bg-pink-light/30 dark:bg-gray-900/50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primaryPink/5 to-accentPink/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-accentPink/5 to-primaryPink/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.howItWorks ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                Как это работает
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Простой процесс для обмена мыслями и эмоциями
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Соединительная линия между шагами */}
              <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-1 bg-gradient-to-r from-primaryPink via-accentPink to-primaryPink opacity-50" />
              
              {[
                {
                  number: "1",
                  title: "Напишите сообщение",
                  description: "Поделитесь своими мыслями, мечтами или признаниями анонимно",
                  delay: 0.1
                },
                {
                  number: "2",
                  title: "Получите отклик",
                  description: "AI анализирует ваше сообщение и предлагает эмпатичный отклик",
                  delay: 0.3
                },
                {
                  number: "3",
                  title: "Исследуйте другие истории",
                  description: "Читайте и взаимодействуйте с историями других пользователей",
                  delay: 0.5
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visibleSections.howItWorks ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: step.delay }}
                  className="flex flex-col items-center text-center relative"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-r from-primaryPink to-accentPink rounded-lg flex items-center justify-center text-white text-xl font-bold mb-5 shadow-md z-10 pulse"
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section ref={ctaRef} className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primaryPink to-accentPink opacity-90" />
        
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          
          {/* Анимированные частицы */}
          <div className="hidden md:block">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/20"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visibleSections.cta ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-effect p-8 rounded-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
                Готовы поделиться своими мыслями?
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам людей, которые уже делятся своими историями, мечтами и признаниями на нашей платформе
              </p>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="floating"
              >
                <Link href="/write" className="creative-button inline-block px-6 py-3 bg-white text-primaryPink font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  Начать сейчас
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
