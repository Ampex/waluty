import React from 'react'
import Grow from '@material-ui/core/Grow'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label
} from 'recharts'

const History = props => {
  return (
    <Grow timeout={1500} in>
      <div style={{ textAlign: 'center' }} className='element'>
        <h2>Historical data for {props.symbol}</h2>
        <LineChart width={550} height={300} data={props.data}>
          <XAxis dataKey='effectiveDate' />
          <YAxis />
          <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
          <Tooltip />
          <Label />
          <Line
            type='monotone'
            dataKey={props.symbol}
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </Grow>
  )
}

export default History
