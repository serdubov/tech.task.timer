import React, { Component } from 'react'
import styled from 'styled-components'
import plusIco from '../../assets/icons/plus.svg'
import chevronIco from '../../assets/icons/chevron-left.svg'


export default class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { title, btnStyle, btnName, taskStatus, onChangeView, viewController } = this.props
    return (
      <TitleWrapper>
        <TitleContent>
          {title}
          {
            taskStatus ? (
              <TitleContentStatus color={taskStatus === 'Завершена' ? '#57FFB3' :
              taskStatus === 'Просрочена' ? '#FF9E7F' :
              taskStatus === 'Выполнение' ? '#72BBFF' : '#FFFFFF'}/>
            ) : null
          }
        </TitleContent>
        <TitleButton onClick={() => onChangeView(viewController)}>
          <TitleButtonIcon src={btnStyle === 'plus' ? plusIco : chevronIco}/>
          <TitleButtonName>
            {btnName}
          </TitleButtonName>
        </TitleButton>
      </TitleWrapper>
    )
  }
}
const TitleContentStatus = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.color};
  margin: 0 15px;
`
const TitleButtonName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
`
const TitleButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 0;
`
const TitleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  &:hover{
    opacity: .75;
  }
`
const TitleContent = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
`
const TitleWrapper = styled.div`
  width: 100%;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`