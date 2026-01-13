import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import socket from './socket';
import ChannelsList from './components/Channels/ChannelsList';

import { setChannels } from './store/slices/channelsSlice';
import { setMessages, addMessage } from './store/slices/messagesSlice';

const App = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // 🔹 Redux state
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannelId,
  );
  const messages = useSelector((state) => state.messages);

  // 🔹 Сообщения только активного канала
  const filteredMessages = messages.filter(
    (m) => m.channelId === activeChannelId,
  );

  // 🔹 Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setChannels(response.data.channels));
        dispatch(setMessages(response.data.messages));
      } catch (err) {
        if (!err.response) {
          toast.error(t('toasts.networkError'));
        } else {
          toast.error(t('toasts.loadError'));
        }
      }
    };

    fetchData();
  }, [dispatch, t]);

  // 🔹 WebSocket: новые сообщения
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  // 🔹 Отправка сообщения + фильтрация
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawBody = e.target.message.value.trim();
    if (!rawBody) return;

    const body = filter.clean(rawBody);
    e.target.reset();

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/v1/messages',
        {
          body,
          channelId: activeChannelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      toast.error(t('toasts.networkError'));
    }
  };

  return (
    <div className="container mt-5">
      <h2>{t('chat.title')}</h2>

      <div className="row">
        {/* Каналы */}
        <div className="col-4">
          <h4>{t('chat.channels')}</h4>
          <ChannelsList />
        </div>

        {/* Сообщения */}
        <div className="col-8 d-flex flex-column">
          <h4>{t('chat.messages')}</h4>

          <ul className="list-group mb-3 flex-grow-1 overflow-auto">
            {filteredMessages.map((message) => (
              <li key={message.id} className="list-group-item">
                <strong>{message.username}:</strong>{' '}
                {message.body}
              </li>
            ))}
          </ul>

          {/* Форма отправки */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                name="message"
                className="form-control"
                placeholder={t('chat.messagePlaceholder')}
                required
              />
              <button className="btn btn-primary" type="submit">
                {t('chat.send')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
