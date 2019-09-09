import React, { Component } from 'react'
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'
import Button from '../Button'
import moment from 'moment'
import Title from '../Title'
import { VIEW_CONTROLLER_TASKS } from '../../helpers/constants'

export default class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      status: 'Ожидание',
      progress: [],
      deadline: new Date(moment().add(1, 'd'))
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentDidMount() {
    if (this.props.changeTask) {
      const copyProps = {...this.props.changeTask}
      copyProps.deadline = moment(copyProps.deadline, 'DD.MM.YYYY HH:mm').format('ddd MMM DD YYYY HH:mm:ss')
      copyProps.deadline = new Date(copyProps.deadline)
      console.log(copyProps.deadline)
      this.setState(copyProps)
    }
  }

  handleTextChange(e) {
    this.setState(e)
  }

  onChange = deadline => this.setState({ deadline })

  createNewTask() {
    const copyState = { ...this.state }
    if (!copyState.title) {
      copyState.title = 'Заголовок не задан'
    }
    if (!copyState.description) {
      copyState.description = 'Описание отсутствует'
    }
    copyState.deadline = moment(copyState.deadline).format('DD.MM.YYYY HH:mm')
    if (this.props.changeTask) {
      this.props.onCreateNewTask(copyState, this.props.select)
    } else {
      this.props.onCreateNewTask(copyState)
    }
    this.props.onChangeView(VIEW_CONTROLLER_TASKS)
  }

  render() {

    const { title, description, deadline } = this.state
    const { onChangeView, titleName } = this.props
    return (
      <CreateTaskContainer>
        <Title title={titleName} btnStyle='chevron' btnName='К списку задач' onChangeView={onChangeView} viewController = {VIEW_CONTROLLER_TASKS} />
        <CreateTaskWrapper>
          <CreateTaskInputBox>
            <CreateTaskInput 
              value={title}
              placeholder='Заголовок'
              onChange={e => this.handleTextChange({ title: e.target.value })}
              type='text'
              name='title'
              required
            />
          </CreateTaskInputBox>
          <CreateTaskInputBox>
            <CreateTaskArea 
              value={description}
              placeholder='Описание задачи...'
              onChange={e => this.handleTextChange({ description: e.target.value })}
              type='text'
              name='description'
              required
            />
          </CreateTaskInputBox>
          <CreateTaskInputPicker>
            <DateTimePickerText>Крайни срок</DateTimePickerText>
            <DateTimePicker
              onChange={this.onChange}
              value={deadline}
            />
          </CreateTaskInputPicker>
          <CreateTaskButtons>
            <ButtonClick onClick={() => this.createNewTask()}>
              <Button title='Сохранить' theme='green' />
            </ButtonClick>
            <ButtonClick onClick={() => onChangeView(VIEW_CONTROLLER_TASKS)}>
              <Button title='Отмена' theme='red' />
            </ButtonClick>
            
          </CreateTaskButtons>
        </CreateTaskWrapper>
      </CreateTaskContainer>
    )
  }
}
const ButtonClick = styled.div``
const CreateTaskContainer = styled.div`
  width: 100%;
`
const CreateTaskButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const DateTimePickerText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #757575;
`
const CreateTaskArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 150px;
  max-height: 200px;
  padding: 10px 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`
const CreateTaskInput = styled.input`
  width: 100%;
  height: 35px;
  background: transparent;
  border: none;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`
const CreateTaskInputPicker = styled.div`
  width: 100%;
  background: #EAEAEA;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 0 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CreateTaskInputBox = styled.div`
  width: 100%;
  background: #EAEAEA;
  border-radius: 8px;
  padding: 0 15px;
  margin: 0 0 15px;
`
const CreateTaskWrapper = styled.div`
  max-width: 500px;
  width: 100%;
`