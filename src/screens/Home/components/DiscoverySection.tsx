import React from 'react';
import { useDispatch } from '../../../store/hooks';
import styled from 'styled-components/native';
import ButtonComponent from '../../../components/Button/Button';
import Container from '../../../components/Container';
import {
  handleOpenDiscovery,
  openDiscovery,
} from '../../../store/actions/discovery';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../theme/theme';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootStackParamList';
import { ProductAction } from '../../../store/reducers/productReducer';
import { ShelvesAction } from '../../../store/reducers/shelvesReducer';
import { UserAction } from '../../../types/userTypes';
import { translation } from '../../../texts/translation';

// Create a type alias for the union of action types
export type AppActions = ProductAction | ShelvesAction | UserAction;

const FindOut = styled.View`
  flex-flow: row;
  padding-left: ${(props: { theme: { space: { s2: any } } }) =>
    props.theme.space.s2};
`;

const DiscoverySection: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Replace 'any' type with 'AppActions' for the dispatch function
  const openDiscovery = () => {
    dispatch(handleOpenDiscovery());
    navigation.navigate('Busca');
  };

  return (
    <Container
      title={translation('discovery.title')}
      subtitle={translation('discovery.subtitle')}
    >
      <FindOut>
        <ButtonComponent
          onPress={openDiscovery}
          type="ComplementButton-Medium"
          theme={theme}
        >
          Descobrir
        </ButtonComponent>
      </FindOut>
    </Container>
  );
};

export default DiscoverySection;
