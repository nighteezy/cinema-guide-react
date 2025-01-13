import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  isOpen: false,
  activeModal: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.activeModal = action.payload;
    },
    closeModal: state => {
      state.isOpen = false;
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
