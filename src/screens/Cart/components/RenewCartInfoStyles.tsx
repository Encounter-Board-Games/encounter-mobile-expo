import styled from 'styled-components';
import { Theme } from '../../../styles/themeTypes';

export const Container = styled.View<Theme>`
  padding: ${(props) => props.theme.space.s2};
  padding-top: 0;
  background: ${(props) => props.theme.colors.light};
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Header = styled.TouchableOpacity<Theme>`
  padding: ${(props) => props.theme.space.s2};
  background-color: ${(props) => props.theme.colors.light};
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
  width: 100%;
`;

export const CloseButton = styled.View<Theme>`
  position: absolute;
  top: ${(props) => props.theme.space.s2};
  left: ${(props) => props.theme.space.s2};
  background-color: ${(props) => props.theme.colors.light};
  height: 100%;
  width: 40px;
  justify-content: center;
  align-items: flex-start;
`;
