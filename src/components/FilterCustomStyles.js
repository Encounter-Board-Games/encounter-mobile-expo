import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

export const MainContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  padding-top: 8px;
`

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
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
  height: 200px;
  max-height: 320px;
  padding-top: 32px;
  padding-bottom: 8px;
`

export const Footer = styled.View`
  width: 100%;
`

export const Tags = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`

export const KnowInfo = styled(TouchableOpacity)`
  flex-flow: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Line = styled.View`
  flex-flow: row;
`
