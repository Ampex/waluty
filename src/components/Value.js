import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'

const Value = props => {
  return (
    <TextField
      style={{ width: 250 }}
      label='Wartość'
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
