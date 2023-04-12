import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { withTheme } from 'styled-components';
import Stepper from './Stepper';
import { EvilIcons } from '@expo/vector-icons';
import { Space } from './Space';
import {
  Container,
  Content,
  StepperHeader,
  StepperHeaderBack,
} from './CarrosselStyles';

function Carrossel ({
  children,
  current: initialCurrent = 0,
  enablePages,
  blocked,
  noMargin,
  stepperUp,
  stepperDown,
  onCurrentChange,
  onBack,
  paddingRight,
  padding = 0,
  theme,
}) {
  const [current, setCurrent] = useState(initialCurrent);
  const forceToRef = useRef(undefined);
  const myScrollRef = useRef(null);
  const deviceWidth = Dimensions.get('window').width - padding;

  const handleScroll = (event) => {
    const newCurrent = Math.max(
      Math.floor((event.nativeEvent.contentOffset.x / deviceWidth) + 0.1),
      0
    );
    if (
      forceToRef.current !== undefined &&
      newCurrent === forceToRef.current
    ) {
      forceToRef.current = undefined;
      setCurrent(newCurrent);
      if (onCurrentChange) {
        onCurrentChange(newCurrent);
      }
    }
  };

  useEffect(() => {
    if (myScrollRef.current) {
      forceToRef.current = forceToRef.current || initialCurrent;
      myScrollRef.current.scrollTo({ x: deviceWidth * initialCurrent });
    }
  }, [initialCurrent, deviceWidth]);

  const filteredChildren = Array.isArray(children)
    ? children.slice(0, enablePages)
    : [children];
  const nPages = filteredChildren.length;

  return (
    <Container>
      {(stepperUp || !!onBack) && (
        <StepperHeader paddingRight={paddingRight}>
          <StepperHeaderBack onPress={onBack} disabled={!onBack}>
            {!!onBack && (
              <EvilIcons
                name="chevron-left"
                color={theme.colors.darkColor}
                size={32}
              />
            )}
          </StepperHeaderBack>
          {stepperUp && (
            <Stepper width="auto" total={nPages} current={current} />
          )}
        </StepperHeader>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={!blocked}
        ref={myScrollRef}
        onScroll={handleScroll}
        style={{ flex: 1 }}
      >
        {filteredChildren.map((child, i) => (
          <Content
            stepperUp={stepperUp}
            noMargin={noMargin}
            key={`image-${i}`}
            style={{ width: deviceWidth }}
          >
            {child}
          </Content>
        ))}
      </ScrollView>
      {!!stepperDown && (
        <React.Fragment>
          <Space n={0} />
          <Stepper width="auto" total={nPages} current={current} />
        </React.Fragment>
      )}
    </Container>
  );
};

export default withTheme(Carrossel);
