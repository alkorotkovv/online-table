import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  setRowsReducer,
  changeCellValueReducer,
  setPageReducer,
  setRowsPerPageReducer,
  deleteRowsReducer,
  addNewRowReducer,
  setSelectedRowsReducer,
  setCopiedRowsReducer,
  insertRowReducer
} from "./store/tableSlice";
import {setUpdatingReducer, setLoadingReducer, setClientsCount} from "./store/appSlice";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { maxContainerHeight, rowsPerPageOptions, sortArrayByField} from './constants'
import EnhancedTableHead from "./Components/EnhancedTableHead/EnhancedTableHead";
import FiltersToolBar from "./Components/FiltersToolBar/FiltersToolBar";
import EnhancedTableToolbar from "./Components/EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableBody from "./Components/EnhancedTableBody/EnhancedTableBody";
import RightContext from "./Components/RightContext/RightContext";
import {Websocket} from "./WebSocket/Websocket";
import EnhancedTable from "./Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import Loading from "./Components/Loading/Loading";
import EnhancedSecondaryTableBody from "./Components/EnhancedSecondaryTableBody/EnhancedSecondaryTableBody";
import EnhancedSecondaryTableHead from "./Components/EnhancedSecondaryTableHead/EnhancedSecondaryTableHead";
import {rows} from "./constants"

export default function AppNew() {  

  console.log("RERENDERAPP")

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.app.isLoading)
  const clientsCount = useSelector(state => state.app.clientsCount)
  const page = useSelector(state => state.table.page)
  const rowsPerPage = useSelector(state => state.table.rowsPerPage)
  const rowsState = useSelector(state => state.table.rows)
  const selectedRows = useSelector(state => state.table.selectedRows)
  const copiedRows = useSelector(state => state.table.copiedRows)

  //Переменные необходимые для работы подключаемых компонентов
  //const myWs = useRef();
  //const [isLoading, setIsLoading] = useState(true)
  //const [isUpdating, setIsUpdating] = useState(false)
  //const [rowsState, setRowsState] = useState([]);
  //const [visibleRowsState, setVisibleRowsState] = useState([]);
  //const [selected, setSelected] = useState([]);
  //const [page, setPage] = useState(0);
  //const [rowsPerPage, setRowsPerPage] = useState(50);
  //const [copiedRow, setCopiedRow] = useState(null)

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('num');
  const [dense, setDense] = useState(true);
  const [filtersState, setFiltersState] = useState({isVisible: false, x: 0, y: 100});
  const [rightContextState, setRightContextState] = useState({isVisible: false, x: 0, y: 0});
  const tableRef = useRef(null)


  //Контекстное меню на ПКМ
  React.useEffect(() => {

    if (rightContextState.isVisible) {
      document.addEventListener("click", hideContext);
    }
    return () => {
      document.removeEventListener("click", hideContext);
    };
  });

  React.useEffect(() => {

    dispatch(setLoadingReducer({isLoading: true}))

    dispatch(setRowsReducer(rows))

    // axios.post(`/progress/react000/get_table`,
    //   {
    //   },
    //   {
    //     params: {
    //       sskey: sessionStorage.getItem('sessionStorageKey'),
    //     }
    //   })
    //   .then(res => {
    //     dispatch(setRowsReducer(res.data))
    //     dispatch(setLoadingReducer({isLoading: false}))
    //   })

    // myWs.current = Websocket;

    // Обработчик открытия соединения с WSServer
    Websocket.onopen = function () {
      console.log('Подключились к WS server');
    };

    // Обработчик сообщений от WSServer
    Websocket.onmessage = function (message) {

      console.log(message)

      const mess = JSON.parse(message.data)

      if (mess.action === "HELLO") {
        console.log('Message от WSServer: ', mess.content.message);
      }
      if (mess.action === "CHANGE_CLIENTS") {
        console.log('Подключено клиентов: ', mess.content.clientsCount);
        dispatch(setClientsCount({clientsCount: mess.content.clientsCount}))
      }
      else if (mess.action === "CHANGE_CELL_VALUE") {
        console.log('action: CHANGE_CELL_VALUE');
        console.log('Данные для всех клиентов от WSServer');
        console.log("ROW: " + mess.content.row)
        console.log("COLUMN: " + mess.content.column)
        console.log("VALUE: " + mess.content.value)


        dispatch(changeCellValueReducer({row: mess.content.row, column: mess.content.column, value: mess.content.value}))

        //Для использования с обычным стейтом, не REDUX
        // setRowsState(prev => {
        //   console.log('prev', prev)
        //   return prev.map((row, index) => {
        //     // console.log(mess.content.row)
        //     if (row.id == mess.content.row) {
        //       console.log("SOVPALI")
        //       console.log(mess.content.column)
        //       if (mess.content.column == "a") {
        //         console.log("меняетс селект, надо заполнить что то еще")
        //         return {
        //           ...row,
        //           [mess.content.column]: mess.content.value,
        //           b: "7777777777777777"
        //         }
        //       }
        //       else {
        //         return {
        //           ...row,
        //           [mess.content.column]: mess.content.value,
        //         }
        //       }
        //     } else {
        //       return row
        //     }
        //   })
        // });

        setTimeout(() => {
          // setIsUpdating(false)
          dispatch(setUpdatingReducer({isUpdating: false}))
        }, 1000)


        //setRowsState((prev) => [...prev, { id: i, name: '555' }]);

      }
      else if (mess.action === "DELETE_ROWS") {
        console.log('action: DELETE_ROWS');

        // setRowsState(prev => {
        //   console.log('Deleteprev', prev)
        //   return prev.filter(row => !mess.content.rowsToDelete.includes(row.id))
        // });

        // const newRowsArray = rowsStateNew.filter(row => !mess.content.rowsToDelete.includes(row.id))
        //
        // console.log("DELETE_ROWS")
        // console.log(rowsStateNew)

        dispatch(deleteRowsReducer({rowsToDelete: mess.content.rowsToDelete}))
        dispatch(setSelectedRowsReducer({selectedRows: []}))

        // dispatch(setRowsReducer(newRowsArray))

        // setSelected([])
      }
      else if (mess.action === "ADD_ROW") {
        console.log('action: ADD_ROW');
        console.log(mess.content.newId)
        // const newRows = [...rowsState, {id: Number(selected)+1}]
        // setRowsState(newRows);

        dispatch(addNewRowReducer({newId: mess.content.newId}))

        // setRowsState(prev => {
        //   console.log('Addprev', Math.max.apply(null, prev.map(row => Number(row.id))))
        //   return [...prev, {
        //     id: Math.max.apply(null, prev.map(row => Number(row.id))) + 1,
        //     name: "",
        //     calories: "",
        //     fat: "",
        //     carbs: "",
        //     protein: "",
        //     a: -1,
        //     b: "",
        //     c: "",
        //     d: "",
        //     e: ""
        //   }]
        // });

      }
      else if (mess.action === "INSERT_ROW") {
        console.log('action: INSERT_ROW');
        console.log("ROW: ")
        console.log(mess.content.rowToInsert)
        console.log(mess.content.rowWhereInsert)

        dispatch(insertRowReducer({rowToInsert: mess.content.rowToInsert, rowWhereInsert: mess.content.rowWhereInsert}))
        dispatch(setSelectedRowsReducer({selectedRows: []}))

        // setRowsState(prev => {
        //   console.log('prev', prev)
        //   return prev.map((row, index) => {
        //     if (row.id == mess.content.row.id) {
        //       console.log(mess.content.row)
        //       console.log(row)
        //       return {
        //         // ...row,
        //         // id: rowToInsert.id,
        //         // b: "55555",
        //         ...mess.content.row,
        //       }
        //     } else {
        //       return row
        //     }
        //   })
        // });

      }
      else if (mess.action === "CLEAN_ROWS") {
        console.log('action: CLEAN_ROWS');
        console.log(mess.content);
        console.log('prev', mess.content.rowsToClean)

        // setRowsState(prev => {
        //   console.log('prev', mess.content.rowsToClean)
        //   return prev.map((row, index) => {
        //     if (mess.content.rowsToClean.includes(row.id)) {
        //       console.log(mess.content.row)
        //       console.log(row)
        //       return {
        //         id: row.id,
        //         name: "",
        //         calories: "",
        //         fat: "",
        //         carbs: "",
        //         protein: "",
        //         a: -1,
        //         b: "",
        //         c: "",
        //         d: "",
        //         e: ""
        //       }
        //     } else {
        //       return row
        //     }
        //   })
        // });

        // setSelected([])
      }

    };

    //Обработчик закрытия соединения с WSServer
    Websocket.onclose = function (event) {
      console.log('Отключились от WS server');
      console.log('Соединение WebSocket закрыто с кодом:', event.code);
      console.log('Причина закрытия:', event.reason);
    };

    //Обработчик ошибок WSServer
    Websocket.onerror = function (event) {
      console.log('Какая то ошибка в работе с WS');
      console.log(event)
    };

  }, []);

  const hideContext = () => {
    console.log("hidehidehide")
    setRightContextState({...rightContextState, isVisible: false})
  }

  const handleOnRightClick = (e) => {
    e.preventDefault()
    setRightContextState({isVisible: true, x:e.clientX, y:e.pageY - 45})
  }

  const handleTableSort = (event, column) => {
    order === "desc" ? setOrder("asc") : setOrder("desc")
    setOrderBy(column);
    const sortedArray = sortArrayByField(rowsState, column, order)
    dispatch(setRowsReducer(sortedArray))
  }

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    dispatch(setPageReducer({page: newPage}))
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
    dispatch(setRowsPerPageReducer({rowsPerPage: parseInt(event.target.value, 10)}))
    dispatch(setPageReducer({page: 0}))
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  //Обработчики взаимодействия с таблицей

  const handleAddRow = () => {

    const newId = Math.max.apply(null, rowsState.map(row => Number(row.id))) + 1

    dispatch(setUpdatingReducer({isUpdating: true}))

    axios.post(`/progress/react000/add_row`,
      {
        id: newId
      },
      {
        params: {
          sskey: sessionStorage.getItem('sessionStorageKey'),
        }
      })
      .then(res => {
        if (res.data.status === true) {
          Websocket.send(JSON.stringify({action: 'ADD_ROW', content: {newId: newId}}));
          dispatch(setUpdatingReducer({isUpdating: false}))
          dispatch(setPageReducer({page: Math.floor(rowsState.length / rowsPerPage)}))
          setTimeout(() => {
            tableRef.current.scrollTo({
              top: tableRef.current.scrollHeight,
              left: 0,
              behavior: "smooth"
            });
          }, 500)

        }
        else {
          console.log("Не удалось добавить строку")
        }
      })
      .catch(error => {
        console.log("Ошибка при добавлении новой строки")
      })
  }

  const handleDeleteRows = (selectedRows) => {

    dispatch(setUpdatingReducer({isUpdating: true}))

    axios.post(`/progress/react000/delete_rows`,
      {
        id: selectedRows
      },
      {
        params: {
          sskey: sessionStorage.getItem('sessionStorageKey'),
        }
      })
      .then(res => {
        if (res.data.status === true) {
          Websocket.send(JSON.stringify({action: 'DELETE_ROWS', content: {rowsToDelete: selectedRows}}));
          dispatch(setUpdatingReducer({isUpdating: false}))
        }
        else {
          console.log("Не удалось удалить строки")
        }
      })
  }

  const handleCopyRow = (selectedRows) => {
    const copiedRows = [rowsState.find(row => row.id == selectedRows[0])]
    dispatch(setCopiedRowsReducer({copiedRows: copiedRows}))
    dispatch(setSelectedRowsReducer({selectedRows: []}))
  }

  const handleInsertRow = () => {

    dispatch(setUpdatingReducer({isUpdating: true}))

    axios.post(`/progress/react000/insert_row`,
      {
        id: selectedRows[0],
        copiedRow: copiedRows[0]
      },
      {
        params: {
          sskey: sessionStorage.getItem('sessionStorageKey'),
        }
      })
      .then(res => {
        if (res.data.status === true) {
          Websocket.send(JSON.stringify({action: 'INSERT_ROW', content: {rowToInsert: copiedRows[0], rowWhereInsert: selectedRows[0]}}));
          dispatch(setUpdatingReducer({isUpdating: false}))
        }
        else {
          console.log("Не удалось вставить строку")
        }
      })




  }

  const handleCleanRows = (selectedRows) => {
    Websocket.send(JSON.stringify({action: 'CLEAN_ROWS', content: {rowsToClean: selectedRows}}));
  }


  return (
  <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} onContextMenu={(e) => handleOnRightClick(e)}>
        <EnhancedTableToolbar
          handleDeleteRows={handleDeleteRows}
          handleAddRow={handleAddRow}
          handleCopyRow={handleCopyRow}
          handleInsertRow={handleInsertRow}
          handleCleanRows={handleCleanRows}
        />
        <FiltersToolBar
          filtersState={filtersState}
          setFiltersState={setFiltersState}
        />

  {/*Для виртуализации (решение не конечное по части стилей)*/}
  {/*      <EnhancedTable*/}
  {/*        headCells={headCells}*/}
  {/*        numSelected={selected.length}*/}
  {/*        order={order}*/}
  {/*        orderBy={orderBy}*/}
  {/*        onSelectAllClick={handleSelectAllClick}*/}
  {/*        onRequestSort={handleTableSort}*/}
  {/*        rowCount={rowsState.length}*/}
  {/*        setIsFiltersVisible={setIsFiltersVisible}*/}
  {/*        setFiltersX={setFiltersX}*/}
  {/*        rowsState={rowsState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}*/}
  {/*        // rowsState = {rowsState.slice(startIndex, endIndex)}*/}
  {/*        emptyRows={emptyRows}*/}
  {/*        selected={selected}*/}
  {/*        dense={true}*/}
  {/*        wsSendCellValue={wsSendCellValue}*/}
  {/*        setSelected={setSelected}*/}
  {/*      />*/}


        <TableContainer id="tableContainer" sx={{ height: maxContainerHeight }} ref={tableRef} >
          <Table
            stickyHeader
            aria-label="sticky table"
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleTableSort}
              setFiltersState={setFiltersState}
            />
            <EnhancedTableBody/>
          </Table>
        </TableContainer>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>Пользователей на странице: {clientsCount}</div>
          <TablePagination
            showFirstButton={true}
            showLastButton={true}
            labelRowsPerPage={"Строк на странице"}
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={rowsState.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

        <TableContainer id="tableContainer" sx={{ height: maxContainerHeight }} ref={tableRef} >
          <Table
            stickyHeader
            aria-label="sticky table"
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedSecondaryTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleTableSort}
              setFiltersState={setFiltersState}
            />
            <EnhancedSecondaryTableBody/>
          </Table>
        </TableContainer>


      </Paper>
      {/*<FormControlLabel*/}
      {/*  control={<Switch checked={dense} onChange={handleChangeDense} />}*/}
      {/*  label="Dense padding"*/}
      {/*/>*/}
        <RightContext
          rightContextState={rightContextState}
          handleDeleteRows={(selectedRows) => handleDeleteRows(selectedRows)}
          handleAddRow={() => handleAddRow()}
          handleCopyRow={(selectedRow) => handleCopyRow(selectedRow)}
          handleInsertRow={(row) => handleInsertRow(row)}
          handleCleanRows={(selectedRows) => handleCleanRows(selectedRows)}
        />
    </Box>
    {isLoading &&
    <>
      <Loading/>
    </>
    }
  </>


  )

}