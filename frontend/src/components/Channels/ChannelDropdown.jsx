import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/modalsSlice';

const ChannelDropdown = ({ channel }) => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        ⚙
      </button>

      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            onClick={() =>
              dispatch(openModal({ type: 'rename', channel }))
            }
          >
            Переименовать
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-danger"
            onClick={() =>
              dispatch(openModal({ type: 'remove', channel }))
            }
          >
            Удалить
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ChannelDropdown;
