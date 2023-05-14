import React from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components/native';
import { useDispatch } from 'react-redux';
import FilterCustom from '../../components/FilterCustom';
import {
  handleFinishDiscovery,
  closeDiscovery,
} from '../../store/actions/discovery';
import { Platform } from 'react-native';
import { DiscoveryFilters } from '../../types/discoveryTypes';
import { WithOptionalTheme } from 'styled-components';

interface ContainerProps {
  theme: DefaultTheme;
}

enum DiscoveryFilterType {
  LOCATION = 'location',
  CATEGORY = 'category',
  RATING = 'rating',
  PRICE = 'price',
}

interface FilterStep {
  type: DiscoveryFilterType;
  title: string;
  optionsType?: DiscoveryFilterType;
  options?: any[];
  image?: string;
  subSteps?: FilterStep[];
}

interface DiscoveryWithThemeProps
  extends WithOptionalTheme<DiscoveryWithThemeProps> {
  filterSteps: FilterStep[];
  onBack: () => void;
  onNext: () => void;
  selectsState: DiscoveryFilters & Record<string, any>;
}

const Container = styled.View<ContainerProps>`
  flex: 1;
  background: ${(props) => props.theme.colors.light};
  padding-top: ${(props) => (Platform.OS === 'ios' ? props.theme.space.s4 : 0)};
`;

const DiscoveryWithTheme: React.FC<DiscoveryWithThemeProps> = withTheme(
  ({ filterSteps, onBack, onNext, selectsState, theme }) => {
    const dispatch = useDispatch();

    const back = () => dispatch(closeDiscovery());

    return (
      <Container>
        <FilterCustom
          {...{ filterSteps, onBack, onNext }}
          selectsState={selectsState}
          steps={filterSteps.map((step) => ({
            ...step,
            steps:
              step.subSteps?.map((subStep) => ({
                ...subStep,
                subSteps: undefined,
              })) || undefined,
          }))}
          onBack={back}
          onNext={() => dispatch(handleFinishDiscovery())}
          theme={theme} // Add the theme prop here
        />
      </Container>
    );
  }
);

const Discovery: React.FC<DiscoveryWithThemeProps> = (props) => {
  return <DiscoveryWithTheme {...props} />;
};

export default Discovery;
