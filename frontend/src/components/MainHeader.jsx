import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { pages as pagesRoutes } from '../utils/routes.js'
import { useAuth } from '../hooks/useAuth.js'

const MainHeader = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'MainHeader' })
  const { isAuth, handleLogout } = useAuth()

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link
          className="navbar-brand"
          to={pagesRoutes.root()}
          aria-label={t('aria.toMainPage')}
        >
          {t('brandName')}
        </Link>

        {isAuth && (
          <Button
            variant="primary"
            type="button"
            onClick={handleLogout}
            aria-label={t('aria.leave')}
          >
            {t('leave')}
          </Button>
        )}
      </div>
    </nav>
  )
}

export default MainHeader
