
import { createStore } from 'redux';
import TaskToolkitReducer from './reducer/TaskToolkitReducer.js';
import rootReducer from './reducer/RootReducer';
import TypeReducer from './reducer/TypeReducer.js';
import TaskReducer from './reducer/TaskReducer.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
   reducer: {
      TypeReducer,
      TaskReducer,
      // TaskToolkitReducer: TaskToolkitReducer
   },
});


export default store;