import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import TableCell from "@mui/material/TableCell";
import CustomInputCell from "../CustomInputCell/CustomInputCell";
import CustomTextAreaCell from "../CustomTextAreaCell/CustomTextAreaCell";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import {options, headCells} from "../../constants";
import CustomSelectCell from "../CustomSelectCell/CustomSelectCell";
import {setSelectedRowsReducer} from "../../store/tableSlice";

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
});

export default function EnhancedTableBody() {

   console.log("ENHHHH")

  const dispatch = useDispatch()
  const rowsState = useSelector(state => state.table.rows)
  const selectedRows = useSelector(state => state.table.selectedRows)
  const page = useSelector(state => state.table.page)
  const rowsPerPage = useSelector(state => state.table.rowsPerPage)

  const columnsArray = headCells.slice(1);

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);

    if (selectedIndex === -1) {
      dispatch(setSelectedRowsReducer({selectedRows: [...selectedRows, id]}))
    } else  {
      dispatch(setSelectedRowsReducer({selectedRows: selectedRows.filter(row => row != id)}))
    }

  };

  return (
    <TableBody>
      {/*{itemsToRender.map((row, index) => {*/}
      {/*{rowsState.slice(0, 50).map((row, index) => {*/}
      {rowsState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
      {/*{newRows.map((row, index) => {*/}
      {/*{rowsState.map((row, index) => {*/}

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
            sx={{ cursor: 'default' }}
          >
            <TableCell padding="checkbox" sx={{ position: 'sticky', left: '0', zIndex: '1', backgroundColor: 'lightyellow', border: '1px solid lightgrey' }}>
              <Checkbox
                color="primary"
                checked={isItemSelected}
                onClick={(event) => handleClick(event, row.id)}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            <StickyTableCell align="center" sx={isItemSelected?{ left: headCells.slice(0, 0).reduce(function (sum, column) { return sum + column.width}, 54), backgroundColor: '#93abf3'} : {left: headCells.slice(0, 0).reduce(function (sum, column) { return sum + column.width}, 54)}}>
              <CustomTextAreaCell column={headCells[0].id} row={row.id} value={page * rowsPerPage + index+1} disabled={true}/>
            </StickyTableCell>
            {
              columnsArray.map((column, index) =>
                column.fixed ?
                  <StickyTableCell key={column.id}
                                   align="center"
                                   sx={{ left: headCells.slice(0, index+1).reduce((sum, column) => { return sum + column.width}, 54), backgroundColor: isItemSelected && '#93abf3'}}>
                    <CustomTextAreaCell column={column.id} row={row.id} value={row[column.id]} disabled={column.id == "id" ? true : false}/>
                  </StickyTableCell>
                  :
                  <StyledTableCell key={column.id}
                                   align="center"
                                   sx={{ backgroundColor: isItemSelected ?'#93abf3': 'transparent'}}>
                    <CustomTextAreaCell column={column.id} row={row.id} value={row[column.id]} disabled={column.id == "id" ? true : false}/>
                  </StyledTableCell>







              )}





            {/*<StickyTableCell align="center" sx={isItemSelected?{ left: headCells.slice(0, 0).reduce(function (sum, column) { return sum + column.width}, 54), backgroundColor: '#93abf3'} : {left: headCells.slice(0, 0).reduce(function (sum, column) { return sum + column.width}, 54)}}>*/}
            {/*  <CustomTextAreaCell column={headCells[0].id} row={row.id} value={page * rowsPerPage + index+1}/>*/}
            {/*</StickyTableCell>*/}
            {/*<StickyTableCell align="center" sx={isItemSelected?{ left: headCells.slice(0, 1).reduce(function (sum, column) { return sum + column.width}, 54), backgroundColor: '#93abf3'} : {left: headCells.slice(0, 1).reduce(function (sum, column) { return sum + column.width}, 54)}}>*/}
            {/*  <CustomTextAreaCell column={headCells[1].id} row={row.id} value={row[headCells[1].id]}/>*/}
            {/*</StickyTableCell>*/}
            {/*<StickyTableCell align="center" sx={isItemSelected?{ left: headCells.slice(0, 2).reduce(function (sum, column) { return sum + column.width}, 54), backgroundColor: '#93abf3'} : {left: headCells.slice(0, 2).reduce(function (sum, column) { return sum + column.width}, 54)}}>*/}
            {/*  <CustomTextAreaCell column={headCells[2].id} row={row.id} value={row[headCells[2].id]}/>*/}
            {/*</StickyTableCell>*/}
            {/*<StickyTableCell align="center" sx={isItemSelected?{ left: headCells.slice(0, 3).reduce(function (sum, column) { return sum + column.width}, 54), backgroundColor: '#93abf3'} : {left: headCells.slice(0, 3).reduce(function (sum, column) { return sum + column.width}, 54)}}>*/}
            {/*  <CustomTextAreaCell column={headCells[3].id} row={row.id} value={row[headCells[3].id]}/>*/}
            {/*</StickyTableCell>*/}
            {/*<StickyTableCell align="center" sx={isItemSelected?{ left: headCells.slice(0, 4).reduce(function (sum, column) { return sum + column.width}, 54), backgroundColor: '#93abf3'} : {left: headCells.slice(0, 4).reduce(function (sum, column) { return sum + column.width}, 54)}}>*/}
            {/*  <CustomTextAreaCell column={headCells[4].id} row={row.id} value={row[headCells[4].id]}/>*/}
            {/*</StickyTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomTextAreaCell column='carbs' row={row.id} value={row.carbs}/>*/}
            {/*</StyledTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomTextAreaCell column='protein' row={row.id} value={row.protein}/>*/}
            {/*</StyledTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomSelectCell column='a' row={row.id} options={options} value={options.find(o => o.id == row.a)?.id}/>*/}
            {/*</StyledTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomTextAreaCell column='b' row={row.id} value={row.b}/>*/}
            {/*</StyledTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomTextAreaCell column='c' row={row.id} value={row.c}/>*/}
            {/*</StyledTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomTextAreaCell column='d' row={row.id} value={row.d}/>*/}
            {/*</StyledTableCell>*/}
            {/*<StyledTableCell align="center" sx={isItemSelected?{ backgroundColor: '#93abf3'} : {}}>*/}
            {/*  <CustomTextAreaCell column='e' row={row.id} value={row.e}/>*/}
            {/*</StyledTableCell>*/}

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
  );
}