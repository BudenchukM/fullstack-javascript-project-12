import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
  <div className="container mt-5">
    <h2>Главная (чат будет здесь)</h2>
    <p>
      <Link to="/login">Перейти к логину</Link>
    </p>
  </div>
);

export default App;
