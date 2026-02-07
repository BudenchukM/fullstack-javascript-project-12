import ReactDOM from 'react-dom/client'
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import { I18nextProvider } from 'react-i18next'

import App from './App.jsx'
import i18n, { initPromise } from './init.js'

import './assets/application.scss'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  environment: import.meta.env.PROD ? 'production' : 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>,
)

// Инициализация после render
initPromise
