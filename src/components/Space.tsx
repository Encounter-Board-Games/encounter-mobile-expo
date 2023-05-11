/* eslint-disable indent */
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components';

export interface SpaceProps extends ViewProps {
  n: keyof DefaultTheme['space'];
}

export interface SpaceHorizontalProps {
  n: keyof DefaultTheme['space'];
}

export const Space = styled.View<SpaceProps>`
  height: ${({ theme, n }) => theme.space[n]};
`;

export const SpaceHorizontal = styled.View<SpaceHorizontalProps>`
  width: ${({ theme, n }) => theme.space[n]};
  height: 1px;
  ${({ theme, n }) => `
    ${
      n === 's0'
        ? `padding-left: ${theme.space.s0};`
        : n === 's1'
        ? `padding-left: ${theme.space.s1};`
        : n === 's2'
        ? `padding-left: ${theme.space.s2};`
        : n === 's3'
        ? `padding-left: ${theme.space.s3};`
        : n === 's4'
        ? `padding-left: ${theme.space.s4};`
        : n === 's5'
        ? `padding-left: ${theme.space.s5};`
        : ''
    }
  `}
`;

export const Bottom = styled.View`
  width: 100%;
`;
