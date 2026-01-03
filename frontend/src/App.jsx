import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import socket from './socket';
import { setChannels } from './store/slices/channelsSlice';
import { setMessages, addMessage } from './store/slices/messagesSlice';

const App = () => {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);

  // 🔹 Инициализация: получаем каналы и сообщения
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
          channelId: 1, // General
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ❗ сообщение НЕ добавляем вручную
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
          <ul className="list-group">
            {channels.map((channel) => (
              <li key={channel.id} className="list-group-item">
                {channel.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Сообщения */}
        <div className="col-8">
          <h4>Сообщения</h4>

          <ul className="list-group mb-3">
            {messages
              .filter((m) => m.channelId === 1) // General
              .map((message) => (
                <li key={message.id} className="list-group-item">
                  <strong>{message.username}:</strong> {message.body}
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
              <button className="btn btn-primary" type="submit">
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
