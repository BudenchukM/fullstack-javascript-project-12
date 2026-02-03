.PHONY: setup build start dev test install lint

# Установка зависимостей
setup:
	npm ci
	cd frontend && npm ci

install:
	npm ci
	cd frontend && npm ci

# Сборка фронтенда (устанавливаем зависимости перед сборкой)
build:
	cd frontend && npm ci && npm run build

# Запуск Hexlet Chat Server с фронтендом
start:
	npx start-server -s ./frontend/dist

# Запуск dev-сервера фронтенда (React) с проксированием API
dev:
	cd frontend && npm run dev

# Запуск тестов
test:
	npm test

# Линтинг фронтенда
lint:
	cd frontend && npx eslint .
