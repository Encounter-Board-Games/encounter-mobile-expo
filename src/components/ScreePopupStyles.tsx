import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  RefObject,
  HTMLAttributes,
} from 'react';
import { RadioButtonProps } from 'react-native-paper';
import { Interpolation, ThemedStyledProps } from 'styled-components';
import { Theme } from '../styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {
    colors: {
      primaryLightColor: Interpolation<
        ThemedStyledProps<
          Omit<
            DetailedHTMLProps<
              ButtonHTMLAttributes<HTMLButtonElement>,
              HTMLButtonElement
            >,
            'ref'
          > & {
            ref?:
              | ((instance: HTMLButtonElement | null) => void)
              | RefObject<HTMLButtonElement>
              | null
              | undefined;
          } & RadioButtonProps,
          DefaultTheme
        >
      >;
      primaryDarkColor: Interpolation<
        ThemedStyledProps<
          Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
            'ref'
          > & {
            ref?:
              | ((instance: HTMLSpanElement | null) => void)
              | RefObject<HTMLSpanElement>
              | null
              | undefined;
          } & { isSelected: boolean },
          DefaultTheme
        >
      >;
      lightColor: string;
      darkColor: string;
      primaryColor: string;
      secondaryColor: string;
      tertiaryColor: string;
      backgroundColor: string;
      foregroundColor: string;
      accentColor: string;
      errorColor: string;
    };
  }
}

export const SafeAreaView = styled.View`
  width: 100%;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.lightColor};
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top: ${({ theme }) =>
    Platform.OS === 'ios' ? theme.space.space4 : 0};
  padding-bottom: ${getBottomSpace()}px;
`;

export const Header = styled.View<{
  noPadding?: boolean;
  withBorder?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.lightColor};
  margin-top: ${({ noPadding, theme }) => (noPadding ? 0 : theme.space.space2)};
  margin-left: ${({ theme }) => theme.space.space2};
  margin-right: ${({ theme }) => theme.space.space2};
  height: 42px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-color: ${({ withBorder, theme }) =>
    withBorder ? theme.colors.secondaryColor : 'transparent'};
  border-bottom-width: 1px;
`;

export const CloseButton = styled.Button`
  position: absolute;
  top: 0;
  left: -8px;
  background-color: ${({ theme }) => theme.colors.lightColor};
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  border: none;
`;

export const ToolItem = styled.Button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.lightColor};
  height: 40px;
  justify-content: center;
  align-items: center;
  border: none;
`;
