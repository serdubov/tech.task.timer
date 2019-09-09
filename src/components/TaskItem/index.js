import React, { Component } from 'react'
import styled from 'styled-components'
import changeIco from '../../assets/icons/pen-create.svg'
import deleteIco from '../../assets/icons/trash-empty.svg'
import tomatoIco from '../../assets/icons/tomato.svg'
import calendar from '../../assets/icons/calendar-dates.svg'

export default class TaskItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    const { task, onChangeView, viewController, viewChangeController, onDeleteTask, select } = this.props

    return (
      <TaskItemContainer 
        color={task.status === 'Завершена' ? '#57FFB3' :
                task.status === 'Просрочена' ? '#FF9E7F' :
                task.status === 'Выполнение' ? '#72BBFF' : '#FFFFFF'}>
        <TaskItemInfo>
          <TaskItemTitle onClick={() => onChangeView(viewController, select)}>
            {
              task.title.length > 30 ? task.title.slice(0, 30) + '...' : task.title
            }
          </TaskItemTitle>
          <TaskItemStatus>
            Статус: {task.status}
          </TaskItemStatus>
          <TaskItemProgress>
            {
              task.progress.length > 0 ? `Прогресс: ${task.progress.length}x ` : null
            }
            {
              task.progress.length > 0 ? <TaskItemProgressIco src={tomatoIco}/> : null
            }
          </TaskItemProgress>
          <TaskItemDeadLine>
            {
              task.deadline.length > 0 ? <TaskItemDeadLineIco src={calendar}/> : null
            }
            {
              task.deadline.length > 0 ? task.deadline : null
            }
          </TaskItemDeadLine>
        </TaskItemInfo>
        <TaskItemButtons>
          <ItemButton src={changeIco} onClick={() => onChangeView(viewChangeController, select)}/>
          <ItemButton src={deleteIco} onClick={() => onDeleteTask(select)}/>
        </TaskItemButtons>
      </TaskItemContainer>
    );
  }
}

const TaskItemDeadLine = styled.div`
  width: 160px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin: 0 20px 0 0;
  display: flex;
`
const TaskItemProgress = styled.div`
  width: 140px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin: 0 20px 0 0;
  display: flex;
`
const TaskItemStatus = styled.div`
  width: 170px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin: 0 20px 0 0;
`
const TaskItemTitle = styled.div`
  width: 280px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin: 0 20px 0 0;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  cursor: pointer;
  &:hover{
    opacity: .75;
  }
`
const TaskItemDeadLineIco = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 5px 0 0;
`
const TaskItemProgressIco = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 0 0 5px;
`
const ItemButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 0 0 15px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  &:hover{
    opacity: .75;
  }
`
const TaskItemButtons = styled.div`
  display: flex;
`
const TaskItemInfo = styled.div`
  display: flex;
`
const TaskItemContainer = styled.div`
  width: 100%;
  padding: 15px 15px;
  background: ${props => props.color ? props.color : '#FFFFFF'};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 15px;
`