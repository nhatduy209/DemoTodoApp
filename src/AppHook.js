
import React, { useState } from 'react'
import { addTask } from './redux/action/AddTaskAction'
import { chooseType } from './redux/action/TypeAction'
import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
const AppHook = (props) => {


  const [text, setText] = useState("");
  const getTodo = state => state.TaskReducer.task_state
  const getVisibilityFilter = state => state.TypeReducer.type;
  const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodo],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'ALL':
          return todos
        case 'COMPLETED':
          return todos.filter(t => t.isDone)
        case 'ACTIVE':
          return todos.filter(t => !t.isDone)
        default  : return todos;
      }
    }
  )
  const task = useSelector(getVisibleTodos)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   console.log(" PROPS-----", currentUser)
  // }, [props.task])


  const handleSubmit = () => {
    var newtask = {
      name: text,
      isDone: false
    }
    let canAdd = true;
    task.map(item => {
      if (item.name === text) {
        canAdd = false;
      }
    })

    if (canAdd) {
      if (text.length === 0) {
        alert('Nhập task ------')
      } else {
        dispatch(addTask(newtask))
      }
    }
    else {
      alert('Task đã có ------')
    }

  }

  const chooseRender = () => {
    console.log("REDUX  HOOK  --------", task)
    return (
      <ul>
        {
          task.map((item, index) =>
            <div class="renderItem"
              onClick={() => changeStatus(item)}
            >
              <li
                key={item.name}
              >
                {
                  <ItemRender item={item} />
                }
              </li>
            </div>
          )
        }
      </ul>
    )
  }

  const changeStatus = (val) => {
    task.map(item => {
      if (item.name === val.name) {
        if (item.isDone) {
          item.isDone = false;
        } else {
          item.isDone = true;
        }
      }
    })
  }

  return (
    <div class="app-container">
      <h3> DEMO FOR REACT HOOK  </h3>
      <div>
        <input class="input"
          placeholder="WHAT NEED TO BE DONE ?"
          onChange={value => { setText(prevText => prevText = value.target.value) }}>
        </input>
        <button class="submitBtn" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>


      {/* TASK CONTRIBUTE  */}
      <div class="list">
        {chooseRender()}
      </div>

      <div style={{ flexDirection: 'row', width: 400, alignItems: 'center' }}>

        <span style={{ fontSize: 20, marginLeft: 20 }}>
          All items {' '}    {task.length}
        </span>
        <div style={{ float: 'right', alignItems: 'center' }}>
          <button onClick={() => dispatch(chooseType('ALL'))}>
            ALL
          </button>
          <button onClick={() => dispatch(chooseType('ACTIVE'))}>
            ACTIVE
          </button>
          <button onClick={() => dispatch(chooseType('COMPLETED'))}>
            COMPLETE
          </button>
        </div>
      </div>
    </div>
  );
}
export default AppHook
const ItemRender = (props) => {
  const [status, setStatus] = useState(props.item.isDone)
  const setStatusItem = () => {
    if (status) {
      setStatus(false);
    }
    else {
      setStatus(true);
    }
  }

  const textDecoration = (props.item.isDone === true ? 'line-through' : 'none');
  const colorText = (props.item.isDone === true ? '#bbbbbb' : 'black');
  const imgInit = (props.item.isDone ? "image/green-tick.svg" : "image/black-tick.svg")
  return (
    <div onClick={setStatusItem} style={{ textDecorationLine: textDecoration, justifyItems: 'center', color: colorText }}>
      <img class="tick" src={imgInit} alt="My Happy SVG" />
      {' '}{props.item.name}
    </div>
  )
}
