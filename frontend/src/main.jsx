import './i18n';

import filter from 'leo-profanity';

// 🔹 инициализация фильтра (один раз)
filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';

import store from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <ToastContainer />

        <Routes>
          {/* Главная (чат) — защищена */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />

          {/* Страница входа */}
          <Route path="/login" element={<LoginPage />} />

          {/* Регистрация */}
          <Route path="/signup" element={<SignupPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
