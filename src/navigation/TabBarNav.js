import React from 'react'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import { translation } from '../texts';
import Icons from '../components/Icons';

const TabNav = styled.View`
  height: 56px;
  background: #fff;
  width: 100%;
  flex-flow: row;
  elevation: 1;
`;

export const Text = styled.Text`
font-size: 13px;
font-family: 'Nunito-Bold';
color:  #414042;
`;

const NavItem = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const icons = {
  "Início": "home",
  "Busca": "magnifier",
  [translation("menu.orders")]: "handbag",
  "Perfil": "user",
}

const Icon = (props) => {
  return <Icons name={props.name} size={16} color={props.color} />     
}

export default withTheme((props) => {
  const activeRouteIndex = props.state.index
  
  return (<TabNav>
    {
      props.state.routes.map((item, index) => <NavItem key={index} onPress  ={() => props.navigation.navigate(item.name)}>
        <Icon name={icons[item.name]} size={20} color= '#414042' />
        <Text isSelected={index == activeRouteIndex}>{item.name}</Text>
      </NavItem>)
    }
</TabNav>)
})