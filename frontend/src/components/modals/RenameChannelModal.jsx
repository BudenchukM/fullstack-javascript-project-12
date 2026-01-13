import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { renameChannel } from '../../store/slices/channelsSlice';
import { closeModal } from '../../store/slices/modalsSlice';

const RenameChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channel } = useSelector((state) => state.modals);
  const channels = useSelector((state) => state.channels.channels);

  const channelNames = channels
    .map((c) => c.name)
    .filter((name) => name !== channel.name);

  const schema = Yup.object({
    name: Yup.string()
      .min(3, t('signup.errors.usernameLength'))
      .max(20, t('signup.errors.usernameLength'))
      .required(t('signup.errors.required'))
      .notOneOf(channelNames, t('channels.errors.unique')),
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: channel.name }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const token = localStorage.getItem('token');

            const cleanedName = filter.clean(values.name);

            await axios.patch(
              `/api/v1/channels/${channel.id}`,
              { name: cleanedName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            dispatch(
              renameChannel({
                id: channel.id,
                name: cleanedName,
              }),
            );

            toast.success(t('toasts.channelRenamed'));
            dispatch(closeModal());
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
              <Button
                variant="secondary"
                onClick={() => dispatch(closeModal())}
              >
                {t('modals.renameChannel.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {t('modals.renameChannel.submit')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal;
