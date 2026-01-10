import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ i18n
  const isAuth = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">
        {t('header.title')}
      </Link>

      {isAuth && (
        <button
          className="btn btn-outline-secondary"
          onClick={handleLogout}
        >
          {t('header.logout')}
        </button>
      )}
    </nav>
  );
};

export default Header;
