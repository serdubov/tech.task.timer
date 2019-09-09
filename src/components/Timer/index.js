import React, { Component } from 'react'
import styled from 'styled-components'
import playIco from '../../assets/icons/play-big.svg'
import moment from 'moment'
import _ from 'lodash'
import tomatoIco from '../../assets/icons/tomato.svg'


let intervalTimer
export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeWork: '00:00',
      times: [30, 5, 10],
      timer: false,
      timerDo: '',
      lineLength: 0,
      lineTime: 0,
    }
    this.onTimer = this.onTimer.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value, timerState, lineTransition = false) {
    let sec = value % 60
    let min = parseInt(value / 60)
    sec = sec > 9 ? sec : `0${sec}`
    min = min > 9 ? min : `0${min}`
    if (lineTransition && timerState) {
      this.setState({ lineLength: 0, lineTime: value })
    } else if (lineTransition && !timerState) {
      this.setState({ lineLength: 518, lineTime: value })
    }
    this.setState({timeWork : `${min}:${sec}`})
    if (timerState) {
      this.setState({timerDo : 'Перерыв'})
    } else {
      this.setState({timerDo : 'Работа'})
    }
  }

  onTimer() {
    let newProgress = moment().format('DD.MM.YYYY HH:mm')
    this.setState({ timer : true })
    const onChangeProgress = (x) => this.props.onСhangeProgressTask(newProgress , this.props.select)
    onChangeProgress()
    let tomatoTimer = this.state.times[0]
    let timerDo = false
    this.onChange(tomatoTimer, timerDo, true)
    const reloadTimer = () => {
      tomatoTimer -= 1
      this.onChange(tomatoTimer, timerDo)
      if (tomatoTimer < 1 && !timerDo) {
        if (this.props.progress.length % 4 === 0){
          this.setState({lineLength: 0, lineTime: 0 })
          tomatoTimer = this.state.times[2]
          timerDo = true
          this.onChange(tomatoTimer, timerDo, true)
        } else {
          this.setState({lineLength: 0, lineTime: 0 })
          tomatoTimer = this.state.times[1]
          timerDo = true
          this.onChange(tomatoTimer, timerDo, true)
        }
      } else if (tomatoTimer < 1 && timerDo) {
        clearInterval(intervalTimer);
        this.setState({timerDo : '', timer: false, lineLength: 0, lineTime: 0 })
      }
    }
    intervalTimer = setInterval(reloadTimer, 1000)
  }
  

  render() {
    const {timerDo, timer, timeWork, lineLength, lineTime } = this.state
    return (
      <TimerContainer>
        <TimerWrapper>
          <TimerStatus>
            {timerDo}
          </TimerStatus>
          <TimerCircle>
            <svg width="175" height="175" viewBox="0 0 175 175" fill="none" xmlns="http://www.w3.org/2000/svg">
              <SvgPath duration={lineTime} size={lineLength} d="M87.5 170C98.334 170 109.062 167.866 119.071 163.72C129.081 159.574 138.175 153.497 145.836 145.836C153.497 138.175 159.574 129.081 163.72 119.071C167.866 109.062 170 98.3341 170 87.5C170 76.666 167.866 65.938 163.72 55.9286C159.574 45.9193 153.497 36.8245 145.836 29.1637C138.175 21.5029 129.081 15.426 119.071 11.2799C109.062 7.13393 98.3341 5 87.5 5C76.666 5 65.938 7.13392 55.9286 11.2799C45.9193 15.4259 36.8245 21.5028 29.1637 29.1637C21.5029 36.8245 15.426 45.9192 11.2799 55.9286C7.13393 65.938 5 76.6659 5 87.5C5 98.334 7.13392 109.062 11.2799 119.071C15.4259 129.081 21.5029 138.175 29.1637 145.836C36.8245 153.497 45.9193 159.574 55.9286 163.72C65.938 167.866 76.6659 170 87.5 170L87.5 170Z" stroke="#FF6E6E" stroke-width="10"/>
            </svg>
            <TimerTime>
              {
                timer ? timeWork : <TimerTimeIco src={playIco} onClick={() => this.onTimer()}/>
              }
            </TimerTime>
          </TimerCircle>
          
        </TimerWrapper>
        <TimerTomatos>
          {
            _.map(this.props.progress, (item, index) => {
              return (
                <TomatoItem key={index}>
                  <TaskItemProgressIco  src={tomatoIco}/> {item}
                </TomatoItem>
                
              )
            })
          }
          
        </TimerTomatos>
      </TimerContainer>
    );
  }
}

const TomatoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
`
const TimerTomatos = styled.div`
  margin: 40px 0 0;
`
const TaskItemProgressIco = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 15px 0 0;
`
const TimerTimeIco = styled.img`
  cursor: pointer;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  &:hover{
    opacity: .75;
  }
`
const TimerTime = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 5;
  top: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #54B88B;
`
const TimerCircle = styled.div`
  position: relative;
`
const TimerStatus = styled.div`
  max-width: 185px;
  width: 100%;
  margin: 0 20px 0 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #54B88B;
`
const SvgPath = styled.path`
  stroke-dashoffset: ${props => props.size};
  transition: ${props => `all ${props.duration}s linear`};
  stroke-dasharray: 518;
  stroke-width: 10;
`
const TimerContainer = styled.div`
  
`
const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
`