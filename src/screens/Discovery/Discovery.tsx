import React from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import FilterCustom from '../../components/FilterCustom';
import {
  handleFinishDiscovery,
  closeDiscovery,
} from '../../store/actions/discovery';
import { Platform } from 'react-native';
import { RootState } from '../../store/reducers';
import { DiscoveryState } from '.';

interface ContainerProps {
  theme: DefaultTheme;
}

const Container = styled.View<ContainerProps>`
  flex: 1;
  background: ${(props) => props.theme.colors.light};
  padding-top: ${(props) =>
    Platform.OS === 'ios' ? props.theme.space.s4 : 0};
`;

const Discovery: React.FC = withTheme(() => {
  const discovery: DiscoveryState = useSelector(
    (state: RootState) => state.discovery
  );
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

export default Discovery;
