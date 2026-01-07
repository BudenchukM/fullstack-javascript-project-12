import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuth = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">
        Hexlet Chat
      </Link>

      {isAuth && (
        <button
          className="btn btn-outline-secondary"
          onClick={handleLogout}
        >
          Выйти
        </button>
      )}
    </nav>
  );
};

export default Header;
