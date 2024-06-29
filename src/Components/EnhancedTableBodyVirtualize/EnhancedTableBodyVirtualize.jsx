import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import TableCell from "@mui/material/TableCell";
import CustomInputCell from "../CustomInputCell/CustomInputCell";
import CustomTextAreaCell from "../CustomTextAreaCell/CustomTextAreaCell";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import {options} from "../../constants"
import CustomSelectCell from "../CustomSelectCell/CustomSelectCell";

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

export default function EnhancedTableBodyVirtualize(props) {

  const { rowsState, emptyRows, dense, wsSendCellValue, selected, setSelected, itemsToRender } = props;

   console.log("ENHHHH")

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
      console.log("sccroll")
      const scrollTop = scrollElement.scrollTop;
      setScrollTop(scrollTop)
    }

    handleScroll()

    scrollElement.addEventListener('scroll', handleScroll)

    return () => scrollElement.removeEventListener('scroll', handleScroll)

  }, [])


  // const { top, height } = props.tableRef.getBoundingClientRect();
  //
  // console.log(props.tableRef.getBoundingClientRect())

  // function isVisible({ top, offset, height }) {
  //   return top + offset + height >= 0 && top - offset <= window.innerHeight;
  // }

  // useLayoutEffect(() => {
  //
  //   console.log("uselayout")
  //
  //
  //   ref.current = document.getElementById('tableContainer');
  //   const scrollElement = ref.current
  //
  //   if (!scrollElement) {
  //     console.log("noref")
  //     return;
  //   }
  //
  //   const handleScroll = () => {
  //     const scrollTop = scrollElement.scrollTop;
  //     setScrollTop(scrollTop)
  //   }
  //
  //   handleScroll()
  //
  //   scrollElement.addEventListener('scroll', handleScroll)
  //
  //   return () => scrollElement.removeEventListener('scroll', handleScroll)
  //
  // }, [])
  //
  // const [startIndex, endIndex] = useMemo(() => {
  //   console.log("scrollTop")
  //   console.log(scrollTop)
  //   const rangeStart = scrollTop;
  //   const rangeEnd = scrollTop + 400;
  //   let startIndex = Math.floor(rangeStart / 37)
  //   let endIndex = Math.ceil(rangeEnd / 37)
  //
  //   startIndex = Math.max(0, startIndex)
  //   endIndex = Math.min(rowsState.length, endIndex)
  //
  //   console.log(startIndex)
  //   console.log(endIndex)
  //
  //   return [startIndex, endIndex]
  //
  //
  // }, [scrollTop, rowsState.length])
  //
  // function handleTableScroll(e) {
  //
  //   // console.log(props.tableRef.getBoundingClientRect())
  //   let scrollTop = e.target.scrollTop
  //   const startIndexx = Math.max(0, Math.min(rowsState.length-1, Math.floor((scrollTop)/37)))
  //   const endIndexx = Math.max(0, Math.min(rowsState.length-1, Math.ceil((scrollTop + 400)/37)))
  //   console.log(startIndexx)
  //   console.log(endIndexx)
  //
  //   // setStartIndex(startIndexx)
  //   // setEndIndex(endIndexx)
  //   // setVisibleItems()
  //
  // }


// const itemsToRender = rowsState.slice(startIndex, endIndex)
//   console.log(itemsToRender)

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



  return (
    <div style={{height: 400, overflow: "auto", border : "2px solid red", display: "contents"}} ref={tableRef}>
    <TableBody>
      {/*{itemsToRender.map((row, index) => {*/}
      {/*{rowsState.slice(0, 50).map((row, index) => {*/}
      {rowsState.map((row, index) => {
      {/*{rowsState.slice(startIndex, endIndex + 1).map((row, index) => {*/}
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
            <StickyTableCell align="center" sx={isItemSelected?{ left: '54px', backgroundColor: '#93abf3'} : {left: '54px'}}>
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
    </div>
  );
}