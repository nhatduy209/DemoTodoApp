
import { combineReducers } from 'redux';

import TaskReducer from './TaskReducer'
import TypeReducer from './TypeReducer'

const RootReducer = combineReducers({
  TypeReducer,
  TaskReducer
});

export default RootReducer;