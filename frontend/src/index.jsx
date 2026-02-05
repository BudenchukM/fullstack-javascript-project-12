import ReactDOM from 'react-dom/client'
import { ErrorBoundary, Provider as RollBarProvider } from '@rollbar/react'
import Rollbar from 'rollbar'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import App from './App.jsx'
import resources from './locales/index.js'
import { initSocket } from './network/socket.js'
import store from './slices/index.js'

// инициализация i18n
const i18n = i18next.createInstance()
await i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
})

// инициализация сокетов
initSocket(store.dispatch)

// Rollbar instance
const rollbar = new Rollbar({
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  environment: import.meta.env.MODE,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RollBarProvider instance={rollbar}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ErrorBoundary>
  </RollBarProvider>
)
