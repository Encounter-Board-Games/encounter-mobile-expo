import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const Radio = styled(TouchableOpacity)`
    margin-top: 8px;
    margin-right: 8px;
    padding: 6px 12px;
    flex-flow: row;
    align-items:center;
    justify-content: center;
    border-radius: '100px';	
    border: 1.5px solid;
    background-color: "#BCBEC0";
`;

const CloseButton = styled(TouchableOpacity)`
    background-color: "#E6E7E8";
    height: 16px;
    width: 16px;
    border-radius: 16px;
    justify-content: center;
    align-items:center;
    margin-left: 8px
`;

export const Text = styled.Text`
font-size: 14px;
font-family: 'Nunito';
color:  #414042;
`;

export const CheckButton = (props) => (<Radio {...props} onPress={() => props.onPress && props.onPress()}>
    <Text {...props} >{props.children}</Text>
</Radio>)