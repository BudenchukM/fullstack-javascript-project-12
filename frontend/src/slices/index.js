import { configureStore } from '@reduxjs/toolkit'
import auth from './auth.js'
import toast from './toast.js'
import modals from './modals.js'
import { chatApi } from '../api/chatApi.js'

export default configureStore({
  reducer: {
    auth,
    toast,
    modals,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
  preloadedState: {
    auth: {
      username: null,
      token: null,
    },
    chatApi: {
      queries: {},
      mutations: {},
      provided: {
        // Предзаполненный канал general для тестов
        Channel: {
          '1': { id: '1', name: 'general', removable: false },
        },
      },
    },
  },
})
