import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { withTheme, ThemeProvider } from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';
import Stepper from './Stepper';
import { Space } from './Space';
import {
  Container,
  Content,
  StepperHeader,
  StepperHeaderBack,
} from './CarrosselStyles';

interface CarrosselProps {
  children: React.ReactNode | React.ReactNode[];
  current?: number;
  enablePages?: number;
  blocked?: boolean;
  noMargin?: boolean;
  stepperUp?: boolean;
  stepperDown?: boolean;
  onCurrentChange?: (current: number) => void;
  onBack?: () => void;
  paddingRight?: number;
  padding?: number;
  theme?: any;
}

const Carrossel: React.FC<CarrosselProps> = ({
  children,
  current: initialCurrent = 0,
  enablePages = 1,
  blocked = false,
  noMargin = false,
  stepperUp = false,
  stepperDown = false,
  onCurrentChange,
  onBack,
  paddingRight = 0,
  padding = 0,
  theme,
}) => {
  const [current, setCurrent] = useState<number>(initialCurrent);
  const forceToRef = useRef<any>('undefined');
  const myScrollRef = useRef<ScrollView>(null);
  const deviceWidth = Dimensions.get('window').width - padding;

  console.log(forceToRef.current);

  const handleScroll = (event: any) => {
    const newCurrent = Math.max(
      Math.floor(event.nativeEvent.contentOffset.x / deviceWidth + 0.1),
      0
    );
    if (
      forceToRef.current !== 'undefined' &&
      newCurrent === forceToRef.current
    ) {
      forceToRef.current = 'undefined';
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default withTheme(Carrossel);
