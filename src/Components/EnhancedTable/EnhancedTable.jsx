import EnhancedTableHead from "../EnhancedTableHead/EnhancedTableHead";
import EnhancedTableBody from "../EnhancedTableBody/EnhancedTableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from '@mui/material/Table';
import React, {useLayoutEffect, useRef, useState, useMemo} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import CustomTextAreaCell from "../CustomTextAreaCell/CustomTextAreaCell";
import CustomSelectCell from "../CustomSelectCell/CustomSelectCell";
import {options} from "../../constants";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import EnhancedTableHeadVirtualize from "../EnhancedTableHeadVirtualize/EnhancedTableHeadVirtualize";

const StickyTableCell = styled(TableCell)({
  position: 'sticky',
  zIndex: '1',
  backgroundColor: 'lightyellow',
  border: '1px solid lightgrey',
  padding: '0',
});

const StyledTableCell = styled(TableCell)({
  padding: '0',
  border: '1px solid lightgrey',
  width: '200px'
});


export default function EnhancedTable(props) {

  const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount,
    rowsState, emptyRows, dense, wsSendCellValue, selected, setSelected,
    handleSelectAllClick, handleTableSort, setIsFiltersVisible, setFiltersX, page, rowsPerPage
  } = props;

  console.log("RERERERERE")


  const tableRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(50)

  useLayoutEffect(() => {

    console.log("uselayout")

    const scrollElement = tableRef.current

    if (!scrollElement) {
      console.log("noref")
      return;
    }

    const handleScroll = () => {
      // console.log("sccroll")
      const scrollTop = scrollElement.scrollTop;
      setScrollTop(scrollTop)
    }

    handleScroll()

    scrollElement.addEventListener('scroll', handleScroll)

    return () => scrollElement.removeEventListener('scroll', handleScroll)

  }, [])

  // const [startIndex, endIndex] = useMemo(() => {
    const virtualItems = useMemo(() => {
      console.log("scrollTop")
      console.log(scrollTop)
      const rangeStart = scrollTop;
      const rangeEnd = scrollTop + 444;
      let startIndex = Math.floor(rangeStart / 50)
      let endIndex = Math.ceil(rangeEnd / 50)

      startIndex = Math.max(0, startIndex)
      endIndex = Math.min(rowsState.length, endIndex-1)

      // console.log(startIndex)
      // console.log(endIndex)

    const virtualItems = []

    for (let i = startIndex; i <= endIndex; i++) {
      virtualItems.push({
        index: i,
        offsetTop: i * 50
      })
    }

    console.log(startIndex)
    console.log(endIndex)

      // return [startIndex, endIndex]
      return virtualItems


    }, [scrollTop, rowsState.length])


  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // console.log("itemsToRender")
  // // console.log(itemsToRender)
  // console.log(startIndex)
  // console.log(endIndex)

  // const itemsToRender = rowsState.slice(startIndex, endIndex)

  const totalListHeight = 50 * rowsState.length;

  // console.log("virtualItems")
  // console.log(virtualItems)




  return (



  <div style={{height: 400, overflow: "auto", border : "2px solid red", display: "grid"}} ref={tableRef}>
    <EnhancedTableHeadVirtualize
      headCells={headCells}
      numSelected={selected.length}
      order={order}
      orderBy={orderBy}
      onSelectAllClick={handleSelectAllClick}
      onRequestSort={handleTableSort}
      rowCount={rowsState.length}
      setIsFiltersVisible={setIsFiltersVisible}
      setFiltersX={setFiltersX}
    />
    <div style={{height: totalListHeight}}>
    <TableContainer id="tableContainer" sx={{height: totalListHeight}}>

    <Table stickyHeader aria-label="sticky table"
           sx={{ minWidth: 750 }}
           aria-labelledby="tableTitle"
           size={dense ? 'small' : 'medium'}


    >
      {/*<EnhancedTableHead*/}
      {/*  headCells={headCells}*/}
      {/*  numSelected={selected.length}*/}
      {/*  order={order}*/}
      {/*  orderBy={orderBy}*/}
      {/*  onSelectAllClick={handleSelectAllClick}*/}
      {/*  onRequestSort={handleTableSort}*/}
      {/*  rowCount={rowsState.length}*/}
      {/*  setIsFiltersVisible={setIsFiltersVisible}*/}
      {/*  setFiltersX={setFiltersX}*/}
      {/*/>*/}
      {/*<EnhancedTableBody*/}
      {/*  rowsState={rowsState}*/}
      {/*  // rowsState = {rowsState.slice(startIndex, endIndex)}*/}
      {/*  // rowsState = {itemsToRender}*/}
      {/*  itemsToRender = {itemsToRender}*/}
      {/*  emptyRows={emptyRows}*/}
      {/*  selected={selected}*/}
      {/*  dense={true}*/}
      {/*  wsSendCellValue={wsSendCellValue}*/}
      {/*  setSelected={setSelected}*/}
      {/*/>*/}

      <TableBody>
        <div style={{backgroundColor: "red", height: `${virtualItems[0]?.index * 50}px`}}></div>
        {virtualItems.map((virtualItem, index) => {
          console.log("virtualItem")
          const row = rowsState[virtualItem.index]
          // console.log(virtualItems)
        {/*{itemsToRender.map((row, index) => {*/}
          {/*{rowsState.slice(0, 50).map((row, index) => {*/}
          {/*{rowsState.map((row, index) => {*/}
          {/*{rowsState.slice(startIndex, rowsState.length).map((row, index) => {*/}
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              // hover
              // onClick={(event) => handleClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              key={row.id}
              tabIndex={-1}
              selected={isItemSelected}
              sx={{ cursor: 'default', height: "50px" }}
              // sx={{ cursor: 'default', height: "50px", position: "absolute", top: `${row.offsetTop}px`, transform: `translateY(${row.offsetTop}px)` }}
            >
              <TableCell padding="checkbox" sx={{ position: 'sticky', left: '0', width: "54px", zIndex: '1', backgroundColor: 'lightyellow', border: '1px solid lightgrey' }}>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  // onClick={(event) => handleClick(event, row.id)}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
              <StickyTableCell align="center" sx={isItemSelected?{ left: '54px', width: "54px", backgroundColor: '#93abf3'} : {left: '54px', width: "54px"}}>
                <CustomTextAreaCell column='id' row={row.id} value={row.id}/>
              </StickyTableCell>
              <StickyTableCell align="center" sx={isItemSelected?{ left: '108px', backgroundColor: '#93abf3'} : {left: '108px'}}>
                <CustomTextAreaCell column='name' row={row.id} value={row.name}/>
              </StickyTableCell>
              <StickyTableCell align="center" sx={isItemSelected?{ left: '308px', backgroundColor: '#93abf3'} : {left: '308px'}}>
                <CustomTextAreaCell column='calories' row={row.id} value={row.calories}/>
              </StickyTableCell>
              <StickyTableCell align="center" sx={isItemSelected?{ left: '508px', backgroundColor: '#93abf3'} : {left: '508px'}}>
                <CustomTextAreaCell column='fat' row={row.id} value={row.fat}/>
              </StickyTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomTextAreaCell column='carbs' row={row.id} value={row.carbs} handleCellValueChange={(row, column, value) => wsSendCellValue(row, column, value)}/>
              </StyledTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomTextAreaCell column='protein' row={row.id} value={row.protein} handleCellValueChange={(row, column, value) => wsSendCellValue(row, column, value)}/>
              </StyledTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomSelectCell column='a' row={row.id} options={options} value={options.find(o => o.id == row.a)?.id} handleCellValueChange={(row, column, value) => wsSendCellValue(row, column, value)}/>
              </StyledTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomTextAreaCell column='b' row={row.id} value={row.b}/>
              </StyledTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomTextAreaCell column='c' row={row.id} value={row.c}/>
              </StyledTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomTextAreaCell column='d' row={row.id} value={row.d}/>
              </StyledTableCell>
              <StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>
                <CustomTextAreaCell column='e' row={row.id} value={row.e}/>
              </StyledTableCell>

            </TableRow>
          );
        })}
        {/*{emptyRows > 0 && (*/}
        {/*  <TableRow*/}
        {/*    style={{*/}
        {/*      backgroundColor: "black",*/}
        {/*      height: (dense ? 33 : 53) * emptyRows,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <TableCell colSpan={6} />*/}
        {/*  </TableRow>*/}
        {/*)}*/}
      </TableBody>

    </Table>
  </TableContainer>
    </div>
    </div>
  )
}