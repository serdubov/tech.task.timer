import React, { Component } from 'react';
import styled from 'styled-components'

export default class Button extends Component {
  render() {
    const { title, theme, margin } = this.props
    return (
      <ButtonWrapper theme={theme} margin={margin}>
        {title}
      </ButtonWrapper>
    );
  }
}

const ButtonWrapper = styled.div`
  width: 120px;
  height: 35px;
  background: ${props => props.theme === 'blue' ? '#72BBFF' : props.theme === 'red' ? '#FF9E7F' : props.theme === 'white' ? '#FFFFFF' : '#57FFB3'};
  border-radius: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.margin ? props.margin : null};
  cursor: pointer;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  &:hover{
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
  }
`