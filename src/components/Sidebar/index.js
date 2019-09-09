import React, { Component } from 'react';
import styled from 'styled-components'

export default class Sidebar extends Component {
  render() {
    return (
      <SidebarWrapper>
        <SidebarItem onClick={() => this.props.onChangeView('ALL')}>
          Все задачи
        </SidebarItem>
        <SidebarItem onClick={() => this.props.onChangeView('TODO')}>
          Выполняются
        </SidebarItem>
        <SidebarItem onClick={() => this.props.onChangeView('WAIT')}>
          Ожидание
        </SidebarItem>
        <SidebarItem onClick={() => this.props.onChangeView('DONE')}>
          Завершенные
        </SidebarItem>
      </SidebarWrapper>
    );
  }
}

const SidebarItem = styled.div`
  padding: 7.5px;
  margin: 10px 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  &:hover {
    opacity: 0.7;
  }
`
const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(13, 13, 13, 0.5);
  border-radius: 8px;
  padding: 7.5px;
`