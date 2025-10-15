# 🧠 AIverse - AI-Generated Content Social Network

AIverse — это минималистичная социальная платформа, где пользователи делятся контентом, полностью созданным нейросетями (видео, фото, тексты, аудио и т.д.). Проект демонстрирует полный цикл разработки веб-приложения: от backend API до frontend-интерфейса и деплоя через Docker и CI/CD.

## 🚀 Функционал (MVP)

- ✅ Регистрация и авторизация пользователей (JWT-токены)
- ✅ Главная лента с контентом других пользователей
- ✅ Страница профиля с публикациями пользователя
- ✅ Добавление нового поста (изображение, видео, подпись)
- ✅ Возможность лайкать и комментировать публикации
- ✅ Адаптивный дизайн под мобильные устройства

## 🛠 Технологии

### Frontend
- **React 18** - современная библиотека для создания пользовательских интерфейсов
- **Vite** - быстрый инструмент сборки
- **TailwindCSS** - utility-first CSS фреймворк
- **React Query** - управление состоянием сервера
- **React Router** - маршрутизация
- **Axios** - HTTP клиент

### Backend
- **FastAPI** - современный веб-фреймворк для Python
- **SQLAlchemy** - ORM для работы с базой данных
- **PostgreSQL** - реляционная база данных
- **JWT** - аутентификация
- **Pydantic** - валидация данных

### Инфраструктура
- **Docker** - контейнеризация
- **Docker Compose** - оркестрация контейнеров
- **Nginx** - веб-сервер и прокси
- **GitHub Actions** - CI/CD

## 📁 Структура проекта

```
aiverse/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # Главный файл приложения
│   │   ├── models.py       # SQLAlchemy модели
│   │   ├── schemas.py      # Pydantic схемы
│   │   ├── database.py     # Настройка БД
│   │   └── routes/         # API роуты
│   │       ├── auth.py     # Аутентификация
│   │       └── posts.py    # Посты и медиа
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── contexts/      # React контексты
│   │   └── api/           # API клиент
│   ├── Dockerfile
│   └── package.json
├── nginx/                 # Nginx конфигурация
│   ├── nginx.conf
│   └── Dockerfile
├── .github/workflows/     # GitHub Actions
├── docker-compose.yml     # Docker Compose конфигурация
└── README.md
```

## 🚀 Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Git

### Установка и запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone <repository-url>
   cd aiverse
   ```

2. **Запустите приложение с помощью Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Откройте приложение в браузере:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Nginx (общий доступ): http://localhost:80

### Первоначальная настройка

1. **Создайте суперпользователя (опционально):**
   ```bash
   docker-compose exec backend python -c "
   from app.database import create_tables
   from app.models import User
   from sqlalchemy.orm import sessionmaker
   from sqlalchemy import create_engine
   import os
   
   create_tables()
   engine = create_engine(os.getenv('DATABASE_URL'))
   SessionLocal = sessionmaker(bind=engine)
   db = SessionLocal()
   
   # Создайте пользователя если нужно
   db.close()
   "
   ```

## 🔧 Разработка

### Локальная разработка без Docker

#### Backend

1. **Установите Python 3.11+**
2. **Создайте виртуальное окружение:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # или
   venv\Scripts\activate     # Windows
   ```

3. **Установите зависимости:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Настройте переменные окружения:**
   ```bash
   export DATABASE_URL="postgresql://aiverse_user:aiverse_password@localhost:5432/aiverse"
   export SECRET_KEY="your-secret-key"
   ```

5. **Запустите сервер:**
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend

1. **Установите Node.js 18+**
2. **Установите зависимости:**
   ```bash
   cd frontend
   npm install
   ```

3. **Настройте переменные окружения:**
   ```bash
   export VITE_API_URL="http://localhost:8000"
   ```

4. **Запустите dev сервер:**
   ```bash
   npm run dev
   ```

### Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск сервисов
docker-compose restart

# Остановка всех сервисов
docker-compose down

# Очистка данных (ВНИМАНИЕ: удалит все данные!)
docker-compose down -v
```

## 🌐 API Документация

После запуска backend, документация API доступна по адресам:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Основные эндпоинты

#### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Текущий пользователь

#### Посты
- `GET /api/posts/` - Получить все посты
- `POST /api/posts/` - Создать пост
- `GET /api/posts/{id}` - Получить пост по ID
- `POST /api/posts/{id}/like` - Лайк/анлайк поста
- `POST /api/posts/{id}/comments` - Добавить комментарий
- `GET /api/posts/{id}/comments` - Получить комментарии

## 🚀 Деплой

### Подготовка к продакшену

1. **Обновите переменные окружения:**
   ```bash
   # В docker-compose.yml или .env файле
   SECRET_KEY=your-super-secret-production-key
   DATABASE_URL=postgresql://user:password@your-db-host:5432/aiverse
   ```

2. **Настройте домен в nginx.conf:**
   ```nginx
   server_name your-domain.com;
   ```

### Варианты деплоя

#### 1. VPS с Docker
```bash
# На вашем сервере
git clone <repository-url>
cd aiverse
docker-compose -f docker-compose.prod.yml up -d
```

#### 2. Render.com
- Подключите GitHub репозиторий
- Настройте переменные окружения
- Используйте Dockerfile для деплоя

#### 3. Railway
- Подключите GitHub репозиторий
- Настройте переменные окружения
- Railway автоматически определит Docker конфигурацию

## 🔒 Безопасность

- Все пароли хешируются с помощью bcrypt
- JWT токены имеют ограниченное время жизни
- CORS настроен для безопасности
- Валидация всех входящих данных через Pydantic

## 📱 Адаптивность

Приложение полностью адаптивно и корректно работает на:
- 📱 Мобильных устройствах (iOS, Android)
- 💻 Планшетах
- 🖥 Десктопах

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.

## 🆘 Поддержка

Если у вас возникли проблемы:

1. Проверьте [Issues](https://github.com/your-username/aiverse/issues)
2. Создайте новый Issue с подробным описанием проблемы
3. Приложите логи и скриншоты если необходимо

## 🎯 Roadmap

- [ ] Уведомления в реальном времени
- [ ] Подписки на пользователей
- [ ] Поиск по контенту
- [ ] Категории и теги
- [ ] Мобильное приложение
- [ ] Интеграция с AI сервисами
- [ ] Аналитика и статистика

---

**Создано с ❤️ для демонстрации современных технологий веб-разработки**
