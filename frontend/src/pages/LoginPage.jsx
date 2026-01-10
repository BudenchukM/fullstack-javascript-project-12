import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ i18n

  return (
    <div className="container mt-5">
      <h2>{t('login.title')}</h2>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const response = await axios.post('/api/v1/login', values);
            localStorage.setItem('token', response.data.token);
            navigate('/');
          } catch (err) {
            setError(t('login.errors.invalid'));
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
                <label htmlFor="username">
                  {t('login.username')}
                </label>
                <Field
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder={t('login.usernamePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="password">
                  {t('login.password')}
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder={t('login.passwordPlaceholder')}
                />
              </div>

              {error && (
                <div className="text-danger">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
              >
                {t('login.submit')}
              </button>
            </Form>

            {/* 🔹 Ссылка на регистрацию */}
            <p className="mt-3">
              {t('login.noAccount')}{' '}
              <Link to="/signup">
                {t('login.signup')}
              </Link>
            </p>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
