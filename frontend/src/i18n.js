import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      header: {
        title: 'Hexlet Chat',
        logout: 'Выйти',
      },

      auth: {
        login: 'Вход',
        signup: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        noAccount: 'Нет аккаунта?',
      },

      chat: {
        title: 'Чат',
        channels: 'Каналы',
        messages: 'Сообщения',
        send: 'Отправить',
        placeholder: 'Введите сообщение...',
      },

      errors: {
        invalidAuth: 'Неверные имя пользователя или пароль',
        userExists: 'Пользователь уже существует',
        required: 'Обязательное поле',
      },

      notFound: {
        title: 'Страница не найдена',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',           // ❗ строго ru
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
