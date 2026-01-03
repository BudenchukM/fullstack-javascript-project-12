import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../../store/slices/channelsSlice';

const schema = Yup.object({
  name: Yup.string()
    .min(3)
    .max(20)
    .required()
    .notOneOf([], 'Имя должно быть уникальным'),
});

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const channels = useSelector((s) => s.channels.channels);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
              '/api/v1/channels',
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            dispatch(addChannel(response.data));
            onHide();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Control
                name="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                Добавить
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
