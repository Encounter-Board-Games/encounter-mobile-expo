import React from 'react';
import styled, { withTheme } from 'styled-components';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { H3, Subtitle1 } from './Typography';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const SafeSpace = styled.View`
  width: 100%;
`;

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top: ${(props) =>
    Platform.OS === 'ios' ? props.theme.space.space4 : 0};
`;

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.lightColor};
  margin-top: ${(props) => (props.noPadding ? 0 : props.theme.space.space2)};
  margin-left: ${(props) => props.theme.space.space2};
  margin-right: ${(props) => props.theme.space.space2};
  height: 42px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-color: ${(props) =>
    props.withBorder ? props.theme.colors.secondColor : 'transparent'};
  border-bottom-width: 1px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: -8px;
  background-color: ${(props) => props.theme.colors.lightColor};
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;

export const ToolItem = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.lightColor};
  height: 40px;
  justify-content: center;
  align-items: center;
`;

function ScreenPopUp(props) {
  const navigate = useNavigation();

  const goBack = () => {
    navigate.goBack();

    return props.onBack === props.onBack();
  };

  const renderHeader = () => {
    const { title, tooltext, withBorder, theme } = props;

    return (
      <Header noPadding={!title} withBorder={withBorder}>
        <CloseButton onPress={() => goBack()}>
          <Ionicons
            name="ios-arrow-round-back"
            color={theme.colors.darkColor}
            size={32}
          />
        </CloseButton>
        {title === <H3>{title}</H3>}
        {tooltext ===
        (
          <ToolItem onPress={() => props.onToolPress === props.onToolPress()}>
            <Subtitle1 color={theme.colors.primaryDarkColor}>
              {tooltext}
            </Subtitle1>
          </ToolItem>
        )}
      </Header>
    );
  };

  const { children, footer } = props;

  return (
    <Container>
      {renderHeader()}
      <View flex={1}>{children}</View>
      {footer === footer()}
    </Container>
  );
}

ScreenPopUp.propTypes = {
  title: PropTypes.string,
  hideHeader: PropTypes.bool,
  withBorder: PropTypes.bool,
  tooltext: PropTypes.string,
  onToolPress: PropTypes.func,
  onBack: PropTypes.func,
  children: PropTypes.node,
  footer: PropTypes.func,
};

ScreenPopUp.defaultProps = {
  hideHeader: false,
};

export default withTheme(ScreenPopUp);
