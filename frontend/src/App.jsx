import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import socket from './socket';
import ChannelsList from './components/Channels/ChannelsList';

import { setChannels } from './store/slices/channelsSlice';
import { setMessages, addMessage } from './store/slices/messagesSlice';

const App = () => {
  const dispatch = useDispatch();

  // 🔹 Redux state
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannelId
  );
  const messages = useSelector((state) => state.messages);

  // 🔹 Сообщения только активного канала
  const filteredMessages = messages.filter(
    (m) => m.channelId === activeChannelId
  );

  // 🔹 Инициализация: загрузка каналов и сообщений
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
        console.error('Ошибка загрузки данных', err);
      }
    };

    fetchData();
  }, [dispatch]);

  // 🔹 Подписка на новые сообщения (WebSocket)
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  // 🔹 Отправка сообщения
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = e.target.message.value.trim();
    if (!body) return;

    e.target.reset();

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/v1/messages',
        {
          body,
          channelId: activeChannelId, // ✅ в активный канал
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ❗ сообщение не добавляем вручную
      // оно придёт через WebSocket
    } catch (err) {
      console.error('Ошибка отправки сообщения', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Чат</h2>

      <div className="row">
        {/* Каналы */}
        <div className="col-4">
          <h4>Каналы</h4>
          <ChannelsList />
        </div>

        {/* Сообщения */}
        <div className="col-8 d-flex flex-column">
          <h4>Сообщения</h4>

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
                placeholder="Введите сообщение..."
                required
              />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
