import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { translation } from '../texts';
import Icons from '../components/IconsComponent';

interface ITabProps {
  state: {
    index: number;
    routes: { name: string }[];
  };
  navigation: {
    navigate: (name: string) => void;
  };
  theme?: {
    colors: {
      text: string;
      white: string;
    };
  };
}

const TabNav = styled.View`
  height: 56px;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  flex-flow: row;
  elevation: 1;
`;

const Text = styled.Text<{ isSelected?: boolean }>`
  font-size: 13px;
  font-family: 'Nunito-Bold';
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.text : '#414042'};
`;

const NavItem = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const icons: Record<string, string> = {
  Início: 'home',
  Busca: 'magnifier',
  [translation('menu.orders')]: 'handbag',
  Perfil: 'user',
};

interface IIconProps {
  name: string;
  color: string;
  size?: number;
}

const Icon: React.FC<IIconProps> = ({ name, color, size = 16 }) => (
  <Icons name={name} size={size} color={color} />
);

const Tab: React.FC<ITabProps> = ({ state, navigation, theme }) => {
  const activeRouteIndex = state.index;

  return (
    <TabNav>
      {state.routes.map((item, index) => (
        <NavItem key={index} onPress={() => navigation.navigate(item.name)}>
          <Icon name={icons[item.name]} size={20} color="#414042" />
          <Text isSelected={index === activeRouteIndex}>{item.name}</Text>
        </NavItem>
      ))}
    </TabNav>
  );
};

export default withTheme(Tab);
