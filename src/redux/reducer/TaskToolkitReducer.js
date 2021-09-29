import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task_state: [
    {

      name: 'Training day 1 HLS course ',
      isDone: false,
    },
    {

      name: 'Training day 2 HLS course ',
      isDone: true,
    }
  ],
  filter : [],
};

export const TaskToolkitReducer = createSlice({
  name: 'TaskToolkitReducer',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task_state.push(action.payload);
    },
    changeStatusItem: (state, action) => {
      state.task_state.forEach(item => {
        if (item.name === action.payload.name) {
          if (item.isDone) {
            item.isDone = false;
          } else {
            item.isDone = true;
          }
        }
      })
    }
  }
});

export const { addTask , changeStatusItem , taskFilter  } = TaskToolkitReducer.actions;
export const selectTask = (state) => state.TaskToolkitReducer.task_state;
export const selectActiveTask = (state) => state.TaskToolkitReducer.task_state.filter( item => item.isDone === false );
export const selectCompletedTask = (state) => state.TaskToolkitReducer.task_state.filter( item => item.isDone === true );
export default TaskToolkitReducer.reducer;