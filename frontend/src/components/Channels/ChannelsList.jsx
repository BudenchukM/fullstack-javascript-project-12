import { useDispatch, useSelector } from 'react-redux';
import ChannelItem from './ChannelItem';
import { setActiveChannel } from '../../store/slices/channelsSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { channels, activeChannelId } = useSelector((state) => state.channels);

  return (
    <ul className="list-group">
      {channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          isActive={channel.id === activeChannelId}
          onClick={() => dispatch(setActiveChannel(channel.id))}
        />
      ))}
    </ul>
  );
};

export default ChannelsList;
