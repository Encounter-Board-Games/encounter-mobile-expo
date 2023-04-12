import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { withTheme } from 'styled-components';

function Bar(props) {
  const [width] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    opacity.setValue(1);
    width.setValue(0);

    Animated.timing(width, {
      toValue: 100,
      duration: 700,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start(() => {
      startAnimation();
    });
  };

  return (
    <ProgressBar_
      width={props.width}
      border={props.border}
      running={props.running}
      active={props.active}
    >
      <Animated.View
        style={{
          width: props.running
            ? width.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              })
            : 0,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          opacity: opacity,
          backgroundColor: props.theme.colors.primaryColor,
          height: '100%',
        }}
      />

      <ProgressBarBall running={props.running} active={props.active} />
    </ProgressBar_>
  );
};

export default withTheme(Bar);