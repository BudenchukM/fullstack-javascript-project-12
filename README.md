### Hexlet tests and linter status:
[![Actions Status](https://github.com/BudenchukM/fullstack-javascript-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/BudenchukM/fullstack-javascript-project-12/actions)

Приложение для чата в стиле Slack
Приложение для чата в реальном времени, разработанное в рамках учебной программы Hexlet. Этот проект демонстрирует интеграцию современных инструментов и технологий интерфейса для создания динамического интерфейса чата.

Особенности
Аутентификация пользователей – Безопасная регистрация и вход в систему

Обмен сообщениями в реальном времени – Мгновенная доставка сообщений через WebSockets

Управление каналами – Создание, переименование и удаление каналов

Модерация сообщений – Фильтр нецензурной лексики с использованием leo-profanity

Проверка форм – Формы на основе Formik и Yup

Отслеживание ошибок – Интегрированный Rollbar для отчетов об ошибках в производственной среде

Используемые технологии

Фронтенд:

React (с хуками)

Redux Toolkit

React Router DOM

Axios

Formik + Yup

React Bootstrap

React Toastify

i18next

leo-profanity

WebSockets: socket.io-client

Инструменты разработки:

Vite

ESLint (конфигурация Airbnb)

Rollbar


Установка:

Предварительные требования:

1 Node.js >= 14

2 npm


Настройка

Клонируйте репозиторий:

1 git clone git@github.com:BudenchukM/fullstack-javascript-project-12.git

2 Установите зависимости:
make install

3 Соберите для продакшена:
make build

4 Запустите сервер:
make start

5 Запустите линтер:
make lint

Учебный проект (упрощённый Slack).

Проект доступен онлайн по ссылке: [Hexlet Chat App](https://fullstack-javascript-project-12-2.onrender.com)
