import ReactDOM from 'react-dom/client'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { I18nextProvider } from 'react-i18next'

import App from './App.jsx'
import init from './init.js'
import rollbar from './rollbar.js'

import './assets/application.scss'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const run = async () => {
  const { i18n } = await init()

  root.render(
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  )
}

run()
