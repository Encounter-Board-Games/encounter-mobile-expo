import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import BannerSection from './BannerSection';
import MainShelves from './MainShelves';
import DiscoverySection from './DiscoverySection';
import OtherShelves from './OtherShelves';
import NotFoundSuggestion from './NotFoundSuggestion';

const MainContent: React.FC = () => {
  const banners = useSelector(
    (state: RootState) => state.shelves.banners.items
  );

  return (
    <>
      <BannerSection banners={banners} />
      <MainShelves />
      <DiscoverySection />
      <OtherShelves />
      <NotFoundSuggestion />
    </>
  );
};

export default MainContent;
