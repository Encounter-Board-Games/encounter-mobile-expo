import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../store';
import { Shelf, Banner as BannerType } from '../../store/types';
import { handleInitHome } from '../../store/actions/shared';
import Screen from '../../components/ScreenComponent';
import LoadingScreen from './components/LoadingScreen';
import MainContent from './components/MainContent';

type Props = {};

const Home: React.FC<Props> = () => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>(); // Update this line
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(handleInitHome());
  }, [dispatch]);

  return <Screen>{isLoading ? <LoadingScreen /> : <MainContent />}</Screen>;
};

export default Home;
