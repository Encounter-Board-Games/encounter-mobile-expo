import React from 'react';
import styled, { withTheme } from 'styled-components';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { H3, Subtitle1 } from './Typography';

interface ScreenPopUpProps {
  title?: string | JSX.Element;
  hideHeader?: boolean;
  withBorder?: boolean;
  tooltext?: string | JSX.Element;
  onToolPress?: () => void;
  onBack?: () => void;
  children?: React.ReactNode;
  footer?: () => React.ReactNode;
  theme?: any; // Optional
}

const SafeSpace = styled.div`
  width: 100%;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  height: 100%;
  width: 100%;
  padding-top: ${(props) =>
    Platform.OS === 'ios' ? props.theme.space.space4 : 0};
`;

const Header = styled.div<{ noPadding?: boolean; withBorder?: boolean }>`
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

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: -8px;
  background-color: ${(props) => props.theme.colors.lightColor};
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;

const ToolItem = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.lightColor};
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const ScreenPopUp: React.FC<ScreenPopUpProps> = ({
  title,
  hideHeader,
  withBorder,
  tooltext,
  onToolPress,
  onBack,
  children,
  footer,
  theme,
}) => {
  const navigate = useNavigation();

  const goBack = () => {
    navigate.goBack();

    return onBack && onBack();
  };

  const renderHeader = () => {
    if (hideHeader) {
      return null;
    }

    return (
      <Header noPadding={!title} withBorder={withBorder}>
        <CloseButton onClick={() => goBack()}>
          <Ionicons
            name="ios-arrow-round-back"
            color={theme.colors.darkColor}
            size={32}
          />
        </CloseButton>
        {typeof title === 'string' ? <H3>{title}</H3> : title}
        {typeof tooltext === 'string' ? (
          <ToolItem onClick={() => onToolPress && onToolPress()}>
            <Subtitle1 color={theme.colors.primaryDarkColor}>
              {tooltext}
            </Subtitle1>
          </ToolItem>
        ) : (
          tooltext
        )}
      </Header>
    );
  };

  return (
    <Container>
      {renderHeader()}
      <View style={{ flex: 1 }}>{children}</View>
      {footer && footer()}
    </Container>
  );
};

export default withTheme(ScreenPopUp);
