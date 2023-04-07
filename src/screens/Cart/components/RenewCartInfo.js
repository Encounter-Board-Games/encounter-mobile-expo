import React, { useEffect, useRef } from "react";
import { H3 } from "../../../components/Typography";
import styled, { withTheme } from "styled-components";
import { Modalize } from "react-native-modalize";
import { Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { translation } from "../../../texts";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  padding-top: 0;
  background: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Header = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space.space2};
  background-color: ${(props) => props.theme.colors.lightColor};
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
  width: 100%;
`;

const CloseButton = styled.View`
    position: absolute;
    top:${(props) => props.theme.space.space2};
    left: ${(props) => props.theme.space.space2};
    background-color: ${(props) => props.theme.colors.lightColor};
    height: 100%;
    width: 40px
    justify-content: center;
    align-items:flex-start;
`;

export default withTheme(({ theme }) => {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.open();
  }, [modalRef]);
  const close = () => {};

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.lightColor }}
      HeaderComponent={() => (
        <Header onPress={close}>
          <CloseButton>
            <Entypo
              name="chevron-thin-down"
              color={theme.colors.darkColor}
              size={16}
            />
          </CloseButton>
          <H3 center>{translation("cart.cartName")}</H3>
        </Header>
      )}
      ref={modalRef}
      adjustToContentHeight={true}
    >
      <SafeAreaView>
        Pedro
      </SafeAreaView>
    </Modalize>
  );
});
