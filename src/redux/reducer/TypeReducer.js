import { ACTION_NAME } from '../action/TypeAction'
const type_state = ['ALL', 'COMPLETED', 'ACTIVE']



function TypeReducer(state = type_state, action) {
  switch (action.type) {
    case ACTION_NAME.TYPE_ALL:
      return {
        ...state,
        type: state[0]
      }
    case ACTION_NAME.TYPE_COMPLETED:
      return {
        ...state,
        type: state[1]
      }
    case ACTION_NAME.TYPE_ACTIVE:
      return {
        ...state,
        type : state[2]
      }
    default:
      return {
        ...state,
        type: state[0]
      }
  }
}

export default TypeReducer;