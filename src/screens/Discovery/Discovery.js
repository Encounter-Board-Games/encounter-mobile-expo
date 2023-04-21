import React from 'react';
import styled, { withTheme } from 'styled-components';
import FilterCustom from '../../components/FilterCustom';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFinishDiscovery,
  closeDiscovery,
} from '../../store/actions/discovery';
import { Platform } from 'react-native';

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.lightColor};
  padding-top: ${(props) =>
    Platform.OS === 'ios' ? props.theme.space.space4 : 0};
`;

export default withTheme(() => {
  const discovery = useSelector((state) => state.discovery);
  const dispatch = useDispatch();
  const { steps = [] } = discovery;

  const back = () => {
    dispatch(closeDiscovery());
  };

  return (
    <Container>
      <FilterCustom
        selectsState={discovery.filters}
        steps={steps}
        onBack={back}
        onNext={() => dispatch(handleFinishDiscovery())}
      />
    </Container>
  );
});
