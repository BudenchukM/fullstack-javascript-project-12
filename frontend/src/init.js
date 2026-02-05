import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import leo from 'leo-profanity'

import resources from './locales/index.js'
import { initSocket } from './network/socket.js'
import store from './slices/index.js'

const init = async () => {
  const i18n = i18next.createInstance()
  const mode = import.meta.env.MODE || 'development'

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      debug: mode === 'development',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  leo.clearList()
  leo.add(leo.getDictionary('en'))
  leo.add(leo.getDictionary('ru'))

  initSocket(store.dispatch)

  return { i18n }
}

export default init
