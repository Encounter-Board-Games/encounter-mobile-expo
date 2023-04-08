import React, { useState } from "react";
import { TouchableOpacity } from 'react-native';
import styled from "styled-components";
import Numberpad from "./Numberpad";

const Content = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  zindex: 999;
  border-radius: "8px";
  background: "#FAFAFA";
`;

const ContentInput = styled.View`
  flex: 1;
  padding: '16px';
  align-items: center;
  justify-content: center;
`;
const ContainerInputs = styled.ScrollView`
  flex: 1;
`;

const CustomInput = styled(TouchableOpacity)`
    border: 1.5px solid  #c8e8e0;
    background: "#ebf7f4";
    padding-left: '24px';
    border-radius: '8px';
    height: '56px';
    width: 100%;
    justify-content: center;
`;

const CustomInputText = styled.Text`

    font-size: '16px';
    opacity: '.5';
    color: "#BCBEC0";
`;

export default () => {
  const [typing, setTyping] = useState(false);
  const [content, setContent] = useState("");

  const addText = (t) => {
    setContent(content + t);
  };

  if (!typing)
    return (
      <CustomInput onPress={() => setTyping(true)}>
        <CustomInputText>(xx) xxxxx-xxxx</CustomInputText>
      </CustomInput>
    );

  return (
    <Content flex={1}>
      <ContentInput flex={1}>
        <CustomInput />
      </ContentInput>
      <Numberpad onPress={(n) => addText(n)} />
    </Content>
  );
};
