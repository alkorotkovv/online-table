import { configureStore } from '@reduxjs/toolkit';
import  appReducer from './appSlice'
import  tableReducer from './tableSlice'
import  secondaryTableReducer from './secondaryTableSlice'

const store = configureStore({
  reducer: {
    app: appReducer,
    table: tableReducer,
    secondaryTable: secondaryTableReducer
  }
});

export default store;