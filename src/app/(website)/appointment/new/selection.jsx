import React from 'react'
import {InputLabel, Select, MenuItem} from '@mui/material'

function Selection(LabelId, value, label,menuItems, onSelection) {
    console.log(menuItems)
    return(
      <>
      <InputLabel id={LabelId}>{label}</InputLabel>
        <Select
          labelId={LabelId}
          id={label}
          value={value}
          label="Department"
          onChange={e=>onSelection(e.target.value)}
          sx={{
            width: 200,
          }}
        >
          {
          menuItems.map(item => 
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          )
          }
        </Select>
      </>
    )
  }

export default Selection