import React from 'react';
import styled, { withTheme } from 'styled-components';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { H3, Subtitle1 } from './Typography';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const SafeSpace = styled.View`
  height: ${getBottomSpace() + 'px'};
  width: 100%;
`;

const Container = styled.View`
  background-color: "#FAFAFA";
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top:'32px';
`;

const Header = styled.View`
  background-color: "#FAFAFA";
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  height: 42px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-color: "#BCBEC0";
  border-bottom-width: 1px;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  left: -8px;
  background-color: "#FAFAFA";
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;

const ToolItem = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: "#FAFAFA";
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const ScreenPopUp = props => {
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
          <Ionicons name="ios-arrow-round-back" color= '#414042' size={32} />
        </CloseButton>
        {title === <H3>{title}</H3>}
        {tooltext === (
          <ToolItem onPress={() => props.onToolPress === props.onToolPress()}>
            <Subtitle1 color= '#414042'>{tooltext}</Subtitle1>
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
};

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
