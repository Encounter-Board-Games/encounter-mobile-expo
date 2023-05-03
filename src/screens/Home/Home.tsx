import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import Screen from '../../components/ScreenComponent';
import { handleInitHome } from '../../store/actions/shared';
import Banner from './components/Banner';
import Shelves from './components/Shelves';
import DiscoverySection from './components/DiscoverySection';
import NotFoundSection from './components/NotFoundSection';
import { RootState } from '../../store/store';

const Home = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.shelves.loading);

  useEffect(() => {
    dispatch(handleInitHome());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Screen>
        <Banner isLoading />
        <Shelves isLoading />
      </Screen>
    );
  }

  return (
    <Screen>
      <Banner />
      <Shelves />
      <DiscoverySection />
      <NotFoundSection
        openSuggestion={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Screen>
  );
};

export default Home;
