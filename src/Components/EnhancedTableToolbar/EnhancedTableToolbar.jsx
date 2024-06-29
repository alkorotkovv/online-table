import React, { useRef, useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUpdatingReducer, setLoadingReducer, setClientsCount} from "../../store/appSlice";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from "@mui/icons-material/FilterList";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';

import {setRowsReducer} from "../../store/secondaryTableSlice";

EnhancedTableToolbar.propTypes = {
  handleAddRow: PropTypes.func.isRequired,
  handleCopyRow: PropTypes.func.isRequired,
  handleInsertRow: PropTypes.func.isRequired,
  handleDeleteRows: PropTypes.func.isRequired,
  handleCleanRows: PropTypes.func.isRequired,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function EnhancedTableToolbar(props) {

  const { handleDeleteRows, handleAddRow, handleCopyRow, handleInsertRow, handleCleanRows } = props;

  const dispatch = useDispatch()
  const isUpdating = useSelector(state => state.app.isUpdating)
  const selectedRows = useSelector(state => state.table.selectedRows)
  const copiedRows = useSelector(state => state.table.copiedRows)
  const fileRef = useRef(null)


  const handleFileInputChange = (e) => {
    console.log("Загрузить файл")
    dispatch(setUpdatingReducer({isUpdating: true}))
    e.preventDefault();
    let files = e.target.files, f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {



      let data = e.target.result;
      let readedData = XLSX.read(data, {type: 'binary'});
      const wsname = readedData.SheetNames[1];
      const ws = readedData.Sheets[wsname];
      /* Convert array to json*/
      // const dataParse = XLSX.utils.sheet_to_json(ws);
      const dataParse = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: 1,
      });


      console.log("dataParseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      console.log(dataParse)
      console.log(dataParse[4])

      const headerRow = dataParse[4]


      const excelRows = dataParse.slice(7, 12).map((row, index) => {

        const rowObject ={}
        for (let i = 0; i < headerRow.length; i++) {
          rowObject[headerRow[i]] = row[i];
        }
        return rowObject

      })

      console.log(excelRows)

      console.log("FINISHHHHHHHHHHHHHH")


      dispatch(setRowsReducer(excelRows))
      // dispatch(setUpdatingReducer({isUpdating: false}))

    };
    reader.readAsBinaryString(f)
  }


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedRows.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >

      {selectedRows.length > 0 ? (
        <>
        <Tooltip title="Удалить выбранные строки">
          <IconButton onClick={() => handleDeleteRows(selectedRows)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {/*<Tooltip title="Добавить новую строку">*/}
        {/*  <IconButton onClick={() => addRows(selected)}>*/}
        {/*    <AddCircleOutlineIcon />*/}
        {/*  </IconButton>*/}
        {/*</Tooltip>*/}
        { copiedRows.length > 0 ? (
          <Tooltip title="Вставить">
            <IconButton onClick={() => handleInsertRow()}>
              <ArrowCircleRightIcon/>
            </IconButton>
          </Tooltip>
        ) : <></>
        }
        <Tooltip title="Скопировать">
          <IconButton onClick={() => handleCopyRow(selectedRows)}>
            <ContentCopyIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Стереть содержимое строки">
          <IconButton onClick={() => handleCleanRows(selectedRows)}>
            <CleaningServicesIcon />
          </IconButton>
        </Tooltip>
        </>
      ) : (
        <>
        <Tooltip title="Пока заглушка">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Добавить новую строку в конец">
          <IconButton onClick={() => !isUpdating ? handleAddRow() : console.log("Кнопка добавить строку заблокирована")}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        </>
      )}

      {selectedRows.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Строк выбрано: {selectedRows.length}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Онлайн таблица
        </Typography>
      )}

      {/*<Button*/}
      {/*  component="label"*/}
      {/*  role={undefined}*/}
      {/*  variant="contained"*/}
      {/*  tabIndex={-1}*/}
      {/*  startIcon={<CloudUploadIcon />}*/}
      {/*  onClick={() => console.log("Загрузить файл")}*/}
      {/*>*/}
      {/*  Upload file*/}
      {/*  <VisuallyHiddenInput type="file" />*/}
      {/*</Button>*/}

      <button className="button button_excel" onClick={() => fileRef.current.click()} >Загрузить Excel</button>
      <input type="file" ref={fileRef} onChange={handleFileInputChange} style={{display: "none"}}/>

      {isUpdating &&
        <CircularProgress/>
      }
    </Toolbar>
  );
}