import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { legacy_createStore } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './services/appReducer'
import { BrowserRouter } from 'react-router-dom'


const store = legacy_createStore(appReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)
