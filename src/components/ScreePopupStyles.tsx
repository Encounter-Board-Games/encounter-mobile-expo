import styled from 'styled-components';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const SafeAreaView = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.lightColor};
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top: ${({ theme }) =>
    Platform.OS === 'ios' ? theme.space.space4 : 0};
  padding-bottom: ${getBottomSpace()}px;
`;

export const Header = styled.div<{ noPadding?: boolean; withBorder?: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightColor};
  margin-top: ${({ noPadding, theme }) => (noPadding ? 0 : theme.space.space2)};
  margin-left: ${({ theme }) => theme.space.space2};
  margin-right: ${({ theme }) => theme.space.space2};
  height: 42px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-color: ${({ withBorder, theme }) =>
    withBorder ? theme.colors.secondColor : 'transparent'};
  border-bottom-width: 1px;
`;

export const CloseButton = styled.button`
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

export const ToolItem = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.lightColor};
  height: 40px;
  justify-content: center;
  align-items: center;
  border: none;
`;
