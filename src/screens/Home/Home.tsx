/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translation } from '../../texts';
import config from '../../config';
import {
  handleInitHome,
  handleProcessActions,
} from '../../store/actions/shared';
import { handleSetSelects } from '../../store/actions/filters/filters';
import {
  handleNotFoundProductSuggestion,
  handleOpenDiscovery,
} from '../../store/actions/discovery';
import { RootState } from '../../store/reducers';
import { Shelf, Banner as BannerType } from '../../store/types';
import { Banner } from './HomeStyles';
import Carrossel from '../../components/Carrossel';
import Button from '../../components/Button/Button';
import Container from '../../components/Container';
import ProductShelf from '../Product/components/ProductShelf';
import Screen from '../../components/ScreenComponent';
import { FindOut } from './HomeStyles';

type Props = {};

const Home: React.FC<Props> = () => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shelvesState = useSelector((state: RootState) => state.shelves);
  const isLogged = useSelector((state: RootState) => state.user);
  const banners = useSelector(
    (state: RootState) => state.shelves.banners.items
  );

  useEffect(() => {
    dispatch(handleInitHome());
  }, [dispatch]);

  const isLoading: boolean = shelvesState.loading;

  const openSeeAll = (filters: any) => {
    dispatch(handleSetSelects(filters));
    navigation.navigate('Busca');
  };

  const openSuggestion = () => {
    dispatch(handleNotFoundProductSuggestion());
  };

  const openDiscovery = async () => {
    const result = await dispatch(handleOpenDiscovery());
    if (result) navigation.navigate('Busca');
  };

  if (isLoading)
    return (
      <Screen>
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
      </Screen>
    );

  const shelves: { [key: string]: Shelf } = shelvesState.shelves || {};
  const shelvesSorted = Object.keys(shelves)
    .map((key) => shelves[key])
    .sort((a, b) => a.order - b.order);
  const mainShelves = shelvesSorted.filter(
    (f) => f.top && f.products.length > 0
  );
  const othersShelves = shelvesSorted.filter(
    (f) => !f.top && f.products.length > 0
  );

  return (
    <Screen>
      {banners.length == 0 && (
        <Banner>
          <Placeholder Animation={Fade}>
            <PlaceholderMedia size={'100%'} />
          </Placeholder>
        </Banner>
      )}
      {banners.length > 0 && (
        <Carrossel
          current={currentBanner}
          onCurrentChange={(n) => setCurrentBanner(n)}
        >
          {banners.map((banner: BannerType, index: number) => (
            <Banner key={index}>
              {banner.action && banner.action != 'no_action' ? (
                <TouchableOpacity
                  onPress={() => dispatch(handleProcessActions(banner.action))}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image
                    source={{ uri: banner.url }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                    props={{ resizeMode: 'cover' }} // added props parameter
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  source={{ uri: banner.url }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                  props={{ resizeMode: 'cover' }} // added props parameter
                />
              )}
            </Banner>
          ))}
        </Carrossel>
      )}

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

      {config.notFoundSuggestion && (
        <Container
          title={translation('notFoundProducts.title')}
          subtitle={translation('notFoundProducts.subtitle')}
        >
          <FindOut>
            <Button onPress={openSuggestion} type="CallToAction-Primary-Color">
              {translation('notFoundProducts.buttonText')}
            </Button>
          </FindOut>
        </Container>
      )}
    </Screen>
  );
};

export default Home;
