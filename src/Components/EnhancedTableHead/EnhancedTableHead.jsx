import React, { useRef, useState, useEffect } from 'react';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {
  setSelectedRowsReducer
} from "../../store/tableSlice";
import {styled} from "@mui/material/styles";
import {headCells} from '../../constants';
import PropTypes from 'prop-types';
import TableCell from "@mui/material/TableCell";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  setFiltersState: PropTypes.func.isRequired,
};

const HeaderTableCell = styled(TableCell)({
  position: 'sticky',
  zIndex: '3',
  top: '0',
  left: '0',
  color: 'black',
  backgroundColor: 'lightsteelblue',
  border: '1px solid lightgrey',
  padding: '4px',
  fontSize: '14px'
  // minWidth: '100px'
});

const FirstHeaderTableCell = styled(HeaderTableCell)({
  minWidth: '54px'
});


export default function EnhancedTableHead(props) {

  console.log("RERENDEREnhancedTableHead")

  const { order, orderBy, onRequestSort, setFiltersState } = props;

  const dispatch = useDispatch()
  const rowsState = useSelector(state => state.table.rows)
  const selectedRows = useSelector(state => state.table.selectedRows)

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      dispatch(setSelectedRowsReducer({selectedRows: rowsState.map((row) => row.id)}))
    }
    else {
      dispatch(setSelectedRowsReducer({selectedRows: []}))
    }
  }

  const handleFilterClick = (e, column, index) => {
    console.log(column)
    setFiltersState({isVisible: true, x:e.clientX, y: 100 })

    axios.post(`/progress/react000/get_filters_by_column`,
      {
        column: column,
      },
      {
        params: {
          sskey: sessionStorage.getItem('sessionStorageKey'),
        }
      })
      .then(res => {
        console.log(res)
      })


  }

  return (
    <TableHead>
      <TableRow>
        <FirstHeaderTableCell padding="checkbox" style={{ width: '52px'}}>
          <Checkbox
            color="primary"
            indeterminate={selectedRows.length > 0 && selectedRows.length < rowsState.length}
            checked={rowsState.length > 0 && selectedRows.length === rowsState.length}
            onChange={handleSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </FirstHeaderTableCell>
        {headCells.map(( headCell, index) =>(
            // <HeaderTableCell style={ index==0?{left: headCell.slice(0, index).reduce(function (sum, column) { return sum + column.width}, 54), minWidth: headCell.width}
          // : index==1?{left: '120px', minWidth: headCell.width}
          // : index==2?{left: '320px', minWidth: headCell.width}
          //   : index==3?{left: '520px', minWidth: headCell.width}
          //     : index==4?{left: '720px', minWidth: headCell.width}
          //       : {zIndex: '2', minWidth: headCell.width}}
          //   <HeaderTableCell style={ index==0?{left: headCells.slice(0, index).reduce(function (sum, column) { return sum + column.width}, 54), minWidth: headCell.width}
          //                          : index==1?{left: headCells.slice(0, index).reduce(function (sum, column) {return sum + column.width}, 54), minWidth: headCell.width}
          //                          : index==2?{left: headCells.slice(0, index).reduce(function (sum, column) {return sum + column.width}, 54), minWidth: headCell.width}
          //                          : index==3?{left: headCells.slice(0, index).reduce(function (sum, column) { return sum + column.width}, 54), minWidth: headCell.width}
          //                          : index==4?{left: headCells.slice(0, index).reduce(function (sum, column) { return sum + column.width}, 54), minWidth: headCell.width}
          //                             : {zIndex: '2', minWidth: headCell.width}}


          <HeaderTableCell style={ headCell.fixed?{left: headCells.slice(0, index).reduce(function (sum, column) { return sum + column.width}, 54), minWidth: headCell.width}
                                    : {zIndex: '2', minWidth: headCell.width}}
                             key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
                             align={'center'}
              // style={{ minWidth: 200 }}
                             padding={headCell.disablePadding ? 'none' : 'normal'}
                             sortDirection={orderBy === headCell.id ? order : false}
            >
              {/*<TableSortLabel*/}
              {/*  active={orderBy === headCell.id}*/}
              {/*  direction={orderBy === headCell.id ? order : 'asc'}*/}
              {/*>*/}

              {/*  <p style={{lineHeight: '1.2'}} onClick={(e) => onRequestSort(e, headCell.id)}>{headCell.label}</p>*/}
              {/*  {index!=0 && <FilterAltIcon fontSize="small" onClick={(event) => handleFilterClick(event, index)}/>}*/}
              {/*  {orderBy === headCell.id ? (*/}
              {/*    <Box component="span" sx={visuallyHidden}>*/}
              {/*      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}*/}
              {/*    </Box>*/}
              {/*  ) : null}*/}


              {/*</TableSortLabel>*/}

              <div style={{display: 'flex', alignItems: "center", paddingLeft: "10px"}}>
                <p style={{lineHeight: '1.2'}} >{headCell.label}</p>
                {index!=0 && <FilterAltIcon sx={{marginLeft: "auto", color: "#545454", cursor: "pointer"}} fontSize="small" onClick={(e) => handleFilterClick(e, headCell.id, index)}/>}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
                {index != 0 &&
                <div style={{display: 'flex', flexDirection: 'column', cursor: "pointer", color: "#545454"}} onClick={(e) => onRequestSort(e, headCell.id)}>
                  <KeyboardArrowUpIcon sx={orderBy === headCell.id && order === 'desc' ? {display: "none"} : orderBy === headCell.id ? {marginBottom: '0px'} : {marginBottom: '-10px'}} fontSize="small"/>
                  <KeyboardArrowDownIcon sx={orderBy === headCell.id && order === 'asc' ? {display: "none"} : {}} fontSize="small"/>
                </div>
                }
              </div>


            </HeaderTableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}



