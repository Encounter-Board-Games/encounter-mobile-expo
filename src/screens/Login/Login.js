import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoginPopup } from '../../store/actions/user/login';
import LoginFlow from './components/LoginFlow';
import { Container } from './components/LoginFlow';
import * as Animatable from 'react-native-animatable';

export default function Login () {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const loginPopup = useSelector(state => state.userReducer.isLogged);

  useEffect(() => {
    if (loginPopup) open(!!loginPopup);
  }, []);

  useEffect(() => {
    if (show !== !!loginPopup) open(!!loginPopup);
  }, [loginPopup]);

  const open = show => {
    Animated.timing(opacity, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    clearInterval(timeout);
    setShow(show);
    if (!show) timeout = setTimeout(() => setShowAll(show), 300);
    else setShowAll(show);
  };

  let timeout = useRef(null);

  if (!showAll) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: opacity,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.6)',
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <Animatable.View
          duration={250}
          animation={show ? 'fadeInUp' : 'fadeOutDown'}
          style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(hideLoginPopup());
              Keyboard.dismiss();
            }}
            style={{ flex: 1 }}>
            <View style={{ flex: 1 }}></View>
          </TouchableWithoutFeedback>
          <View>
            <Container behavior={'padding'}>
              <LoginFlow />
            </Container>
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};