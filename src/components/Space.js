import styled from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';

export const Space = styled.View`
  height: ${props => props.theme.space['space' + props.n]}px;
  width: 1px;
`;

export const SpaceHorizontal = styled.View`
  width: ${props => props.theme.space['space' + props.n]}px;
  height: 1px;
`;

export const Bottom = styled.View`
  width: 100%;
  height: ${Platform.select({
    ios: `${getBottomSpace() + 16}px`,
    android: `${Constants.statusBarHeight + 16}px`,
  })};
`;

Bottom.propTypes = {
  theme: PropTypes.object.isRequired,
};
