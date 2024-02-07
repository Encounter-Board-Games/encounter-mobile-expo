import React, { useRef, useEffect } from "react";
import { Modalize } from "react-native-modalize";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { withTheme } from "styled-components";
import { Space } from "../../components/Space";
import { H3, Subtitle2 } from "../../components/Typography";
import { closeInfoModal } from "../../store/actions/info";
import { Container, Header, CloseButton, Content, SafeSpace } from "./InfoModalStyles";

const InfoModal = ({ dispatch, theme, info }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (info.open && !modalRef.current.state.isVisible) {
      modalRef.current.open();
    }
    if (!info.open && modalRef.current.state.isVisible) {
      modalRef.current.close();
    }
  }, [info.open]);

  const { content = [], title = "" } = info;

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.lightColor }}
      onClosed={() => dispatch(closeInfoModal())}
      HeaderComponent={undefined}
      ref={modalRef}
    >
      <Container behavior="padding">
        <Header onPress={() => dispatch(closeInfoModal())}>
          <CloseButton>
            <Entypo
              name="chevron-thin-down"
              color={theme.colors.darkColor}
              size={16}
            />
          </CloseButton>
          <H3 center>{title}</H3>
        </Header>
        <Space n={3} />
        <Content>
          {content.map((item, i) => (
            <React.Fragment key={i}>
              <H3 type="primaryDarkColor">{item.name}</H3>
              <Space n={0} />
              <Subtitle2>{item.description}</Subtitle2>
              <Space n={3} />
            </React.Fragment>
          ))}
        </Content>
        <SafeSpace />
      </Container>
    </Modalize>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.info && state.info.infoModal ? state.info.infoModal : {},
  };
};

export default withTheme(connect(mapStateToProps)(InfoModal));
