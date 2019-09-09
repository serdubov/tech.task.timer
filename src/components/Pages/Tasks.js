import React, { Component } from 'react';
import styled from 'styled-components'
import TaskItem from '../TaskItem'
import _ from 'lodash'
import Title from '../Title'
import { VIEW_CONTROLLER_TASKS_CREATE, VIEW_CONTROLLER_TASKS_DETAIL, VIEW_CONTROLLER_TASKS_CHANGE } from '../../helpers/constants'


export default class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasksItem: []
    }
  }
  render() {
    const { onChangeView, tasks, onDeleteTask, tasksView } = this.props
    return (
      <TasksContainer>
        <Title title='Мои задачи' btnStyle='plus' btnName='Создать задачу' onChangeView={onChangeView} viewController={VIEW_CONTROLLER_TASKS_CREATE} />
        { 
          tasks.length > 0 ? (
            _.map(tasks, (item, index) => {
              switch (tasksView) {
                case 'ALL' : 
                  return <TaskItem task={item} key={index} select={index} onDeleteTask={onDeleteTask} onChangeView={onChangeView} viewChangeController={VIEW_CONTROLLER_TASKS_CHANGE} viewController={VIEW_CONTROLLER_TASKS_DETAIL}/>
                case 'TODO' :
                  if(item.status === 'Выполнение'){
                    return <TaskItem task={item} key={index} select={index} onDeleteTask={onDeleteTask} onChangeView={onChangeView} viewChangeController={VIEW_CONTROLLER_TASKS_CHANGE} viewController={VIEW_CONTROLLER_TASKS_DETAIL}/>
                  }
                break;
                case 'WAIT' :
                  if(item.status === 'Ожидание'){
                    return <TaskItem task={item} key={index} select={index} onDeleteTask={onDeleteTask} onChangeView={onChangeView} viewChangeController={VIEW_CONTROLLER_TASKS_CHANGE} viewController={VIEW_CONTROLLER_TASKS_DETAIL}/>
                  }
                break;
                case 'DONE' :
                  if(item.status === 'Завершена'){
                    return <TaskItem task={item} key={index} select={index} onDeleteTask={onDeleteTask} onChangeView={onChangeView} viewChangeController={VIEW_CONTROLLER_TASKS_CHANGE} viewController={VIEW_CONTROLLER_TASKS_DETAIL}/>
                  }
                break;
                default:
                break;
              }
            })
          ) : (
            <TasksNothing>Список задач пуст</TasksNothing>
          )
        }
      </TasksContainer>
    );
  }
}

const TasksNothing = styled.div`
  width: 100%;
  padding: 25px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TasksContainer = styled.div`
  width: 100%;
`