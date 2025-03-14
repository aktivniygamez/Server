# Fastify API с Sequelize и Redis

## 📌 Описание
Этот проект представляет собой API на **Fastify** с использованием **PostgreSQL** (через **Sequelize ORM**), кеширования в **Redis** и логирования через **log4js**. Включает функционал управления пользователями, продуктами и покупками.

## 🚀 Технологии
- 🟢 **Node.js / TypeScript** — основной стек разработки
- ⚡ **Fastify** — быстрый и минималистичный фреймворк
- 🗄 **Sequelize (sequelize-typescript)** — ORM для работы с PostgreSQL
- 🔥 **Redis** — кеширование запросов
- 📜 **log4js** — логирование

---

## 🔧 Установка и запуск
### 1️⃣ Установите зависимости
```sh
npm install
```

### 2️⃣ Настройте переменные окружения _(НЕОБЯЗАТЕЛЬНО, УЖЕ ПРОКИНУТО)_
Создайте файл `.env` и укажите:
```env
SKINPORT_API_URL=https://api.skinport.com/v1/items
REDIS_HOST=localhost
FASTIFY_SECRET=your_secret_key
```

### 3️⃣ Запустите PostgreSQL и Redis
Убедитесь, что **PostgreSQL** и **Redis** работают на вашем сервере.

### 4️⃣ Запустите сервер
```sh
npm run dev
```
Сервер стартует на **`http://localhost:3000`**

---

## 📡 API Эндпоинты
### 🔑 Аутентификация
#### ✅ Регистрация
`POST /register`
```json
{
  "name": "user1",
  "password": "password123"
}
```

#### 🔓 Вход
`POST /login`
```json
{
  "name": "user1",
  "password": "password123"
}
```

### 🛒 Продукты
#### 📜 Получение списка продуктов _(с кешем в Redis)_
`GET /items`

#### ➕ Добавление продукта
`POST /items`
```json
{
  "market_hash_name": "AK-47 Redline",
  "min_tradable_price": 12.5,
  "min_no_tradable_price": 10.0
}
```

### 💰 Покупки
#### 🛍 Покупка товара
`POST /purchase`
```json
{
  "productId": 1
}
```

---

## 🏗 Архитектура проекта
📂 **Основные директории:**
- `models/` – ORM модели (**User**, **Product**, **Purchases**)
- `controllers/` – обработка API-запросов (**UsersController**, **ProductsController**, **PurchaseController**)
- `services/` – вспомогательные сервисы (**Redis**, **LoggerService**, **Sequelize**)
- `app.ts` – точка входа, инициализация **Fastify**


