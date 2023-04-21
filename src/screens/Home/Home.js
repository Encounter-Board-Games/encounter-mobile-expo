import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  handleInitHome,
  handleProcessActions,
} from '../../store/actions/shared';
import { handleSetSelects } from '../../store/actions/filters/filters';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { handleOpenDiscovery } from '../../store/actions/discovery';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translation } from '../../texts';
import config from '../../config';
import { FindOut, Banner } from './HomeStyles';
import Container from '../../components/Container';
import ProductShelf from '../Product/components/ProductShelf';
import Screen from '../../components/Screen';
import { Button } from '../../components/Button/Button';
import Carrossel from '../../components/Carrossel';
import { Image } from 'react-native';

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shelvesState = useSelector((state) => state.shelves);
  const isLogged = useSelector((state) => state.user);
  const banners = useSelector((state) => state.shelves.banners.items);

  useEffect(() => {
    dispatch(handleInitHome());
  }, [dispatch]);

  const isLoading = shelvesState.loading;

  const openSeeAll = (filters) => {
    dispatch(handleSetSelects(filters));
    navigation.navigate('Busca');
  };

  const openSuggestion = () => {
    dispatch(handleNotFoundProductSuggestion());
  };

  const openDiscovery = () => {
    dispatch(handleOpenDiscovery()).then((result) => {
      if (result) navigation.navigate('Busca');
    });
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
          {banners.map((banner, index) => (
            <Banner key={index}>
              {banner.action && banner.action != 'no_action' ? (
                <TouchableOpacity
                  onPress={() => dispatch(handleProcessActions(banner.action))}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image
                    source={{ uri: banner.url }}
                    resizeMode="cover"
                    style={{ width: '              100%', height: '100%' }}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  source={{ uri: banner.url }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </Banner>
          ))}
        </Carrossel>
      )}

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
        othersShelves.map((shelve, index) => (
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
}
