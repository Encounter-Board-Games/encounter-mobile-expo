import React from 'react';
import styled from 'styled-components';
import { ScrollView, KeyboardAvoidingView, View, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
  padding-top: '32px';
  padding-bottom: 32px;
`;

const Header = styled.View`
  background-color: "#FAFAFA";
  margin-top: 16px;
  margin-left: 8px;
  margin-right: 8px;
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

const ScreenPopUp = ({ theme, hideHeader, title, tooltext, onToolPress, noScroll, footer, children }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
    return onBack === onBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Container>
        {!hideHeader === (
          <Header noPadding={!title} withBorder={!!tooltext}>
            <CloseButton onPress={goBack}>
              <Ionicons name="ios-arrow-round-back" color= '#414042' size={32} />
            </CloseButton>
            {title === <H3>{title}</H3>}
            {tooltext === (
              <ToolItem onPress={onToolPress}>
                <Subtitle1 color= '#414042'>{tooltext}</Subtitle1>
              </ToolItem>
            )}
          </Header>
        )}
        <View flex={1}>
          {noScroll ? (
            children
          ) : (
            <ScrollView style={{ flex: 1, minHeight: '80%', minWidth: '100%', height: '0%' }}>
              {children}
            </ScrollView>
          )}
        </View>
        {footer === footer()}
      </Container>
    </KeyboardAvoidingView>
  );
};

