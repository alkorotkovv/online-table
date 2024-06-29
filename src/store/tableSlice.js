import {headCells} from '../constants';
import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    page: 0,
    rowsPerPage: 50,
    rows: [],
    selectedRows: [],
    copiedRows: []
  },
  reducers: {
    setPageReducer(state, action) {
      console.log("setPageReducer")
      console.log(state)
      console.log(action)
      state.page = action.payload.page
    },
    setRowsPerPageReducer(state, action) {
      console.log("setRowsPerPageReducer")
      console.log(state)
      console.log(action)
      state.rowsPerPage = action.payload.rowsPerPage
    },
    setSelectedRowsReducer(state, action) {
      console.log("setSelectedRowsReducer")
      console.log(state)
      console.log(action)
      state.selectedRows = action.payload.selectedRows.slice()
    },
    setRowsReducer(state, action) {
      console.log("REDUCERINITROW")
      console.log(state)
      console.log(action)
      state.rows = action.payload.slice()
    },
    changeCellValueReducer(state, action) {
      console.log("changeCellValueReducer")
      console.log(state)
      console.log(action)
      const changedRow = state.rows.find(row => row.id == action.payload.row)
      changedRow[action.payload.column] = action.payload.value
    },
    addNewRowReducer(state, action) {
      console.log("REDUCERADDROW")
      console.log(state)
      console.log(action)

      //Создаем пустую строку
      const emptyRow = {};
      headCells.map(column => column.id).forEach(id => emptyRow[id] = "");
      emptyRow.id = action.payload.newId;
      emptyRow.a = -1;

      state.rows = [...state.rows, emptyRow];

    },
    deleteRowsReducer(state, action) {
      console.log("REDUCERADDROW")
      console.log(state)
      console.log(action)
      state.rows = state.rows.filter(row => !action.payload.rowsToDelete.includes(row.id))
    },
    setCopiedRowsReducer(state, action) {
      console.log("copyRowReducer")
      console.log(state)
      console.log(action)
      state.copiedRows = action.payload.copiedRows.slice()
    },


    insertRowReducer(state, action) {
      console.log("insertRowReducer")
      console.log(state)
      console.log(action)

      const rowWhereInsert = state.rows.find(row => row.id == action.payload.rowWhereInsert)
      Object.assign(rowWhereInsert, action.payload.rowToInsert);
      rowWhereInsert.id = action.payload.rowWhereInsert;


    },
  },
});

export const {
  addNewRowReducer,
  setRowsReducer,
  changeCellValueReducer,
  setPageReducer,
  setRowsPerPageReducer,
  deleteRowsReducer,
  setSelectedRowsReducer,
  insertRowReducer,
  setCopiedRowsReducer
} = tableSlice.actions;

export default tableSlice.reducer;