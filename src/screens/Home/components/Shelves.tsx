import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../../components/Container';
import ProductShelf from '../../product/components/ProductShelf';
import * as handleSetSelects from '../../../store/actions/filters/setSelects';
import { useNavigation } from '@react-navigation/native';

interface ShelvesProps {
  isLoading?: boolean;
}

const Shelves: React.FC<ShelvesProps> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shelvesState = useSelector((state) => state.shelves);
  const shelves = shelvesState.shelves || {};

  const shelvesSorted = Object.keys(shelves)
    .map((key) => shelves[key])
    .sort((a, b) => a.order - b.order);

  const mainShelves = shelvesSorted.filter(
    (f) => f.top && f.products.length > 0
  );
  const othersShelves = shelvesSorted.filter(
    (f) => !f.top && f.products.length > 0
  );

  const openSeeAll = (filters) => {
    dispatch(handleSetSelects(filters));
    navigation.navigate('Busca');
  };

  if (isLoading) {
    return (
      <>
        <Container isLoading title={''}>
          <ProductShelf ids={[1, 2, 4, 5]} isLoading />
        </Container>
        <Container isLoading title={''}>
          <ProductShelf spotlight ids={[1, 2, 4, 5]} isLoading />
        </Container>
      </>
    );
  }

  return (
    <>
      {mainShelves.map((shelf) => (
        <Container
          key={shelf.key}
          title={shelf.title}
          subtitle={shelf.subtitle}
          toolText={shelf.filter ? 'Ver todos' : undefined}
          onToolTextPress={() => openSeeAll(shelf.filter)}
        >
          <ProductShelf
            showPrice
            spotlight={shelf.spotlight}
            ids={shelf.products}
          />
        </Container>
      ))}
      {othersShelves.map((shelve) => (
        <Container
          key={shelve.key}
          title={shelve.title}
          subtitle={shelve.subtitle}
        >
          <ProductShelf ids={shelve.products} />
        </Container>
      ))}
    </>
  );
};

export default Shelves;
