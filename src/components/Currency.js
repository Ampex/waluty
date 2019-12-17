import React from 'react'
import {
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@material-ui/core'

const Currency = props => {
  return (
    <FormControl disabled={props.disabled} style={{ minWidth: 250 }}>
      <InputLabel>Waluta</InputLabel>
      <Select
        autoWidth
        name='currency'
        value={props.currency}
        onChange={props.onChange}
      >
        {props.list}
      </Select>
      {props.disabled && (
        <CircularProgress
          size={30}
          style={{ position: 'absolute', left: '44%', top: '25%' }}
        />
      )}
    </FormControl>
  )
}

export default Currency
