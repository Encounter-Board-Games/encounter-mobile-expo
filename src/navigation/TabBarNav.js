import React from 'react';
import { withTheme } from 'styled-components';
import { TabNav, Text, NavItem, icons, Icon } from "./TabBarNavStyles"

export default withTheme((props) => {
  
  const activeRouteIndex = props.state.index
  
  return (<TabNav>
    {
      props.state.routes.map((item, index) => <NavItem key={index} onPress  ={() => props.navigation.navigate(item.name)}>
        <Icon name={icons[item.name]} size={20} color={index == activeRouteIndex ? props.theme.colors.primaryDarkColor : props.theme.colors.secondDarkColor} />
        <Text isSelected={index == activeRouteIndex}>{item.name}</Text>
      </NavItem>)
    }
</TabNav>)
})