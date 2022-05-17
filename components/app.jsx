// console.log('hello from jsx')
const React = require('react')
const ReactDOM = require('react-dom')

const List = require('./list.jsx')

let props = window.props

ReactDOM.render(
  <List messages={window.__data}></List>,
  document.getElementById('content')
)