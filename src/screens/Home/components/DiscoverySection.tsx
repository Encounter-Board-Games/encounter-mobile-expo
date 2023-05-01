import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import Container from '../../components/Container';
import { handleOpenDiscovery } from '../../store/actions/discovery';
import { translation } from '../../texts';

const FindOut = styled.View`
  flex-flow: row;
  padding-left: ${(props) => props.theme.space.space2};
`;

const DiscoverySection: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const openDiscovery = () => {
    dispatch(handleOpenDiscovery()).then((result) => {
      if (result) navigation.navigate('Busca');
    });
  };

  return (
    <Container
      title={translation('discovery.title')}
      subtitle={translation('discovery.subtitle')}
    >
      <FindOut>
        <Button onPress={openDiscovery} type="ComplementButton-Medium">
          Descobrir
        </Button>
      </FindOut>
    </Container>
  );
};

export default DiscoverySection;
