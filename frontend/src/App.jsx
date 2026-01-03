import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setChannels } from './store/slices/channelsSlice';
import { setMessages } from './store/slices/messagesSlice';

const App = () => {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);

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

  return (
    <div className="container mt-5">
      <h2>Чат</h2>

      <div className="row">
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

        <div className="col-8">
          <h4>Сообщения</h4>
          <ul className="list-group">
            {messages.map((message) => (
              <li key={message.id} className="list-group-item">
                <strong>{message.username}:</strong> {message.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
