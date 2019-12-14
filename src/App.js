import React, { Component } from 'react'
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grow
} from '@material-ui/core'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import './App.scss'

const currencies = 'http://api.nbp.pl/api/exchangerates/tables/a/?format=json'

export default class App extends Component {
  state = {
    data: null,
    value: '',
    currency: '',
    historyData: []
  }

  componentDidMount() {
    fetch(currencies)
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data[0].rates
        })
      )
  }

  handleChangeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeCurrency = async (e, index) => {
    this.setState({
      [e.target.name]: await e.target.value,
      symbol: index.key,
      historyData: await []
    })
    this.fetchData()
  }

  fetchData = () => {
    const { symbol } = this.state
    const urls = [
      `http://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2012-04-04/?format=json`,
      `http://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2014-04-04/?format=json`,
      `http://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2016-04-04/?format=json`,
      `http://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2019-04-04/?format=json`
    ]

    const requests = urls.map(url =>
      fetch(url)
        .then(response => response.json())
        .then(data => this.state.historyData.push(data.rates[0]))
    )
    return requests
  }

  render() {
    const { data, value, currency, symbol } = this.state
    const list =
      data &&
      data.map(item => (
        <MenuItem key={item.code} value={item.mid} code={item.code}>
          {item.code}
        </MenuItem>
      ))

    return (
      <React.Fragment>
        {value && currency ? (
          <Grow timeout={1500} in>
            <div style={{ textAlign: 'center' }} className='element'>
              <LineChart width={550} height={300} data={this.state.historyData}>
                <XAxis dataKey='effectiveDate' />
                <YAxis />
                <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='mid'
                  stroke='#8884d8'
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
          </Grow>
        ) : (
          false
        )}
        <div className='container'>
          <div className='element'>
            <TextField
              style={{ width: 250 }}
              label='Value'
              name='value'
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='end'>zł</InputAdornment>
              }}
              value={value}
              onChange={this.handleChangeValue}
            ></TextField>
          </div>

          <div className='element'>
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                autoWidth
                name='currency'
                value={currency}
                onChange={this.handleChangeCurrency}
              >
                {list}
              </Select>
            </FormControl>
          </div>
        </div>
        {value && currency ? (
          <Grow timeout={1500} in>
            <div
              style={{ fontSize: 50, textAlign: 'center' }}
              className='element'
            >
              {`${(value / currency).toFixed(2)} ${symbol}`}
            </div>
          </Grow>
        ) : (
          false
        )}
      </React.Fragment>
    )
  }
}
