/**
 * Генерирует случайный анонимный токен для идентификации пользователя
 * без сохранения личных данных
 */
export function generateAnonToken(): string {
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timestampPart = Date.now().toString(36);
  return `${randomPart}${timestampPart}`;
}

/**
 * Форматирует дату в локализованный формат
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Обрезает текст до указанной длины и добавляет многоточие
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Проверяет корректность email-адреса
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Генерирует случайный цвет в формате HEX
 */
export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Задержка выполнения на указанное количество миллисекунд
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Безопасно парсит JSON с обработкой ошибок
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
}

/**
 * Преобразует первую букву строки в заглавную
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 