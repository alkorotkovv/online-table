import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "./RightContext.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

RightContext.propTypes = {
  rightContextState: PropTypes.object.isRequired,
  handleAddRow: PropTypes.func.isRequired,
  handleCopyRow: PropTypes.func.isRequired,
  handleInsertRow: PropTypes.func.isRequired,
  handleDeleteRows: PropTypes.func.isRequired,
  handleCleanRows: PropTypes.func.isRequired,
};

export default function RightContext(props) {

  const { rightContextState, handleDeleteRows, handleAddRow, handleCopyRow, handleInsertRow, handleCleanRows } = props;

  const selectedRows = useSelector(state => state.table.selectedRows)
  const copiedRows = useSelector(state => state.table.copiedRows)

  return (
    <>
      <div className={'context ' + (rightContextState.isVisible? ' context_visible' : '')} style={{ top: rightContextState.y, left: rightContextState.x }} >
          <div className="context__content">
            <div className="context__item" onClick={() => handleAddRow()}>
              <AddCircleOutlineIcon />
              <p>Добавить новую строку в конец</p>
            </div>
            {selectedRows.length > 0 && (
            <>
              <div className="context__item" onClick={() => handleCopyRow(selectedRows)}>
                <ContentCopyIcon/>
                <p>Скопировать выделенную строку</p>
              </div>
              { copiedRows.length > 0 ? (
              <div className="context__item" onClick={() => handleInsertRow(copiedRows)}>
                <ArrowCircleRightIcon/>
                <p>Вставить в выделенную строку</p>
              </div>
              ) : <></>
              }
              <div className="context__item" onClick={() => handleCleanRows(selectedRows)}>
                <CleaningServicesIcon/>
                <p>Очистить содержимое выделенных строк</p>
              </div>
              <div className="context__item" onClick={() => handleDeleteRows(selectedRows)}>
                <DeleteIcon/>
                <p>Удалить выделенные строки</p>
              </div>
            </>
            )}
          </div>
      </div>
    </>
  );
}