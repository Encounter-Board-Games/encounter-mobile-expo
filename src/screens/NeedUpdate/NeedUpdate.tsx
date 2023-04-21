import React from "react";
import { Image, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { handleCancelUpdate } from "../../store/actions/app";
import { MainContainer, TextLine, TextContent, ImageContent, Content, Footer, ButtonsRow } from "./NeedUpdateStyles";
import { Space, Bottom } from "../../components/Space";
import { H1, H4, H3 } from "../../components/Typography";
import Button from "../../components/Button/Button";
import { AppState, TextProps } from "../../types/globals";

const Text: React.FC<TextProps> = ({ text }) => {
  return (
    <TextContent>
      {text.split("*").map((text, index) =>
        index % 2 === 0 ? (
          <H4 key={index}>{text}</H4>
        ) : (
          <H3 key={index}>{text}</H3>
        )
      )}
    </TextContent>
  );
};

const NeedUpdate: React.FC = () => {
  const { update } = useSelector((state: { app: AppState }) => state.app) || { update: { show: true } };

  const dispatch = useDispatch();

  if (!update) return null;

  const { title, texts, btnCancel, btnText, img, link } = update;

  const onNext = () => {
    Linking.openURL(link);
  };

  const onCancel = () => {
    dispatch(handleCancelUpdate());
  };

  return (
    <MainContainer>
      <Content>
        <Space n={3} />
        <H1>{title}</H1>
        <Space n={3} />
        {texts.map((text, i) => (
          <TextLine key={i}>
            <Text text={text} />
          </TextLine>
        ))}
        <Space n={4} />
        <ImageContent>
          <Image resizeMode="contain" style={{ height: "100%", width: "75%" }} source={{ uri: img }} />
        </ImageContent>
      </Content>
      <Footer>
        <Space n={4} />
        <ButtonsRow>
          <Button width="100%" type="CallToAction-Light" onPress={onNext}>
            {btnText}
          </Button>
        </ButtonsRow>
        {btnCancel && (
          <>
            <Space n={2} />
            <ButtonsRow>
              <Button width="100%" onPress={onCancel} type="CallToAction-Outline">
                {btnCancel}
              </Button>
            </ButtonsRow>
          </>
        )}
      </Footer>
      <Bottom />
    </MainContainer>
  );
};

export default NeedUpdate;
