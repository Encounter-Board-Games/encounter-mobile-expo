import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../../../store/reducers';
import { InfoState, PopupModalData } from '../../../store/types';
import { closePopupModal } from '../../../store/actions/info';
import { Space, SpaceHorizontal } from '../../../components/Space';
import Button from '../../../components/Button/Button';
import { H4, H3 } from '../../../components/Typography';

interface ContainerProps {}

const Container = styled.View<ContainerProps>`
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

const PopupModal: React.FC = () => {
  const dispatch = useDispatch();
  const { popup = {} }: { popup: InfoState['popup'] } = useSelector(
    (state: RootState) => state.info
  );
  const {
    callBack = () => {},
    title,
    description,
    cancelBtn,
    confirmBtn,
  }: PopupModalData = popup.data ? popup.data : {};

  const remove = () => {
    callBack(true);
    dispatch(closePopupModal());
  };

  const cancel = () => {
    callBack(false);
    dispatch(closePopupModal());
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
          <Button onPress={cancel} type="CallToAction-Outline" width={'auto'}>
            {cancelBtn || 'Cancelar'}
          </Button>
        </Btn>
        <SpaceHorizontal n={4} />
        <Btn>
          <Button onPress={remove} type="ComplementButton-Big" width={'auto'}>
            {confirmBtn || 'Sim, excluir'}
          </Button>
        </Btn>
      </Line>
    </Container>
  );
};

export default PopupModal;
