import TextField from '@mui/material/TextField';
import * as React from "react";

export default function CustomInputCell(props) {

  const {row, column, value, handleCellValueChange} = props;

  const [oldState, setOldState] = React.useState(value)
  const [state, setState] = React.useState(value)

  const handleTextFieldChange = (value) => {
    setState(value)
  }

  React.useEffect(() => {
    //console.log('inCellChangeStateEffetc')
    // console.log(value)
    setState(value)
  },[value])

  const handleInputEnd = () => {
    // console.log('END INPUT')
    // console.log(row)
    // console.log(column)
    if (oldState !== state) {
      console.log('Надо обновлять')
      handleCellValueChange(row, column, state)
    }
    else {
      console.log('Не надо обновлять')
    }
    // console.log(oldState)
    // console.log(state)
  }

  return (
    <input className='input'
              name={column}
              value={state}
              onChange={(event) => handleTextFieldChange(event.target.value)}
              onBlur={() => handleInputEnd()}
    />
  );
}