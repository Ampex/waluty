import React from 'react'
import { Select, FormControl, InputLabel } from '@material-ui/core'

const Currency = props => {
  return (
    <FormControl style={{ minWidth: 250 }}>
      <InputLabel>Waluta</InputLabel>
      <Select
        autoWidth
        name='currency'
        value={props.currency}
        onChange={props.onChange}
      >
        {props.list}
      </Select>
    </FormControl>
  )
}

export default Currency
