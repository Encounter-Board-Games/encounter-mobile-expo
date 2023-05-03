import React from 'react';
import { useDispatch } from '../../../store/hooks';
import styled from 'styled-components/native';
import ButtonComponent from '../../../components/Button/Button';
import Container from '../../../components/Container';
import { handleOpenDiscovery } from '../../../store/actions/discovery';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../styles/theme';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootStackParamList';
import t from '../../../texts/translations/translations';

const FindOut = styled.View`
  flex-flow: row;
  padding-left: ${(props: { theme: { space: { space2: any } } }) =>
    props.theme.space.space2};
`;

const DiscoverySection: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const openDiscovery = () => {
    dispatch(handleOpenDiscovery()).then((result: any) => {
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
