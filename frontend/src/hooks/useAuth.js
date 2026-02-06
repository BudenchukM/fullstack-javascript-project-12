import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../slices/auth'
import { pages as pagesRoutes } from '../utils/routes'
import { useLoginMutation } from '../api/chatApi'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginRequest] = useLoginMutation()

  const logIn = async (values) => {
    const result = await loginRequest(values).unwrap()

    localStorage.setItem('user', JSON.stringify(result))
    dispatch(authActions.setAuth(result))
    navigate(pagesRoutes.root())
  }

  const logOut = () => {
    localStorage.removeItem('user')
    dispatch(authActions.removeAuth())
    navigate(pagesRoutes.login())
  }

  const isAuth = () => Boolean(localStorage.getItem('user'))

  return { logIn, logOut, isAuth }
}

export default useAuth
