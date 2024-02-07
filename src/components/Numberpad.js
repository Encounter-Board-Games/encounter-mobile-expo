import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Ionicons } from '@expo/vector-icons';

const NumberPad = styled.View``;

const Number = styled.TouchableOpacity`
  margin-bottom: ${(props) => (props.isLast ? getBottomSpace() : 0)}px;
  height: 80px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 0.5px solid ${(props) => props.theme.colors.primaryColor};
  background-color: ${(props) => props.theme.colors.primaryLightColor};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const NumberText = styled.Text`
  color: ${(props) => props.theme.colors.primaryDarkColor};
  font-family: Nunito;
  font-size: 24px;
`;

const Line = styled.View`
  flex-direction: row;
  width: 100%;
`;

const NumberPadComponent = ({ onPress, onCleanPress, disabled, theme }) => (
  <NumberPad>
    <Line>
      <Number disabled={disabled} onPress={() => onPress(1)}>
        <NumberText>1</NumberText>
      </Number>
      <Number disabled={disabled} onPress={() => onPress(2)}>
        <NumberText>2</NumberText>
      </Number>
      <Number disabled={disabled} onPress={() => onPress(3)}>
        <NumberText>3</NumberText>
      </Number>
    </Line>
    <Line>
      <Number disabled={disabled} onPress={() => onPress(4)}>
        <NumberText>4</NumberText>
      </Number>
      <Number disabled={disabled} onPress={() => onPress(5)}>
        <NumberText>5</NumberText>
      </Number>
      <Number disabled={disabled} onPress={() => onPress(6)}>
        <NumberText>6</NumberText>
      </Number>
    </Line>
    <Line>
      <Number disabled={disabled} onPress={() => onPress(7)}>
        <NumberText>7</NumberText>
      </Number>
      <Number disabled={disabled} onPress={() => onPress(8)}>
        <NumberText>8</NumberText>
      </Number>
      <Number disabled={disabled} onPress={() => onPress(9)}>
        <NumberText>9</NumberText>
      </Number>
    </Line>
    <Line>
      <Number disabled={disabled} isLast onPress={() => onCleanPress()}>
        <NumberText />
      </Number>
      <Number disabled={disabled} isLast onPress={() => onPress(0)}>
        <NumberText>0</NumberText>
      </Number>
      <Number disabled={disabled} isLast onPress={() => onCleanPress()}>
        <NumberText>
          <Ionicons name="ios-arrow-back" color={theme.colors.primaryDarkColor} size={24} />
        </NumberText>
      </Number>
    </Line>
  </NumberPad>
);

export default withTheme(NumberPadComponent);
