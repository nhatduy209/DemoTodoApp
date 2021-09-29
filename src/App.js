import './App.css';
import React from 'react'
import { connect } from 'react-redux';
import { addTask } from './redux/action/AddTaskAction'
import { createSelector } from 'reselect'
import { chooseType } from './redux/action/TypeAction'
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      task: '',
    };
  }

  handleChange = (value) => {
    this.setState({ task: value.target.value })
  }

  handleSubmit = () => {
    var task = {
      name: this.state.task,
      isDone: false
    }

    if (this.state.task.length === 0) {
      alert('Nhập task ------')
    } else {
      this.props.addTask(task)
    }
  }

  changeStatus = (val) => {
    this.props.task.map(item => {
      if (item.name === val.name) {
        if (item.isDone) {
          item.isDone = false;
        } else {
          item.isDone = true;
        }
      }
    })
  }

  render() {
    return (
      <div class="app-container">
           <h3> DEMO FOR ClASS COMPONENT </h3>
        <div>
          <input class="input"
            placeholder="WHAT NEED TO BE DONE ?"
            onChange={this.handleChange}>
          </input>
          <button class="submitBtn" onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </div>


        {/* TASK CONTRIBUTE  */}
        <div class="list">
          <ul>
            {
              this.props.task.map(item => {
                return (
                  <div class="renderItem"
                    onClick={() => this.changeStatus(item)}>
                    <li
                      key={item.name}
                    >
                      <ItemRender item={item} />
                    </li>
                  </div>
                )
              })
       
            }
          </ul>
        </div>


        <div style={{ flexDirection: 'row', width: 400, alignItems: 'center' }}>

          <span style={{ fontSize: 20, marginLeft: 20 }}>
            All items {' '}    {this.props.task.length}
          </span>
          <div style={{ float: 'right', alignItems: 'center' }}>
            <button onClick={() => this.props.chooseType('ALL')}>
              ALL
            </button>
            <button onClick={() => this.props.chooseType('ACTIVE')}>
              ACTIVE
            </button>
            <button onClick={() => this.props.chooseType('COMPLETED')}>
              COMPLETE
            </button>
          </div>
        </div>

      </div>
    );
  }
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


export default connect(mapStateToProps, { addTask , chooseType })(App)

class ItemRender extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDone: this.props.item.isDone
    }
  }

  setStatus = () => {
    if (this.state.isDone) {
      this.setState({ isDone: false })
    }
    else {
      this.setState({ isDone: true })
    }
  }

  render() {
    const textDecoration = (this.state.isDone === true ? 'line-through' : 'none')
    const colorText = (this.state.isDone === true ? '#bbbbbb' : 'black');
    const imgInit = ( (this.props.item.isDone)  ? "image/green-tick.svg" : "image/black-tick.svg" ) 
    return (
      <div onClick={this.setStatus} style={{ textDecorationLine: textDecoration , justifyItems : 'center' , color : colorText }}>
      <img class="tick" src = {imgInit} alt="My Happy SVG" />  
        {' '}{this.props.item.name}
    </div>
    )
  }
}

