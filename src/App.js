import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Root from './components/Root'
import styled from 'styled-components'
import backImg from './assets/pacific.png'
import Sidebar from './components/Sidebar'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasksView: 'ALL'
    }
    this.changeView = this.changeView.bind(this)
  }

  changeView(view) {
    this.setState({ tasksView : view })
  }

  render() {
    const {tasksView} = this.state
    return (
      <BrowserRouter>
        <AppContainer>
          <AppHeader>
            <Header>
              Планировщик задач
            </Header>
          </AppHeader>
          <AppView>
            <AppViewSidebar>
              <Sidebar onChangeView={this.changeView}/>
            </AppViewSidebar>
            <AppViewRoot>
              <Root tasksView={tasksView}/>
            </AppViewRoot>
          </AppView>
        </AppContainer>
      </BrowserRouter>
    )
  }
}

const AppViewRoot = styled.div`
  flex: 1 0;
  padding: 7.5px;
`
const AppViewSidebar = styled.div`
  flex: 235px 0;
  padding: 7.5px;
`
const AppView = styled.div`
  width: 100%;
  display: flex;
  flex: 1 1 auto;
`
const Header = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(13, 13, 13, 0.5);
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: .05em;
  color: #FFFFFF;
`
const AppHeader = styled.div`
  width: 100%;
  padding: 7.5px;
`
const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backImg});
  background-position: center;
  background-size: cover;
  padding: 7.5px;
  display: flex;
  flex-flow: column;
  overflow: auto;
`