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
    [chatApi.reducerPath]: chatApi.reducer, // RTK Query хранит каналы и сообщения
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware),
  preloadedState: {
    auth: {
      username: null,
      token: null,
    },
  },
})
