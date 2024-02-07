import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { H4, H3 } from "../../../components/Typography";

import { closePopupModal } from "../../../store/actions/info";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
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

  const { popup = {} } = useSelector((state) => state.info);
  const {
    callBack = () => {},
    title,
    description,
    cancelBtn,
    confirmBtn,
  } = popup.data ? popup.data : {};

  const remove = () => {
    callBack(true);
    dispatch(closePopupModal());
  };

  const cancel = () => {
    dispatch(closePopupModal());
    callBack(false);
  };

  return (
    <Container>
      {title ? <H3 center>{title}</H3> : null}
      <Space n={1} />
      {description ? (
        <H4 noBold center>
          {description}
        </H4>
      ) : null}

      <Space n={2} />
      <Line>
        <Btn>
          <Button onPress={cancel} type="CallToAction-Outline" width={"auto"}>
            {cancelBtn || "Cancelar"}
          </Button>
        </Btn>
        <SpaceHorizontal n={4} />
        <Btn>
          <Button onPress={remove} type="ComplementButton-Big" width={"auto"}>
            {confirmBtn || "Sim, excluir"}
          </Button>
        </Btn>
      </Line>
    </Container>
  );
};
