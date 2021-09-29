import { ACTION_NAME } from '../action/AddTaskAction'
const task_state = {
  task_state: [
    {

      name: 'Training day 1 HLS course ',
      isDone: false,
    },
    {

      name : 'Training day 2 HLS course ',
      isDone: true,
    }
  ],
}


function TaskReducer(state = task_state, action) {

  switch (action.type) {
    case ACTION_NAME.ADD_TASK_ACTION:
      return {
        ...state,
        task_state: [action.payload, ...state.task_state],
      }
    default:
      return state
  }
}

export default TaskReducer;

