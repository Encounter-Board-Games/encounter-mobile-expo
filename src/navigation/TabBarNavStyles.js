import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { translation } from '../texts';
import Icons from '../components/Icons';

export const TabNav = styled.View`
  height: 56px;
  background: #fff;
  width: 100%;
  flex-flow: row;
  elevation: 1;
`;

export const Text = styled.Text`
font-size: 13px;
font-family: ${props => props.isSelected ? 'Nunito-Bold' : 'Nunito'};
color: ${props => props.isSelected ? props.theme.colors.primaryDarkColor : props.theme.colors.secondDarkColor};
`;

export const NavItem = styled(TouchableOpacity)`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const icons = {
  "Início": "home",
  "Busca": "magnifier",
  [translation("menu.orders")]: "handbag",
  "Perfil": "user",
}

export const Icon = (props) => {
  return <Icons name={props.name} size={16} color={props.color} /> 
}
