import React from 'react'
import styled from 'styled-components'

const Circle = styled.View`
    height: '18px';
    width: '18px';
    border-radius: '18px';
    border: 2px solid  #414042;
    margin-right: '8px';
    padding: '2px';
`;

const CircleIntern = styled.View`
    height: 100%;
    width:  100%;
    border-radius: '18px';
    background:  #414042;
`;

export default (props) => {

    return (<Circle  {...props}>{props.isSelected && <CircleIntern />}</Circle>)
}