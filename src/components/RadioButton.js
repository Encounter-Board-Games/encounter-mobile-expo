import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Circle from './Circle';

export const Radio = styled(TouchableOpacity)`
    flex-flow: row;
    margin-top: 8px;
    padding: 0px 12px;
    align-items: center;
    flex: 1;
    margin-right: "8px";
    height: 40px;
    border-radius: '8px';	
    border: 1.5px solid "#BCBEC0";
    background-color:  "#ebf7f4";
`;

export const Text = styled.Text`
    font-size: 14px;
    font-family: Nunito;
    color:  #414042;
`;

export const RadioButton = (props) => (
    <Radio {...props} onPress={() => props.onPress && props.onPress()}>
        <Circle  {...props} />
        <Text {...props}>{props.children}</Text>
    </Radio>
)
