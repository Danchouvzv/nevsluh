import LetterForm from '../../components/LetterForm';

export default function LetterPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Письмо себе в будущее
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Напишите письмо, которое вы получите в выбранную дату. Это может быть напоминание о мечтах, 
          цели, которые вы хотите достичь, или просто послание будущему себе.
        </p>
      </div>
      
      <LetterForm />
      
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Зачем писать себе?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Письмо себе в будущее — это способ связаться с собой через время. 
          Это может быть напоминание о том, кем вы хотите стать, что хотите сделать или как изменились.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Когда вы получите это письмо через месяцы или годы, оно может стать источником 
          вдохновения, ностальгии или даже поводом для размышлений о том, как далеко вы продвинулись.
        </p>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Все письма хранятся в зашифрованном виде и доступны только в указанную дату.</p>
      </div>
    </div>
  );
} 