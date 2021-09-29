export const  ACTION_NAME = {
  ADD_TASK_ACTION : 'ADD_TASK_ACTION',
}

export function addTask( task ){
  console.log(" OKI TASK HERE ------- " , task )
  return {
    payload : task , 
    type : ACTION_NAME.ADD_TASK_ACTION
  }
}