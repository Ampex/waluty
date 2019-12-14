import React from 'react'
import Grow from '@material-ui/core/Grow'
import { TextField, InputAdornment } from '@material-ui/core'

const Value = props => {
  return (
    <TextField
      style={{ width: 250 }}
      label='Value'
      name='value'
      type='number'
      InputProps={{
        endAdornment: <InputAdornment position='end'>zł</InputAdornment>
      }}
      value={props.value}
      onChange={props.onChange}
    ></TextField>
  )
}

export default Value
