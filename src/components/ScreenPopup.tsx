import React from 'react';
import { withTheme } from 'styled-components';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { H3, Subtitle1 } from './Typography';
import { Container } from './CarrosselStyles';
import { Header, CloseButton, ToolItem } from './ScreePopupStyles';
import IconComponent from './IconsComponent';

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
          <IconComponent
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
