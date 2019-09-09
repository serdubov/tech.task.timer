import React, { Component } from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import Title from '../Title'
import tomatoIco from '../../assets/icons/tomato.svg'
import Button from '../Button'
import Timer from '../Timer'
import { VIEW_CONTROLLER_TASKS } from '../../helpers/constants'

export default class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { onChangeView, task, select, onChangeStatus, onСhangeProgress } = this.props
    return (
      <TasksContainer>
        <Title title={task.title} taskStatus={task.status} btnStyle='chevron' btnName='К списку задач' onChangeView={onChangeView} viewController = {VIEW_CONTROLLER_TASKS} />
        <TasksWrapper>
          <TasksInfo>
            <TasksInfoTitle>Описание задачи</TasksInfoTitle>
            <TasksInfoDescription>{task.description}</TasksInfoDescription>
            <TasksInfoBox>
              <InfoTitle>Статус</InfoTitle>
              <InfoDescription>{task.status}</InfoDescription>
            </TasksInfoBox>
            <TasksInfoBox>
              <InfoTitle>Прогресс</InfoTitle>
              <InfoDescription>{task.progress ? 
              _.map(task.progress, (item,index) => {
                return (<TaskItemProgressIco key={index} src={tomatoIco}/>)
              }) : '-' }</InfoDescription>
            </TasksInfoBox>
            <TasksInfoBox>
              <InfoTitle>Крайний срок</InfoTitle>
              <InfoDescription>{task.deadline}</InfoDescription>
            </TasksInfoBox>
              {
                task.status === 'Выполнение' ? 
                  <TasksInfoButton>
                    <ButtonWrap onClick={() => onChangeStatus('Ожидание', select)}>
                      <Button title='Пауза' theme='white' margin='0 15px 0 0'/>
                    </ButtonWrap>
                    <ButtonWrap onClick={() => onChangeStatus('Завершена', select)}>
                      <Button title='Завершить' theme='green'/>
                    </ButtonWrap>
                  </TasksInfoButton>
                :
                task.status === 'Завершена' ? 
                  <TasksInfoButton>
                    <ButtonWrap onClick={() => onChangeStatus('Ожидание', select)}>
                      <Button title='Доработать' theme='white' margin='0 15px 0 0'/>
                    </ButtonWrap>
                  </TasksInfoButton>
                :
                  <TasksInfoButton>
                    <ButtonWrap onClick={() => onChangeStatus('Выполнение', select)}>
                      <Button title='Начать' theme='blue' margin='0 15px 0 0'/>
                    </ButtonWrap>
                    <ButtonWrap onClick={() => onChangeStatus('Завершена', select)}>
                      <Button title='Завершить' theme='green'/>
                    </ButtonWrap>
                  </TasksInfoButton>
              }
            
          </TasksInfo>
          {
            task.status === 'Выполнение' ? 
              <TomatoTimer>
                <TomatoTimerTitle>
                  <TaskItemProgressIco src={tomatoIco}/> 
                  <TomatoTimerTitleText>Помидорный таймер</TomatoTimerTitleText>
                </TomatoTimerTitle>
                <Timer progress={task.progress} select={select} onСhangeProgressTask={onСhangeProgress}/>
              </TomatoTimer>
            : null
          }
        </TasksWrapper>
      </TasksContainer>
    );
  }
}

const ButtonWrap = styled.div``
const TomatoTimerTitleText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  margin: 0 15px;
`
const TomatoTimerTitle = styled.div`
  display: flex;
  margin: 0 0 40px;
`
const TasksInfoButton = styled.div`
  width: 100%;
  display: flex;
`
const InfoTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  margin: 0 15px 0 0;
`
const InfoDescription = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
`
const TasksInfoBox = styled.div`
  display: flex;
  margin: 0 0 25px;
`
const TasksInfoDescription = styled.div`
  max-width: 450px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  margin: 0 0 25px;
`
const TasksInfoTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  margin: 0 0 15px;
`
const TaskItemProgressIco = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 2.5px 0 2.5px;
`
const TomatoTimer = styled.div`
  flex: 0 1 50%;
`
const TasksInfo = styled.div`
  flex: 0 1 50%;
`
const TasksWrapper = styled.div`
  width: 100%;
  display: flex;
`
const TasksContainer = styled.div`
  width: 100%;
`