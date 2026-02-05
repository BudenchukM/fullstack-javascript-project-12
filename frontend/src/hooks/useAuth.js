import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions, selectAuth } from '../slices/auth'
import { pages as pagesRoutes } from '../utils/routes'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(selectAuth)

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(authActions.removeAuth())
    navigate(pagesRoutes.login())
  }

  const isAuth = Boolean(auth.token)

  return {
    isAuth,
    handleLogout,
  }
}

export default useAuth
