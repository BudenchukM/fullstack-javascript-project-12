import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions, getStoredUser } from '../slices/auth'
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

      localStorage.setItem('user', JSON.stringify(user))
      dispatch(authActions.setAuth(user))

      navigate(pages.root())
    }
    catch (err) {
      if (err.status === 401) {
        formikHelpers?.setStatus(401)
        formikHelpers?.setErrors({ password: 'wrongUser' })
        return
      }
      throw err
    }
  }

  // ---------- LOGOUT ----------
  const logout = () => {
    localStorage.removeItem('user')
    dispatch(authActions.removeAuth())
    navigate(pages.login())
  }

  // ---------- INIT AUTH ----------
  const initAuth = () => {
    const user = getStoredUser()
    if (user) {
      dispatch(authActions.setAuth(user))
    }
  }

  useEffect(() => {
    initAuth()
  }, [])

  return {
    login,
    logout,
    initAuth,
  }
}
