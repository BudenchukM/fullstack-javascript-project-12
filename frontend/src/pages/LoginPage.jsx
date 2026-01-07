import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Вход</h2>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const response = await axios.post('/api/v1/login', values);
            localStorage.setItem('token', response.data.token);
            navigate('/');
          } catch (err) {
            setError('Неверные имя пользователя или пароль');
          }
        }}
      >
        {() => (
          <>
            <Form
              className="d-flex flex-column gap-3"
              style={{ maxWidth: '300px' }}
            >
              <div>
                <label htmlFor="username">Имя пользователя</label>
                <Field
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Введите имя"
                />
              </div>

              <div>
                <label htmlFor="password">Пароль</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Введите пароль"
                />
              </div>

              {error && <div className="text-danger">{error}</div>}

              <button type="submit" className="btn btn-primary">
                Войти
              </button>
            </Form>

            {/* 🔹 Ссылка на регистрацию */}
            <p className="mt-3">
              Нет аккаунта?{' '}
              <Link to="/signup">Регистрация</Link>
            </p>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
