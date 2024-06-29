import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isUpdating: false,
    isLoading: false,
    clientsCount: 0
  },
  reducers: {
    setUpdatingReducer(state, action) {
      state.isUpdating = action.payload.isUpdating
    },
    setLoadingReducer(state, action) {
      state.isLoading = action.payload.isLoading
    },
    setClientsCount(state, action) {
      state.clientsCount = action.payload.clientsCount
    },
  },
});

export const {
  setUpdatingReducer,
  setLoadingReducer,
  setClientsCount
} = appSlice.actions;

export default appSlice.reducer;