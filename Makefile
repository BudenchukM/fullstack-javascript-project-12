.PHONY: setup build start dev test install lint

# Установка зависимостей
setup:
	npm ci
	cd frontend && npm ci

install:
	npm ci
	cd frontend && npm ci

# Сборка фронтенда
build:
	cd frontend && npm run build

# Запуск Hexlet Chat Server с фронтендом
start:
	npx start-server -s ./frontend/dist

# Запуск dev-сервера фронтенда (React) с проксированием
dev:
	cd frontend && npm run dev

# Запуск тестов
test:
	npm test

# Линтинг фронтенда
lint:
	cd frontend && npx eslint .
