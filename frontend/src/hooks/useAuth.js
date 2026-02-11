import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../slices/auth'
import { useLoginMutation } from '../api/chatApi'
import { pages } from '../utils/routes'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginMutation] = useLoginMutation()

  // ---------- LOGIN ----------
  const login = async (values, formikHelpers) => {
    try {
      const user = await loginMutation(values).unwrap()

      dispatch(authActions.setAuth(user))
      navigate(pages.root())
    }
    catch (err) {
      if (err?.status === 401) {
        formikHelpers.setStatus(401)
        formikHelpers.setSubmitting(false)
        return
      }

      console.error(err)
    }
  }

  // ---------- LOGOUT ----------
  const logout = () => {
    dispatch(authActions.removeAuth())
    navigate(pages.login())
  }

  return {
    login,
    logout,
  }
}
