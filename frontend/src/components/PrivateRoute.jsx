import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuth } from '../slices/auth'
import { pages } from '../utils/routes'

const PrivateRoute = ({ children }) => {
  const auth = useSelector(selectAuth)

  if (!auth.token) {
    return <Navigate to={pages.login()} />
  }

  return children
}

export default PrivateRoute
