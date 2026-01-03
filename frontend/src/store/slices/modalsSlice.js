import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpen: false,
    type: null,
    channel: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.channel = action.payload.channel;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.channel = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
