import styled from 'styled-components/native';
import { Theme } from '../../../styles/themeTypes';

export const Content = styled.View`
  flex: 1;
`;

export const ContentLine = styled.View`
  flex-flow: row;
  flex: 1;
`;

export const Space = styled.View`
  width: ${(props: { theme: Theme }) => props.theme.space.s2};
  height: 1px;
`;

export const s2 = styled.View`
  width: 1px;
`;
