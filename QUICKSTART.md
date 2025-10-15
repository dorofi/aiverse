# 🚀 AIverse - Быстрый запуск

## Windows (PowerShell/CMD)

### Разработка
```bash
# Запуск всех сервисов
start-dev.bat

# Или вручную
docker-compose up -d
```

### Продакшен
```bash
# Создайте .env файл с переменными окружения
# Затем запустите
deploy.bat
```

## Linux/Mac

### Разработка
```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

### Продакшен
```bash
# Создайте .env файл
cp .env.prod.example .env
# Отредактируйте .env файл

# Запуск продакшен версии
docker-compose -f docker-compose.prod.yml up -d --build
```

## Доступ к приложению

После запуска приложение будет доступно по адресам:

- **Frontend**: http://localhost:3000 (dev) / http://localhost (prod)
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Nginx**: http://localhost:80

## Первые шаги

1. Откройте http://localhost:3000
2. Зарегистрируйтесь или войдите
3. Создайте свой первый пост
4. Изучите API документацию на http://localhost:8000/docs

## Полезные команды

```bash
# Просмотр логов всех сервисов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Перезапуск сервиса
docker-compose restart backend

# Остановка всех сервисов
docker-compose down

# Очистка данных (ВНИМАНИЕ!)
docker-compose down -v
```

## Решение проблем

### Порт уже используется
```bash
# Остановите все контейнеры
docker-compose down

# Или измените порты в docker-compose.yml
```

### Проблемы с базой данных
```bash
# Пересоздайте базу данных
docker-compose down -v
docker-compose up -d
```

### Проблемы с зависимостями
```bash
# Пересоберите образы
docker-compose build --no-cache
docker-compose up -d
```
