import React from 'react'
import Grow from '@material-ui/core/Grow'

const Currency = props => {
  return (
    <Grow timeout={1500} in>
      <div style={{ fontSize: '25%', textAlign: 'center' }} className='element'>
        {`${(props.value / props.currency).toFixed(2)} ${props.symbol}`}
      </div>
    </Grow>
  )
}

export default Currency
