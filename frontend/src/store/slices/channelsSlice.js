import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
      state.activeChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter(
        (c) => c.id !== action.payload
      );
      state.activeChannelId = 1;
    },
    renameChannel: (state, action) => {
      const channel = state.channels.find(
        (c) => c.id === action.payload.id
      );
      if (channel) channel.name = action.payload.name;
    },
  },
});

export const {
  setChannels,
  setActiveChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
