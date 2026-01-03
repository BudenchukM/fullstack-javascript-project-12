import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/slices/modalsSlice';
import { removeChannel } from '../../store/slices/channelsSlice';
import { setMessages } from '../../store/slices/messagesSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { channel } = useSelector((state) => state.modals);
  const messages = useSelector((state) => state.messages);

  const handleRemove = async () => {
    const token = localStorage.getItem('token');

    await axios.delete(`/api/v1/channels/${channel.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(removeChannel(channel.id));
    dispatch(setMessages(messages.filter((m) => m.channelId !== channel.id)));
    dispatch(closeModal());
  };

  return (
    <div>
      <p>Удалить канал «{channel.name}»?</p>
      <button className="btn btn-danger me-2" onClick={handleRemove}>
        Удалить
      </button>
      <button className="btn btn-secondary" onClick={() => dispatch(closeModal())}>
        Отмена
      </button>
    </div>
  );
};

export default RemoveChannelModal;
