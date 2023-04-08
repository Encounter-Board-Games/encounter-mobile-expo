import React from "react";
import { TouchableOpacity } from 'react-native';
import styled from "styled-components";

const Container = styled(TouchableOpacity)`
  width: auto;
  height: auto;
  border-radius: 2px;
  position: relative;
  margin-right: 4px;
  border: 0.5px solid;
  background-color: #fda856;
`;

const Pointer = styled.View`
  position: absolute;
  height: auto;
  width: auto;
  border-radius: 4px;
  background-color: #fda856;
`;

const topLeft = "12px";
const topRight = "12px";
const bottomLeft = "12px";
const bottomRight = "12px";
const middle = "12px";

const dices = [
  [middle],
  [topLeft, bottomRight],
  [topLeft, middle, bottomRight],
  [topLeft, topRight, bottomLeft, bottomRight],
  [topLeft, topRight, bottomLeft, bottomRight, middle],
];
export default (props) => (
  <Container
    {...props}
    onPress={() => props.onPress && props.onPress(props.number)}
  >
    {dices[props.number - 1].map((n, index) => (
      <Pointer key={index} {...props} {...n(props.size)} />
    ))}
  </Container>
);
