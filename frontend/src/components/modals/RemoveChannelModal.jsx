import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { closeModal } from '../../store/slices/modalsSlice';
import { removeChannel } from '../../store/slices/channelsSlice';
import { setMessages } from '../../store/slices/messagesSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channel } = useSelector((state) => state.modals);
  const messages = useSelector((state) => state.messages);

  const handleRemove = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`/api/v1/channels/${channel.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redux
      dispatch(removeChannel(channel.id));
      dispatch(
        setMessages(messages.filter((m) => m.channelId !== channel.id))
      );

      // ✅ Toast
      toast.success(t('toasts.channelRemoved'));

      dispatch(closeModal());
    } catch (err) {
      console.error(err);

      if (!err.response) {
        toast.error(t('toasts.networkError'));
      } else {
        toast.error(t('toasts.channelRemoveError'));
      }
    }
  };

  return (
    <div>
      <p>
        {t('modals.removeChannel.confirm')} «{channel.name}»?
      </p>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch(closeModal())}
        >
          {t('modals.removeChannel.cancel')}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleRemove}
        >
          {t('modals.removeChannel.submit')}
        </button>
      </div>
    </div>
  );
};

export default RemoveChannelModal;
