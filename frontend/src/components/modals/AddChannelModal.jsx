import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { addChannel } from '../../store/slices/channelsSlice';

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { t } = useTranslation();

  const channelNames = channels.map((c) => c.name);

  const schema = Yup.object({
    name: Yup.string()
      .min(3)
      .max(20)
      .required(t('signup.errors.required'))
      .notOneOf(channelNames, t('channels.errors.unique')),
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const token = localStorage.getItem('token');

            const cleanedName = filter.clean(values.name);

            const response = await axios.post(
              '/api/v1/channels',
              { name: cleanedName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            dispatch(addChannel(response.data));
            toast.success(t('toasts.channelAdded'));
            onHide();
          } catch (err) {
            toast.error(t('toasts.networkError'));
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
          touched,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>{t('channels.name')}</Form.Label>
                <Form.Control
                  name="name"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {t('modals.addChannel.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {t('modals.addChannel.submit')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
