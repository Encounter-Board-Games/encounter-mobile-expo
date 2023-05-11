import styled from 'styled-components/native';
import { Theme } from '../../../styles/themeTypes';

export const Tags = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`;

export const Space = styled.View`
  height: 8px;
  width: 1px;
`;

export const Hr = styled.View`
  height: 16px;
  border-color: ${(props: { theme: Theme }) =>
    props.theme.colors.secondaryLight};
  border-bottom-width: 1px;
`;

export const Header = styled.View`
  position: relative;
  flex-flow: row;
`;

export const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding-left: 16px;
  padding-right: 16px;
`;
