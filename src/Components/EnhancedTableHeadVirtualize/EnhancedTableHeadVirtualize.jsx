import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import * as React from "react";
import {styled} from "@mui/material/styles";
import PropTypes from 'prop-types';
import TableCell from "@mui/material/TableCell";

EnhancedTableHeadVirtualize.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const HeaderTableCell = styled(TableCell)({
  position: 'sticky',
  zIndex: '3',
  top: '0',
  left: '0',
  color: 'black',
  backgroundColor: 'mediumaquamarine',
  border: '1px solid lightgrey',
  padding: '4px',
  minWidth: '200px'
});

const FirstHeaderTableCell = styled(HeaderTableCell)({
  minWidth: '54px'
});


export default function EnhancedTableHeadVirtualize(props) {

  const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleFilterClick = (event, index) => {
    console.log('FILTER')
    console.log(index)
    props.setFiltersX(event.clientX)
    props.setIsFiltersVisible(true)
  }

  return (
    <TableHead sx={{position: "sticky", top: 0, zIndex: 5}}>
      <TableRow >
        <FirstHeaderTableCell padding="checkbox" style={{ width: '52px'}}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </FirstHeaderTableCell>
        {headCells.map(( headCell, index) =>(
            <HeaderTableCell style={ index==0?{left: '54px', minWidth: '54px'} : index==1?{left: '108px'} : index==2?{left: '308px'} : index==3?{left: '508px'} : {zIndex: '2'}}
                             key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
                             align={'center'}
              // style={{ minWidth: 200 }}
                             padding={headCell.disablePadding ? 'none' : 'normal'}
                             sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}

              >
                {index!=0 && <FilterListIcon onClick={(event) => handleFilterClick(event, index)}/>}
                {/*<TableSorter array={rows} field={"carbs"} setSortedArray={setMainTableData} sortedField={sortedField} setSortedField={setSortedField}/>*/}
                <p style={{margin: '0'}} onClick={createSortHandler(headCell.id)}>{headCell.label}</p>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>

                ) : null}

              </TableSortLabel>

            </HeaderTableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}



