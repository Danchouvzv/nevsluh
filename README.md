# nevsluh

> Пространство, где можно сказать то, что не скажешь вслух

## О проекте

Nevsluh — это платформа для анонимного самовыражения, которая сочетает в себе онлайн-сервис и физические инсталляции. Проект позволяет людям анонимно делиться своими мыслями, мечтами, страхами и признаниями, которые они не могут или не хотят произносить вслух.

### Основные функции

- **Анонимные сообщения**: Поделитесь тем, что у вас на душе, без раскрытия личности.
- **Чтение сообщений других**: Узнайте, о чем думают и мечтают другие люди.
- **Письмо себе в будущее**: Отправьте сообщение, которое получите в выбранную дату.
- **AI-поддержка**: Получите эмпатичный ответ на ваше сообщение.
- **QR-коды для физических локаций**: Разместите QR-код в реальном мире для создания точки анонимного самовыражения.

## Технический стек

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **AI**: Gemini API (для генерации эмпатичных ответов)
- **Анимации**: Framer Motion

## Начало работы

### Предварительные требования

- Node.js (версия 18 или выше)
- npm или yarn
- Firebase аккаунт

### Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/yourusername/nevsluh.git
   cd nevsluh
   ```

2. Установите зависимости:
   ```bash
   npm install
   # или
   yarn install
   ```

3. Создайте файл `.env.local` на основе `.env.local.example` и заполните его вашими Firebase и Gemini API ключами.

4. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   # или
   yarn dev
   ```

5. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## Структура проекта

```
nevsluh/
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # React компоненты
│   ├── lib/               # Утилиты и API
│   └── types/             # TypeScript типы
├── public/                # Статические файлы
└── ...
```

## Firebase настройка

1. Создайте новый проект в [Firebase Console](https://console.firebase.google.com/).
2. Добавьте веб-приложение в ваш проект.
3. Включите Firestore, Authentication и Storage.
4. Скопируйте ключи конфигурации в ваш файл `.env.local`.

## Развертывание

Проект можно легко развернуть на Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nevsluh)

## Лицензия

Этот проект лицензирован под [MIT License](LICENSE).

## Контакты

- Email: contact@nevsluh.app
- Website: [nevsluh.app](https://nevsluh.app)
