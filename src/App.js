import React, { Component } from 'react'
import { MenuItem } from '@material-ui/core'

import { BrowserView, MobileView } from 'react-device-detect'

import './App.scss'
import History from './components/History'
import Currency from './components/Currency'
import Value from './components/Value'
import Calculation from './components/Calculation'

const currencies = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json'

export default class App extends Component {
  state = {
    data: null,
    value: '',
    currency: '',
    historyData: [].sort(),
    isDisabled: false
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
      historyData: [],
      isDisabled: false
    })
    this.fetchData()
  }

  fetchData = () => {
    const { symbol } = this.state
    const urls = [
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2009-04-02/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2010-04-02/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2011-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2012-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2013-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2014-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2015-02-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2016-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2017-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2018-04-04/?format=json`,
      `https://api.nbp.pl/api/exchangerates/rates/a/${symbol}/2019-12-13/?format=json`
    ]
    setTimeout(() => {
      this.setState({
        isDisabled: true
      })
    }, 1000)
    const requests = urls.map(
      async url =>
        await fetch(url)
          .then(response => response.json())
          .then(data =>
            this.state.historyData.push({
              effectiveDate: data.rates[0].effectiveDate,
              [this.state.symbol]: data.rates[0].mid
            })
          )
    )
    return requests
  }

  render() {
    const {
      data,
      value,
      currency,
      symbol,
      historyData,
      isDisabled
    } = this.state
    const list =
      data &&
      data.map(item => (
        <MenuItem key={item.code} value={item.mid} code={item.code}>
          {item.code}
        </MenuItem>
      ))

    return (
      <React.Fragment>
        {/* History */}
        {isDisabled && currency ? (
          <React.Fragment>
            <BrowserView>
              <History width={550} data={historyData} symbol={symbol} />
            </BrowserView>
            <MobileView>
              <History width={250} data={historyData} symbol={symbol} />
            </MobileView>
          </React.Fragment>
        ) : (
          false
        )}
        <div className='container'>
          {/* Value */}
          <div className='element'>
            <Value value={value} onChange={this.handleChangeValue} />
          </div>
          {/* Currency */}
          <div className='element'>
            <Currency
              onChange={this.handleChangeCurrency}
              currency={currency}
              list={list}
            />
          </div>
        </div>
        {/* Calculation */}
        {value && currency ? (
          <Calculation value={value} currency={currency} symbol={symbol} />
        ) : (
          false
        )}
      </React.Fragment>
    )
  }
}
