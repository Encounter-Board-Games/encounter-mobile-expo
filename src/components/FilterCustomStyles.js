import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

export const MainContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  padding-top: ${({ theme }) => theme.space.space2};
`

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-left: ${({ theme }) => theme.space.space3};
  padding-right: ${({ theme }) => theme.space.space3};
`

export const Content = styled.View`
  flex-grow: 1;
`

export const ImageContent2 = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const MoreInfo = styled.View`
  align-items: flex-end;
  position: relative;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99;
`

export const ImageContent = styled.View`
  width: 80%;
  max-width: 80%;
  align-items: center;
  justify-content: center;
  ${({ full }) => (full ? '' : 'height: 200px;')}
  ${({ noMaxHeight }) => (noMaxHeight ? '' : 'max-height: 320px;')}
  padding-top: ${({ theme }) => theme.space.space4};
  padding-bottom: ${({ theme }) => theme.space.space2};
`

export const Footer = styled.View`
  width: 100%;
`

export const Tags = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`

export const KnowInfo = styled.TouchableOpacity`
  flex-flow: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Line = styled.View`
  flex-flow: row;
`
