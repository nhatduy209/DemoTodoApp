import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import AppHook from './AppHook';
import AppHookToolkit from './AppHookApplyReduxToolkit';
import store from './redux/Store'

// There are three type using in this project :
// APP : using Class Component apply redux
// AppHook: using React Hook apply redux
// AppHookToolkit : using React Hook apply redux toolkit 


// if you want to test APP HOOK pls comment this line TaskToolkitReducer: TaskToolkitReducer in Store.js file , otherwise it will be  crash app 


ReactDOM.render(
  <Provider store = {store} >
   {/*  <App /> */}
    {/* <AppHook /> */}
    <AppHookToolkit/>
  </Provider>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
