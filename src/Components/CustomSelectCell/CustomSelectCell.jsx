import * as React from "react";
import "./CustomSelectCell.css";
import {options} from "../../constants";

export default function CustomSelectCell(props) {

  const {row, column, options, value, handleCellValueChange} = props;

  const [selectedOption, setSelectedOption] = React.useState(value)

  React.useEffect(() => {
    setSelectedOption(value)
  },[value])

  const onSelectChange = (e) => {
    console.log("change")
    const selOption = e.target.options[e.target.selectedIndex].value
    setSelectedOption(selOption)
    console.log(selOption)
    handleCellValueChange(row, column, selOption)
  }


  return (
    <select className="select" value={selectedOption} onChange={onSelectChange} style={{backgroundColor: "transparent"}}>
      { options.map((option, index) =>
        <option key={option.id + index} value={option.id}>{option.name}</option>
      )}
    </select>
  );
}