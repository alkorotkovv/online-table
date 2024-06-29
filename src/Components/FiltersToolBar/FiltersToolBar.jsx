// import React from "react";
// import Checkbox from "@mui/material/Checkbox";
//
// export default function FilterToolbar(props) {
//
//   const { filtersState, setFiltersState } = props;
//
//   const handleClick = (event, row, column) => {
//
//   }
//
//   return (
//     <div className={'filters' + (filtersState.isVisible ? ' filters_visible' : '')} style={{ top: filtersState.y, left: filtersState.x }}>
//       <ul className='filters__list'>
//         <li className='filters__item'>
//           <Checkbox
//             color="primary"
//             // checked={isFilterItemSelected}
//             checked={false}
//             onClick={(event) => handleClick(event, 1, 1)}
//           />
//           <p className='filters__item-text'>фильтр 1</p>
//         </li>
//       </ul>
//       <button className='filters__button' onClick={() => setFiltersState({...filtersState, isVisible: false})}>Отмена</button>
//     </div>
//   )
// }

import React, { useRef, useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function FilterToolbar(props) {

  const { filtersState, setFiltersState } = props;
  const [checked, setChecked] = React.useState([0]);
  const filtersToolbarRef = useRef(null)

  useEffect(() => {

    // Bind the event listener
    if (filtersState.isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (!filtersToolbarRef.current.contains(event.target)) {
      setFiltersState({...filtersState, isVisible: false})
    }
  }


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div ref={filtersToolbarRef} className={'filters' + (filtersState.isVisible ? ' filters_visible' : '')} style={{ top: filtersState.y, left: filtersState.x }}>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}
