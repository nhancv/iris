import * as React from 'react'
import './App.css'

const logo = require('./logo.svg')

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IRIS</h1>
        </header>
        <p className="App-intro">
        Xin chào, tôi là Iris. Chuyên viên hỗ trợ tư vấn cho thuê căn hộ Celadon City
        </p>
        <a href="https://join.skype.com/bot/02561a08-6485-4581-af02-8da829a91c89">Get me!!!</a>
      </div>
    )
  }
}
