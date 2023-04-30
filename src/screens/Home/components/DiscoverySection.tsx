import React from 'react';
import { useDispatch } from 'react-redux';
import { translation } from '../../../texts';
import { handleOpenDiscovery } from '../../../store/actions/discovery';
import Container from '../../../components/Container';
import { FindOut } from '../HomeStyles';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';

const DiscoverySection: React.FC = () => {
  const dispatch = useDispatch();

  const openDiscovery = async () => {
    const result = await dispatch(handleOpenDiscovery());
    if (result) navigation.navigate('Busca');
  };

  return (
    <Container
      title={translation('discovery.title')}
      subtitle={translation('discovery.subtitle')}
    >
      <FindOut>
        <ButtonComponent onPress={openDiscovery} type="ComplementButton-Medium">
          Descobrir
        </ButtonComponent>
      </FindOut>
    </Container>
  );
};

export default DiscoverySection;
