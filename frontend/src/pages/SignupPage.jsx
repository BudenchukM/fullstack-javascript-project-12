import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const { t } = useTranslation(); // ✅ i18n

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, t('signup.validation.usernameLength'))
      .max(20, t('signup.validation.usernameLength'))
      .required(t('signup.validation.required')),
    password: yup
      .string()
      .min(6, t('signup.validation.passwordLength'))
      .required(t('signup.validation.required')),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password')],
        t('signup.validation.passwordsMatch')
      )
      .required(t('signup.validation.required')),
  });

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>{t('signup.title')}</h2>

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
              setSignupError(t('signup.errors.exists'));
            } else {
              setSignupError(t('signup.errors.common'));
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="d-flex flex-column gap-3">
            <div>
              <label>{t('signup.username')}</label>
              <Field
                name="username"
                className="form-control"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div>
              <label>{t('signup.password')}</label>
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
              <label>{t('signup.confirmPassword')}</label>
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
              <div className="text-danger">
                {signupError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {t('signup.submit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;
