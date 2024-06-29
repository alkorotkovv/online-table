import {headCells} from '../constants';
import { createSlice } from '@reduxjs/toolkit';

const secondaryTableSlice = createSlice({
  name: 'secondaryTable',
  initialState: {
    page: 0,
    rowsPerPage: 50,
    rows: [],
    selectedRows: [],
    copiedRows: []
  },
  reducers: {
    setRowsReducer(state, action) {
      console.log("SecTableREDUCERINITROW")
      console.log(state)
      console.log(action)
      state.rows = action.payload.slice()
    },
  },
});

export const {
  setRowsReducer,
} = secondaryTableSlice.actions;

export default secondaryTableSlice.reducer;