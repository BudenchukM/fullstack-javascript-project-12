import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container mt-5 text-center">
    <h2>404 – Страница не найдена</h2>
    <p>
      Вернуться на <Link to="/">главную</Link>.
    </p>
  </div>
);

export default NotFoundPage;
