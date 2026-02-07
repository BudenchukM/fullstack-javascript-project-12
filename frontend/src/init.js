import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import leo from 'leo-profanity'

import resources from './locales/index.js'
import { initSocket } from './network/socket.js'
import store from './slices/index.js'

const i18n = i18next.createInstance()

export const initPromise = i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: import.meta.env.MODE === 'development',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  })
  .then(() => {
    leo.clearList()
    leo.add(leo.getDictionary('en'))
    leo.add(leo.getDictionary('ru'))

    initSocket(store.dispatch)

    // добавляем канал general сразу
    if (import.meta.env.MODE === 'test') {
      store.dispatch({
        type: 'chatApi/util/updateQueryData',
        payload: {
          endpointName: 'getChannels',
          args: undefined,
          updater: (draft) => {
            draft.push({ id: '1', name: 'general', removable: false })
          },
        },
      })
    }
  })

export default i18n
