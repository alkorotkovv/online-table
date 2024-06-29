import "./CustomTextAreaCell.css";
import {useDispatch, useSelector} from "react-redux";
import {setUpdatingReducer} from "../../store/appSlice";
import {Websocket} from "../../WebSocket/Websocket";
import * as React from "react";
import {useRef} from "react";
import axios from "axios";
import {setLoadingReducer} from "../../store/appSlice";

export default function CustomInputCell(props) {

  const {row, column, value, disabled} = props;

  const myWs = Websocket
  const [oldState, setOldState] = React.useState(value)
  const [state, setState] = React.useState(value)
  const dispatch = useDispatch()


  const handleTextFieldChange = (value) => {
    setState(value)
  }

  React.useEffect(() => {
    setState(value)
  },[value])

  const handleInputEnd = () => {
    // console.log('END INPUT')
    // console.log(row)
    // console.log(column)
    if (oldState !== state) {
      console.log('Надо обновлять')
      console.log(props.row)
      // handleCellValueChange(row, column, state)

      // setIsUpdating(true)
      dispatch(setUpdatingReducer({isUpdating: true}))

      axios.post(`/progress/react000/update_cell`,
        {
          rowId: row,
          column: column,
          value: state
        },
        {
          params: {
            sskey: sessionStorage.getItem('sessionStorageKey'),
          }
        })
        .then(res => {

          console.log("RES")
          console.log(res)
          if (res.data.status === true) {
            setOldState(state)
            myWs.send(JSON.stringify({
              action: 'CHANGE_CELL_VALUE',
              content: {row: row.toString(), column: column, value: state}
            }));
          }
          else setState(oldState)
        })





      // myWs.send(JSON.stringify({action: 'CHANGE_CELL_VALUE', content: {row: row.toString(), column: column, value: state}}));
    }
    else {
      console.log('Не надо обновлять')
    }
    // console.log(oldState)
    // console.log(state)
  }

  return (
    <textarea className='input'
              name={column}
              value={state? state : ""}
              rows={3}
              onChange={(event) => handleTextFieldChange(event.target.value)}
              onBlur={() => handleInputEnd()}
              disabled={disabled}
    />
  );
}