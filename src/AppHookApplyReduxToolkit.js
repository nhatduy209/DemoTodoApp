
import React, { useState, useEffect } from 'react'
//import { addTask } from './redux/action/AddTaskAction'
import { chooseType } from './redux/action/TypeAction'
import { createSelector } from 'reselect'
import { addTask, selectTask, changeStatusItem, selectActiveTask ,selectCompletedTask } from './redux/reducer/TaskToolkitReducer.js'
import { useDispatch, useSelector, connect } from 'react-redux'
const AppHookToolkit = (props) => {


  const list_task = useSelector(selectTask);
  const active_task = useSelector(selectActiveTask);
  const complete_task = useSelector(selectCompletedTask);
  

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [ type, setType] = useState("ALL");
  const handleSubmit = () => {
    var newtask = {
      name: text,
      isDone: false
    }
    let canAdd = true;

    list_task.map(item => {
      if (item.name === text) {
        canAdd = false;
      }
    })

    if (canAdd) {
      if (text.length === 0) {
        alert('Nhập task ------')
      } else {
        // props.addTask(task)
        dispatch(addTask(newtask))

      }
    }
    else {
      alert('Task đã có ------')
    }

  }

  const lengthTask = () => {
    switch(type) {
      case 'ALL' : return list_task.length;
      case 'COMPLETED' : return complete_task.length;
      case 'ACTIVE' : return active_task.length;
      default : break;
    }
  }

  const chooseRender = () => {
    if( type === 'ALL'){
      return (
        <ul>
          {
            list_task.map((item, index) =>
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
    }else if ( type === 'COMPLETED'){
      return (
        <ul>
          {
            complete_task.map((item, index) =>
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
    }else if(type === 'ACTIVE'){
      return (
        <ul>
          {
            active_task.map((item, index) =>
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
   
  }

  const changeStatus = (val) => {
    dispatch(changeStatusItem(val))
  }

  const showActive = (type) => {
    switch(type){
      case 'COMPLETED' :   setType('COMPLETED') ; break 
       case 'ALL' : setType('ALL') ; break ;
       case 'ACTIVE' : setType('ACTIVE') ; break ;
      default : break; 
    }

  }
  return (
    <div class="app-container">
      <h3> DEMO FOR REACT HOOK USING REDUX TOOLKIT  </h3>
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
          All items {' '}   {lengthTask()}
        </span>
        <div style={{ float: 'right', alignItems: 'center' }}>
          <button onClick={() => showActive('ALL')}>
            ALL
          </button>
          <button onClick={() => showActive('ACTIVE')}>
            ACTIVE
          </button>
          <button onClick={() => showActive('COMPLETED')}>
            COMPLETE
          </button>
        </div>
      </div>
    </div>
  );
}

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

export default AppHookToolkit