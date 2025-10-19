# 🧠 AIverse

<div align="center">

**Социальная сеть для AI-генерируемого контента**

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)

[🚀 Демо](#-демо) • [📖 Документация](#-документация) • [🛠 Установка](#-установка) • [🤝 Вклад](#-вклад)

</div>

---

## 📖 О проекте

**AIverse** — это современная социальная платформа, где пользователи делятся контентом, полностью созданным искусственным интеллектом. От изображений и видео до текстов и аудио — здесь каждый может показать миру творения нейросетей.

### ✨ Ключевые особенности

- 🎨 **Полная поддержка медиа** — изображения, видео, аудио
- 🔐 **Безопасная аутентификация** — JWT токены, хеширование паролей
- 📱 **Адаптивный дизайн** — работает на всех устройствах
- ⚡ **Высокая производительность** — современный стек технологий
- 🐳 **Docker Ready** — простое развертывание в один клик
- 🔄 **CI/CD** — автоматический деплой через GitHub Actions

## 🚀 Демо

### Локальный запуск
```bash
git clone https://github.com/dorofi/aiverse.git
cd aiverse
docker-compose up -d
```

**Доступ к приложению:**
- 🌐 **Frontend**: http://localhost
- 🔧 **API**: http://localhost:8000
- 📚 **Документация**: http://localhost:8000/docs

## 🛠 Технологический стек

### Frontend
| Технология | Версия | Назначение |
|------------|--------|------------|
| **React** | 18+ | UI библиотека |
| **Vite** | Latest | Сборщик |
| **TailwindCSS** | Latest | Стилизация |
| **React Query** | Latest | Управление состоянием |
| **React Router** | Latest | Маршрутизация |
| **Axios** | Latest | HTTP клиент |

### Backend
| Технология | Версия | Назначение |
|------------|--------|------------|
| **FastAPI** | Latest | Web фреймворк |
| **SQLAlchemy** | Latest | ORM |
| **PostgreSQL** | 15 | База данных |
| **JWT** | Latest | Аутентификация |
| **Pydantic** | Latest | Валидация данных |

### Инфраструктура
| Технология | Назначение |
|------------|-----------|
| **Docker** | Контейнеризация |
| **Docker Compose** | Оркестрация |
| **Nginx** | Reverse proxy |
| **GitHub Actions** | CI/CD |

## 📁 Архитектура проекта

```
aiverse/
├── 🐳 docker-compose.yml          # Основная конфигурация
├── 📖 README.md                   # Документация
├── 🔧 .github/workflows/          # CI/CD пайплайны
│
├── 🖥️ frontend/                   # React приложение
│   ├── src/
│   │   ├── components/            # Переиспользуемые компоненты
│   │   │   ├── PostCard.jsx       # Карточка поста
│   │   │   ├── Comment.jsx        # Компонент комментария
│   │   │   └── ...
│   │   ├── pages/                 # Страницы приложения
│   │   │   ├── Home.jsx           # Главная страница
│   │   │   ├── Login.jsx          # Авторизация
│   │   │   └── ...
│   │   ├── contexts/              # React контексты
│   │   │   └── AuthContext.jsx    # Контекст аутентификации
│   │   └── api/                   # API клиент
│   │       └── api.js             # Axios конфигурация
│   ├── Dockerfile
│   └── package.json
│
├── ⚙️ backend/                    # FastAPI сервер
│   ├── app/
│   │   ├── main.py               # Точка входа
│   │   ├── models.py            # SQLAlchemy модели
│   │   ├── schemas.py           # Pydantic схемы
│   │   ├── database.py          # Конфигурация БД
│   │   ├── utils.py             # Утилиты
│   │   └── routes/              # API маршруты
│   │       ├── auth.py          # Аутентификация
│   │       ├── posts.py         # Посты и медиа
│   │       └── users.py         # Пользователи
│   ├── uploads/                 # Загруженные файлы
│   ├── Dockerfile
│   └── requirements.txt
│
└── 🌐 nginx/                     # Веб-сервер
    ├── nginx.conf               # Конфигурация
    └── Dockerfile
```

## 🚀 Быстрый старт

### Предварительные требования

- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Git** 2.0+

### 1️⃣ Клонирование репозитория

```bash
git clone https://github.com/dorofi/aiverse.git
cd aiverse
```

### 2️⃣ Запуск приложения

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f
```

### 3️⃣ Проверка работы

Откройте браузер и перейдите по адресу: **http://localhost**

## 🔧 Разработка

### Локальная разработка

#### Backend (FastAPI)

```bash
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows

# Установка зависимостей
pip install -r requirements.txt

# Настройка переменных окружения
export DATABASE_URL="postgresql://aiverse_user:aiverse_password@localhost:5432/aiverse"
export SECRET_KEY="your-secret-key"

# Запуск сервера
uvicorn app.main:app --reload
```

#### Frontend (React)

```bash
cd frontend

# Установка зависимостей
npm install

# Настройка переменных окружения
export VITE_API_URL="http://localhost:8000"

# Запуск dev сервера
npm run dev
```

### Полезные команды

```bash
# Просмотр логов конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx

# Перезапуск сервиса
docker-compose restart backend

# Остановка всех сервисов
docker-compose down

# Полная очистка (ВНИМАНИЕ: удалит все данные!)
docker-compose down -v

# Выполнение команд в контейнере
docker-compose exec backend python -c "print('Hello from backend!')"
docker-compose exec postgres psql -U aiverse_user -d aiverse
```

## 📚 API Документация

### Интерактивная документация

После запуска backend доступна по адресам:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Основные эндпоинты

#### 🔐 Аутентификация
```http
POST /api/auth/register    # Регистрация пользователя
POST /api/auth/login       # Вход в систему
GET  /api/auth/me         # Получение текущего пользователя
```

#### 📝 Посты
```http
GET    /api/posts/                    # Получить все посты
POST   /api/posts/                    # Создать пост
GET    /api/posts/{id}                # Получить пост по ID
POST   /api/posts/{id}/like           # Лайк/анлайк поста
POST   /api/posts/{id}/comments       # Добавить комментарий
GET    /api/posts/{id}/comments       # Получить комментарии
POST   /api/posts/upload              # Загрузка медиафайла
```

#### 👤 Пользователи
```http
GET /api/users/{id}           # Получить пользователя по ID
GET /api/users/{id}/posts      # Получить посты пользователя
```

### Примеры запросов

#### Регистрация
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

#### Создание поста
```bash
curl -X POST "http://localhost:8000/api/posts/" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Мой AI арт",
    "content": "Создано с помощью нейросети",
    "image_url": "/uploads/image.jpg"
  }'
```

## 🚀 Деплой

### Подготовка к продакшену

1. **Обновите переменные окружения:**

```bash
# Создайте .env файл
SECRET_KEY=your-super-secret-production-key-here
DATABASE_URL=postgresql://user:password@your-db-host:5432/aiverse
```

2. **Настройте домен в nginx.conf:**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    # ... остальная конфигурация
}
```

### Варианты деплоя

#### 🐳 VPS с Docker

```bash
# На вашем сервере
git clone https://github.com/dorofi/aiverse.git
cd aiverse

# Настройте переменные окружения
cp .env.example .env
nano .env

# Запустите в продакшене
docker-compose -f docker-compose.prod.yml up -d
```

#### ☁️ Облачные платформы

**Render.com:**
- Подключите GitHub репозиторий
- Настройте переменные окружения
- Используйте Dockerfile для деплоя

**Railway:**
- Подключите GitHub репозиторий
- Настройте переменные окружения
- Railway автоматически определит Docker конфигурацию

**DigitalOcean App Platform:**
- Подключите GitHub репозиторий
- Настройте переменные окружения
- Выберите Docker как тип приложения

## 🔒 Безопасность

- ✅ **Хеширование паролей** — bcrypt
- ✅ **JWT токены** — ограниченное время жизни
- ✅ **CORS** — настроен для безопасности
- ✅ **Валидация данных** — Pydantic схемы
- ✅ **SQL инъекции** — защита через ORM
- ✅ **Загрузка файлов** — проверка типов и размеров

## 📱 Адаптивность

Приложение полностью адаптивно и корректно работает на:

- 📱 **Мобильные устройства** (iOS, Android)
- 📱 **Планшеты** (iPad, Android tablets)
- 💻 **Десктопы** (Windows, macOS, Linux)

## 🎯 Roadmap

### Ближайшие планы
- [ ] 🔔 Уведомления в реальном времени
- [ ] 👥 Подписки на пользователей
- [ ] 🔍 Поиск по контенту
- [ ] 🏷️ Категории и теги
- [ ] 📊 Аналитика и статистика

### Долгосрочные цели
- [ ] 📱 Мобильное приложение (React Native)
- [ ] 🤖 Интеграция с AI сервисами
- [ ] 💬 Чат между пользователями
- [ ] 🎨 Редактор AI контента
- [ ] 🌍 Многоязычность

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Вот как вы можете помочь:

### 🐛 Сообщение об ошибках

1. Проверьте [существующие Issues](https://github.com/dorofi/aiverse/issues)
2. Создайте новый Issue с подробным описанием
3. Приложите логи и скриншоты

### 💡 Предложения функций

1. Создайте Issue с тегом `enhancement`
2. Опишите предлагаемую функцию
3. Объясните, как это улучшит проект

### 🔧 Разработка

1. **Форкните репозиторий**
2. **Создайте ветку для функции:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Зафиксируйте изменения:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Отправьте в ветку:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Откройте Pull Request**

### 📝 Документация

- Улучшение README
- Добавление примеров кода
- Перевод на другие языки

## 📄 Лицензия

Этот проект распространяется под лицензией **MIT**. См. файл [LICENSE](LICENSE) для подробностей.

## 🆘 Поддержка

Если у вас возникли проблемы:

1. 📖 Проверьте [документацию](#-документация)
2. 🔍 Поищите в [Issues](https://github.com/dorofi/aiverse/issues)
3. 💬 Создайте новый Issue
4. 📧 Свяжитесь с нами: [dorofii.2005@gmail.com](mailto:dorofii.2005@gmail.com)

## 🙏 Благодарности

- [FastAPI](https://fastapi.tiangolo.com/) — за отличный веб-фреймворк
- [React](https://reactjs.org/) — за мощную UI библиотеку
- [TailwindCSS](https://tailwindcss.com/) — за удобную стилизацию
- [Docker](https://www.docker.com/) — за простоту контейнеризации

---

<div align="center">

**Создано с ❤️ для демонстрации современных технологий веб-разработки**

[⭐ Поставьте звезду](https://github.com/dorofi/aiverse) • [🐛 Сообщить об ошибке](https://github.com/dorofi/aiverse/issues) • [💡 Предложить функцию](https://github.com/dorofi/aiverse/issues)

</div>