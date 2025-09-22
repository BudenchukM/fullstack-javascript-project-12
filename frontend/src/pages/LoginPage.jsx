import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
  <div className="container mt-5">
    <h2>Вход</h2>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log('Форма отправлена', values);
      }}
    >
      {() => (
        <Form className="d-flex flex-column gap-3" style={{ maxWidth: '300px' }}>
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

          <button type="submit" className="btn btn-primary">Войти</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginPage;
