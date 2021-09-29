
import React, { useState, useEffect } from 'react'
import { addTask } from './redux/action/AddTaskAction'
import { chooseType } from './redux/action/TypeAction'
import { createSelector } from 'reselect'
import {connect } from 'react-redux'
const AppHook = (props) => {

  useEffect(() => {
    console.log(" PROPS-----", props)
  }, [props.task])

  const [text, setText] = useState("");
  

  const handleSubmit = () => {
    var task = {
      name: text,
      isDone: false
    }
    let canAdd = true ; 
    props.task.map(item => {
      if (item.name === text) {
        canAdd = false;
      }
    })

    if(canAdd){
      if ( text.length === 0) {
        alert('Nhập task ------')
      } else {
       props.addTask(task)
       
      }
    }
    else {
      alert('Task đã có ------')
    }
  
  }

  const chooseRender = () => {
    return (
      <ul>
        {
          props.task.map((item, index) =>
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
    props.task.map(item => {
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
          All items {' '}    {props.task.length}
        </span>
        <div style={{ float: 'right', alignItems: 'center' }}>
          <button onClick={() => props.chooseType('ALL')}>
            ALL
          </button>
          <button onClick={() => props.chooseType('ACTIVE')}>
            ACTIVE
          </button>
          <button onClick={() => props.chooseType('COMPLETED')}>
            COMPLETE
          </button>
        </div>
      </div>
    </div>
  );
}

const getVisibilityFilter = (state) => state.TypeReducer.type;

const getTask = (state) => state.TaskReducer.task_state;

const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTask],
  (visibilityFilter, task) => {
    switch (visibilityFilter) {
      case 'ALL':
        return task ;
      case 'COMPLETED':
        return task.filter(t => t.isDone === true) 
      case 'ACTIVE':
        return task.filter(t => t.isDone === false)
    }
  }
)

const mapStateToProps = state => {
  return {
    task: getVisibleTodos(state),
  }
}
export default connect(mapStateToProps, {  addTask, chooseType })(AppHook)
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
