import { createSlice } from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi.js'

const AUTH_KEY = 'user'

const getInitialState = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY)
    return data ? JSON.parse(data) : { username: null, token: null }
  }
  catch {
    return { username: null, token: null }
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, { payload }) => {
      localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
      return payload
    },
    removeAuth: () => {
      localStorage.removeItem(AUTH_KEY)
      return { username: null, token: null }
    },
  },
  extraReducers: builder => builder
    .addMatcher(chatApi.endpoints.getChannels.matchRejected, (state, payload) => {
      if (payload?.error?.status === 401) {
        localStorage.removeItem(AUTH_KEY)
        return { username: null, token: null }
      }
    }),
})

export const selectAuth = state => state.auth
export const authActions = authSlice.actions
export default authSlice.reducer
