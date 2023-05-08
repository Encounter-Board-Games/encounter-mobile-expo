import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Space } from '../../../components/Space';
import { Button } from '../../../components/Input';
import { H3, H4 } from '../../../components/Typography';
import { RootState } from '../../../store/reducers';
import { closePopupModal } from '../../../store/actions/info';
import theme from '../../../theme/theme';

interface PopupData {
  title: string;
  text: string;
}

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

const PopupModal: FC = () => {
  const dispatch = useDispatch();
  const { popup = {} } = useSelector((state: RootState) => state.info);
  const { title = '', text = '' } = popup.data ?? ({} as PopupData);

  const handleOkPress = () => {
    dispatch(closePopupModal());
  };

  return (
    <Container>
      <H3 center>{title}</H3>
      <Space n={0} />
      <H4 center noBold>
        {text}
      </H4>
      <Space n={2} />
      <Line>
        <Button
          onPress={handleOkPress}
          type="ComplementButton-Big"
          theme={theme}
        >
          Ok
        </Button>
      </Line>
    </Container>
  );
};

export default PopupModal;
