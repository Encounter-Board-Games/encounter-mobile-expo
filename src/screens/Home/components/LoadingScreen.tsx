import React from 'react';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import Banner from '../HomeStyles';
import Container from '../../../components/Container';
import ProductShelf from '../../Product/components/ProductShelf';

const LoadingScreen: React.FC = () => {
  return (
    <>
      <Banner>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia size={'100%'} />
        </Placeholder>
      </Banner>
      <Container isLoading>
        <ProductShelf ids={[1, 2, 4, 5]} isLoading />
      </Container>
      <Container isLoading>
        <ProductShelf spotlight ids={[1, 2, 4, 5]} isLoading />
      </Container>
    </>
  );
};

export default LoadingScreen;
