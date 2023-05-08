import React, { FC } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { H3, Subtitle1 } from './Typography';
import IconComponent from './IconsComponent';
import styled, { ThemeProvider } from 'styled-components/native';
import { CloseButton, Header, ToolItem } from './ScreePopupStyles';

interface Props {
  theme: any;
  hideHeader?: boolean;
  title?: string | JSX.Element;
  tooltext?: string | JSX.Element;
  onToolPress?: () => void;
  noScroll?: boolean;
  footer?: () => JSX.Element;
  children: JSX.Element | JSX.Element[];
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const ScreePopUp: FC<Props> = ({
  theme,
  hideHeader = false,
  title,
  tooltext,
  onToolPress,
  noScroll,
  footer,
  children,
}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <ThemeProvider theme={theme}>
          <SafeArea>
            {!hideHeader && (
              <Header noPadding={!title} withBorder={!!tooltext}>
                <CloseButton onPress={goBack}>
                  <IconComponent
                    name="ios-arrow-round-back"
                    color={theme.darkColor}
                    size={32}
                  />
                </CloseButton>
                {title && typeof title === 'string' ? <H3>{title}</H3> : title}
                {tooltext && typeof tooltext === 'string' ? (
                  <ToolItem onPress={onToolPress}>
                    <Subtitle1 color={theme.primaryDarkColor}>
                      {tooltext}
                    </Subtitle1>
                  </ToolItem>
                ) : (
                  tooltext
                )}
              </Header>
            )}
            <View style={{ flex: 1 }}>
              {noScroll ? (
                children
              ) : (
                <ScrollView
                  style={{ flex: 1, minHeight: '80%', minWidth: '100%' }}
                >
                  {children}
                </ScrollView>
              )}
            </View>
            {footer && footer()}
          </SafeArea>
        </ThemeProvider>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ScreePopUp;
