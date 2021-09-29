export const ACTION_NAME = {
  TYPE_ALL: 'TYPE_ALL',
  TYPE_COMPLETED: 'TYPE_COMPLETED',
  TYPE_ACTIVE: 'TYPE_ACTIVE',
}


export function chooseType(data) {
  switch (data) {
    case 'ALL':
      return {
        type: ACTION_NAME.TYPE_ALL
      }
    case 'COMPLETED':
      return {
        type: ACTION_NAME.TYPE_COMPLETED
      }
    case 'ACTIVE':
      return {
        type: ACTION_NAME.TYPE_ACTIVE
      }
  }
}