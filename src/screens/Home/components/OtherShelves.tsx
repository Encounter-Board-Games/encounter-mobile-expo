import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import Container from '../../../components/Container';
import ProductShelf from '../../Product/components/ProductShelf';
import { Shelf } from '../../../store/types';

const OtherShelves: React.FC = () => {
  const shelvesState = useSelector((state: RootState) => state.shelves);
  const shelves: { [key: string]: Shelf } = shelvesState.shelves || {};
  const shelvesSorted = Object.keys(shelves)
  .map((key) => shelves[key])
  .sort((a, b) => a.order - b.order);
  const othersShelves = shelvesSorted.filter(
  (f) => !f.top && f.products.length > 0
  );
  
  return (
  <>
  {othersShelves.length > 0 &&
  othersShelves.map((shelve: Shelf, index: number) => (
  <Container
           key={shelve.key}
           title={shelve.title}
           subtitle={shelve.subtitle}
         >
  {<ProductShelf ids={shelve.products} />}
  </Container>
  ))}
  </>
  );
  };
  
  export default OtherShelves;
