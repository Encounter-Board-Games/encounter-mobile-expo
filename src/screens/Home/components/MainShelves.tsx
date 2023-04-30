import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import Container from '../../../components/Container';
import ProductShelf from '../../Product/components/ProductShelf';
import { Shelf } from '../../../store/types';
import { openSeeAll } from '../utils/navigationHelpers';

const MainShelves: React.FC = () => {
  const shelvesState = useSelector((state: RootState) => state.shelves);
  const shelves: { [key: string]: Shelf } = shelvesState.shelves || {};
  const shelvesSorted = Object.keys(shelves)
    .map((key) => shelves[key])
    .sort((a, b) => a.order - b.order);
  const mainShelves = shelvesSorted.filter(
    (f) => f.top && f.products.length > 0
  );

  return (
    <>
      {mainShelves.map((shelf: Shelf) => (
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
    </>
  );
};

export default MainShelves;