import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Регистрация</h2>

      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSignupError(null);
          try {
            const response = await axios.post('/api/v1/signup', {
              username: values.username,
              password: values.password,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/');
          } catch (err) {
            if (err.response?.status === 409) {
              setSignupError('Пользователь уже существует');
            } else {
              setSignupError('Ошибка регистрации');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="d-flex flex-column gap-3">
            <div>
              <label>Имя пользователя</label>
              <Field name="username" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label>Пароль</label>
              <Field
                name="password"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label>Подтвердите пароль</label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </div>

            {signupError && (
              <div className="text-danger">{signupError}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;
