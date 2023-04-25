import React from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { H3, Subtitle1 } from './Typography';
import { SafeAreaView, Header, CloseButton, ToolItem } from './ScreePopupStyles';

interface Props {
  theme: any;
  hideHeader?: boolean;
  title?: string | JSX.Element;
  tooltext?: string | JSX.Element;
  onToolPress?: () => void;
  noScroll?: boolean;
  footer?: () => JSX.Element;
  children?: React.ReactNode;
}


const ScreenPopUp = ({
  theme,
  hideHeader = false,
  title,
  tooltext,
  onToolPress,
  noScroll,
  footer,
  children,
}: Props) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
    return onBack === onBack();
  };

  return (
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
      <SafeAreaView>
        {!hideHeader && (
          <Header noPadding={!title} withBorder={!!tooltext}>
            <CloseButton onClick={goBack}>
              <Ionicons
                name="ios-arrow-round-back"
                color={theme.colors.darkColor}
                size={32}
              />
            </CloseButton>
            {typeof title === 'string' || title instanceof String ? (
              <H3>{title}</H3>
            ) : (
              title
            )}
            {typeof tooltext === 'string' || tooltext instanceof String ? (
              <Tool onPress={onToolPress}
              >
                <Subtitle1 color={theme.colors.primaryDarkColor}>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
    );
    };
    
    export default ScreenPopUp;
