// Add imports for action types
import { ProductAction } from '../../../store/actions/product';
import { ShelvesAction } from '../../../store/actions/shelves';
import { UserAction } from '../../../store/actions/user';

import React from 'react';
import { useDispatch } from '../../../store/hooks';
import styled from 'styled-components/native';
import ButtonComponent from '../../../components/Button/Button';
import Container from '../../../components/Container';
import { handleOpenDiscovery } from '../../../store/actions/discovery';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../theme/theme';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootStackParamList';
import t from '../../../texts/translations/translations';

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
    dispatch(handleOpenDiscovery()).then((result: AppActions) => {
      if (result) navigation.navigate('Busca');
    });
  };

  return (
    <Container title={t('discovery.title')} subtitle={t('discovery.subtitle')}>
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
