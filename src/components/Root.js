import React, { Component } from 'react'
import styled from 'styled-components'
import Tasks from './Pages/Tasks'
import CreateTask from './Pages/CreateTask'
import TaskDetail from './Pages/TaskDetail'
import { VIEW_CONTROLLER_TASKS, 
  VIEW_CONTROLLER_TASKS_CREATE, 
  VIEW_CONTROLLER_TASKS_DETAIL,
  VIEW_CONTROLLER_TASKS_CHANGE } from '../helpers/constants'

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewController: VIEW_CONTROLLER_TASKS,
      tasks: [],
      selectElement: null
    }
    this.changeView = this.changeView.bind(this)
    this.createNewTask = this.createNewTask.bind(this)
    this.changeTask = this.changeTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.changeProgress = this.changeProgress.bind(this)
  }

  componentWillMount() {
    if (localStorage['tasks']) {
      this.setState({ tasks : JSON.parse(localStorage['tasks'])})
    } else {
      const tasks = [
        {
          title: 'Задача организации',
          description: 'Значимость этих проблем настолько очевидна, что новая модель организационной деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач.',
          status: 'Ожидание',
          progress: ['20.08.2019 19:00', '20.08.2019 19:20'],
          deadline: '25.09.2019 19:00'
        },
        {
          title: 'Значимость этих проблем настолько очевидна',
          description: 'Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки направлений прогрессивного развития.',
          status: 'Выполнение',
          progress: ['20.08.2019 19:00'],
          deadline: '29.09.2019 19:00'
        },
        {
          title: 'Равным образом дальнейшее развитие различных форм',
          description: 'Повседневная практика показывает, что начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям',
          status: 'Завершена',
          progress: ['20.08.2019 19:00', '20.08.2019 19:10', '20.08.2019 19:20', '20.08.2019 19:30'],
          deadline: '26.09.2019 19:00'
        },
        {
          title: 'Разнообразный и богатый опыт',
          description: 'Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации новых предложений.',
          status: 'Ожидание',
          progress: [],
          deadline: '22.09.2019 19:00'
        }
      ]
      this.setState({ tasks })
    }
  }

  componentDidUpdate() {
    localStorage['tasks'] = JSON.stringify(this.state.tasks)
  }

  changeStatus(status, select) {
    const copyState = { ...this.state }
    copyState.tasks[select].status = status
    this.setState({copyState})
  }

  changeProgress(time, select) {
    const copyState = { ...this.state }
    copyState.tasks[select].progress = [ ...copyState.tasks[select].progress, time ]
    this.setState({copyState})
  }

  changeView(view, select = null) {
    this.setState({ viewController : view })
    if (select !== null) {
      this.setState({ selectElement : select })
    }
  }

  createNewTask(obj) {
    const copyState = { ...this.state }
    copyState.tasks.push(obj)
    this.setState({copyState})
  }

  changeTask(obj, select) {
    const copyState = { ...this.state }
    copyState.tasks[select] = obj
    this.setState({copyState})
  }

  deleteTask(select) {
    const copyState = { ...this.state }
    copyState.tasks.splice(select, 1)
    this.setState({copyState})
  }

  render() {
    const { viewController, tasks, selectElement } = this.state
    const { tasksView } = this.props
    return (
      <RootContainer>
        {
          viewController === VIEW_CONTROLLER_TASKS ? (
            <Tasks onChangeView={this.changeView} tasks={tasks} onDeleteTask={this.deleteTask} tasksView={tasksView}/>
          ) : viewController === VIEW_CONTROLLER_TASKS_CREATE ? (
            <CreateTask titleName='Новая задача' onChangeView={this.changeView} onCreateNewTask={this.createNewTask}/>
          ) : viewController === VIEW_CONTROLLER_TASKS_CHANGE ? (
            <CreateTask titleName='Изменение задачи' onChangeView={this.changeView} changeTask={tasks[selectElement]} select={selectElement} onCreateNewTask={this.changeTask}/>
          ) : viewController === VIEW_CONTROLLER_TASKS_DETAIL ? (
            <TaskDetail task={tasks[selectElement]} select={selectElement} onChangeView={this.changeView} onСhangeProgress={this.changeProgress} onChangeStatus={this.changeStatus}/>
          ) : <Tasks />
        }
      </RootContainer>
    )
  }
}

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(13, 13, 13, 0.5);
  border-radius: 8px;
  padding: 15px;
`