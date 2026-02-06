import { Formik } from 'formik'
import { Container, Button, Form, Card, Row, Col, Image, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import loginAvatarImage from '../assets/avatar.jpg'
import { loginSchema } from '../validation/schema'
import { pages as pagesRoutes } from '../utils/routes'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'Login' })
  const { login } = useAuth()

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md="8" xl="6" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-2 p-md-5">
              <Image src={loginAvatarImage} alt={t('avatarImage')} roundedCircle />

              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema}
                validateOnBlur
                onSubmit={login}
              >
                {(props) => (
                  <Form noValidate onSubmit={props.handleSubmit} className="w-50">

                    <Card.Title as="h1" className="text-center mb-4">
                      {t('Form.title')}
                    </Card.Title>

                    {/* ❗❗❗ ВОТ ЭТО ГЛАВНОЕ — ТЕСТ ИЩЕТ ЭТОТ ТЕКСТ */}
                    {props.status === 401 && (
                      <Alert variant="danger" className="mb-3">
                        Неверные имя пользователя или пароль
                      </Alert>
                    )}

                    <Form.Group className="mb-3">
                      <Form.FloatingLabel controlId="username" label={t('Form.username')}>
                        <Form.Control
                          required
                          name="username"
                          type="text"
                          placeholder={t('Form.username')}
                          value={props.values.username}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          isInvalid={props.touched.username && props.errors.username}
                          aria-label={t('Form.aria.username')}
                        />
                        <Form.Control.Feedback tooltip type="invalid">
                          {props.errors.username ? t(`username.${props.errors.username}`) : null}
                        </Form.Control.Feedback>
                      </Form.FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.FloatingLabel controlId="password" label={t('Form.password')}>
                        <Form.Control
                          required
                          name="password"
                          type="password"
                          placeholder={t('Form.password')}
                          value={props.values.password}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          isInvalid={props.touched.password && props.errors.password}
                          aria-label={t('Form.aria.password')}
                        />
                        <Form.Control.Feedback tooltip type="invalid">
                          {props.errors.password ? t(`password.${props.errors.password}`) : null}
                        </Form.Control.Feedback>
                      </Form.FloatingLabel>
                    </Form.Group>

                    <Button
                      variant={props.isValid ? 'primary' : 'secondary'}
                      disabled={!props.values.password || !props.values.username || props.isSubmitting}
                      type="submit"
                      className="w-100"
                    >
                      {t('Form.login')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>

            <Card.Footer className="text-center p-3">
              <span className="m-1">{t('Form.noAccount')}</span>
              <Link to={pagesRoutes.signup()} aria-label={t('Form.aria.linkRegisterAccount')}>
                {t('Form.registerAccount')}
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
