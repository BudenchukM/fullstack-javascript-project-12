import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import store from './slices/index.js'
import { pages } from './utils/routes.js'

import MainHeader from './components/MainHeader.jsx'
import ModalManager from './components/ModalManager.jsx'
import ToastListener from './components/ToastListener.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Main from './pages/Main.jsx'

const App = () => (
  <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="d-flex flex-column h-100">
        <MainHeader />

        <Routes>
          <Route path={pages.signup()} element={<SignUp />} />
          <Route path={pages.login()} element={<Login />} />
          <Route
            path={pages.root()}
            element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ModalManager />
        <ToastContainer pauseOnFocusLoss={false} />
        <ToastListener />
      </div>
    </BrowserRouter>
  </Provider>
)

export default App
