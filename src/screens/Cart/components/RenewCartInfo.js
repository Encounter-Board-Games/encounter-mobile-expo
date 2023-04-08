import React, { useEffect, useRef } from "react";
import { H3 } from "../../../components/Typography";
import styled, { withTheme } from "styled-components";
import { Modalize } from "react-native-modalize";
import { Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { translation } from "../../../texts";
import { SafeAreaView } from "react-native-safe-area-context";
//
const Container = styled.View`
  padding: 16px;
  padding-top: 0;
  background: "#FAFAFA";
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Header = styled.TouchableOpacity`
  padding: 16px;
  background-color: "#FAFAFA";
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
  width: 100%;
`;

const CloseButton = styled.View`
    position: absolute;
    top:16px;
    left: 16px;
    background-color: "#FAFAFA";
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
      modalStyle={{ backgroundColor: "#FAFAFA" }}
      HeaderComponent={() => (
        <Header onPress={close}>
          <CloseButton>
            <Entypo
              name="chevron-thin-down"
              color= '#414042'
              size={16}
            />
          </CloseButton>
          <H3 center>{translation("cart.cartName")}</H3>
        </Header>
      )}
      ref={modalRef}
      adjustToContentHeight={true}

      //   modalHeight={height} //Dimensions.get('window').height/3 - (Constants.statusBarHeight ) - 400}
    >
      <SafeAreaView>
        <Text>Pedro</Text>
      </SafeAreaView>
    </Modalize>
  );
});
