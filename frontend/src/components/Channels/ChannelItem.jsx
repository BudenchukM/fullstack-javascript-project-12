import ChannelDropdown from './ChannelDropdown';

const ChannelItem = ({ channel, isActive, onClick }) => (
  <li
    className={`list-group-item d-flex justify-content-between align-items-center ${
      isActive ? 'active' : ''
    }`}
    role="button"
    onClick={onClick}
  >
    <span># {channel.name}</span>
    {channel.removable && <ChannelDropdown channel={channel} />}
  </li>
);

export default ChannelItem;
