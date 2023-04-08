import React, { useState } from "react";
import styled from "styled-components";
import Dice from "../../../components/Dice";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { H4, H3 } from "../../../components/Typography";
import { openLoginPopup } from "../../../store/actions/user";
import { closePopupModal } from "../../../store/actions/info";
import { Linking, KeyboardAvoidingView, Keyboard } from "react-native";
import { handleRemoveCurrentPayment } from "../../../store/actions/payments";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const TextInput = styled.TextInput`
  height:40px;
  width: 100%;
  border: 1.5px solid;
  background: "#ebf7f4";
  padding-left: 16px
  padding-right: 16px
  border-radius: 8px
  font-size: 16px;
 `;

const Line = styled.View`
  flex-flow: row;
  align-items: flex-start;
  justify-content: center;
`;

const Btn = styled.View`
  flex: 1 1 0px;
`;

export default () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const { popup = {} } = useSelector((state) => state.info);
  const {
    callBack = () => {},
    title = undefined,
    description = undefined,
    cancelBtn = undefined,
    confirmBtn = undefined,
  } = popup.data ? popup.data : {};

  const remove = () => {
    callBack(text);
    dispatch(closePopupModal());
  };

  const cancel = () => {
    dispatch(closePopupModal());
    callBack(false);
  };

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      {title && <H3 center>{title}</H3>}
     
      {description && (
        <H4 noBold center>
          {description}
        </H4>
      )}

     

      <View style={{ width: "100%" }}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
     
      <Line>
        <Btn>
          <Button onPress={cancel} type="CallToAction-Outline" width={"auto"}>
            {cancelBtn ? cancelBtn : "Cancelar"}
          </Button>
        </Btn>
        <SpaceHorizontal n={4} />
        <Btn>
          <Button onPress={remove} type="ComplementButton-Big" width={"auto"}>
            {confirmBtn ? confirmBtn : "Sim, excluir"}
          </Button>
        </Btn>
      </Line>
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
};
