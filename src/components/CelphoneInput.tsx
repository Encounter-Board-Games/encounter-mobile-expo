import React, { useState } from 'react';
import styled from 'styled-components';
import Numberpad from './Numberpad';

export const Content = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  zindex: 999;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.light};
`;

export const ContentInput = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space.s2};
  align-items: center;
  justify-content: center;
`;

export const ContainerInputs = styled.ScrollView`
  flex: 1;
`;

export const CustomInput = styled.TouchableOpacity`
  border: 1.5px solid ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.primaryLight};
  padding-left: ${(props) => props.theme.space.s3};
  border-radius: ${(props) => props.theme.borderRadius.button};
  height: 56px;
  width: 100%;
  justify-content: center;
`;

const CustomInputText = styled.Text<{ disabled?: boolean }>`
  font-size: ${(props) => props.theme.space.s2};
  opacity: ${(props) => (props.disabled ? '.5' : '1')};
  color: ${(props) => props.theme.colors.secondColor};
`;

const CelphoneInput: React.FC = () => {
  const [typing, setTyping] = useState(false);
  const [content, setContent] = useState('');

  const addText = (t: string) => {
    setContent(content + t);
  };

  if (!typing)
    return (
      <CustomInput onPress={() => setTyping(true)}>
        <CustomInputText>(xx) xxxxx-xxxx</CustomInputText>
      </CustomInput>
    );

  return (
    <Content>
      <ContentInput>
        <CustomInput />
      </ContentInput>
      <Numberpad onPress={(n) => addText(n)} />
    </Content>
  );
};

export default CelphoneInput;