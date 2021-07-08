import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Fuse} from './error/handleErrors'

window.onerror = (message, url)=> {
  console.log('неперехваченная ошибка', message, url);
}

ReactDOM.render(
<Fuse>
  <App />  
</Fuse>,
  document.getElementById('root')
);