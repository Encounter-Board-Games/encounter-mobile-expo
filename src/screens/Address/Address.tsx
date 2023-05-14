import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { withTheme } from 'styled-components/native';
import ScreenPopup from '../../components/ScreenPopup';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuOption from '../../components/MenuOption';
import BoxAddress from './component/BoxAddress';
import NotLoggedBox from '../user/components/NotLoggedBox';
import {
  handleSetCurrentLocation,
  handleSearchLocationByTerm,
} from '../../store/actions/address/address';
import { handleCloseCartChoseAddress } from '../../store/actions/shared';
import { handleSelectAddress } from '../../store/actions/cart/cartAddress';
import {
  Content,
  ScrollViewAddress,
  AddressNumber,
  MainContent,
  Container,
} from './AddressStyles';
import { Space } from '../../components/Space';
import { Props, AddressLocation } from './AddressTypes';
import { Subtitle2 } from '../../components/Typography';
import { RootState } from '../search/Search';

const ChoseAddressScreen: React.FC<Props> = withTheme(({ theme }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLogged = false } = useSelector((state: RootState) => state.user);
  const {
    choseAddressMode = false,
    adresses = {},
    searchLocations = {},
  } = useSelector((state: RootState) => state.address);
  const isSearch = Boolean(searchLocations.term && searchLocations.term !== '');
  const locations: AddressLocation[] = searchLocations.loading
    ? [1, 2, 3, 4, 5]
    : searchLocations.locations || [];
  const isLoading = searchLocations.loading;
  const addressKeys = Object.keys(adresses).filter(
    (key) => adresses[key].active
  );

  useEffect(() => {
    const handleClose = () => dispatch(handleCloseCartChoseAddress());
    return handleClose;
  }, []);

  const openOrSelectAddress = (key: string) => {
    if (choseAddressMode) {
      dispatch(handleSelectAddress(key));
      navigation.goBack();
    } else {
      dispatch(handleSetCurrentLocation(key));
      navigation.navigate('AddNewAddress');
    }
  };

  const locationContent = () => (
    <>
      {isSearch && (
        <Content>
          {locations.map((location, index) => (
            <MenuOption
              onPress={() => handleLocationClick(location)}
              hideBorder
              key={index.toString()}
              icon="location-pin"
              isLoading={isLoading}
              title={location.street}
              description={`${location.city}/${location.state}`}
            />
          ))}
        </Content>
      )}
      {!isLoading && locations.length === 0 && !isSearch && (
        <Content>
          <Subtitle2>Nenhum endereço encontrado</Subtitle2>
        </Content>
      )}

      {!isSearch && (
        <>
          <Content>
            <MenuOption
              onPress={() => navigation.navigate('CurrentLocation')}
              hideBorder
              icon="location"
              title="Usar minha localização atual"
            />
          </Content>
          <ScrollViewAddress flex={1} showsVerticalScrollIndicator={false}>
            <Space n={1} />
            {addressKeys.map((item) => (
              <React.Fragment key={item}>
                <BoxAddress
                  choseAddressMode={choseAddressMode}
                  addressKey={item}
                  onPress={() => openOrSelectAddress(item)}
                />
              </React.Fragment>
            ))}
          </ScrollViewAddress>
          <Content>
            <Space n={1} />
            <AddressNumber>
              <Subtitle2 type="secondColor">
                {`${addressKeys.length}/5 Endereços`}
              </Subtitle2>
            </AddressNumber>
          </Content>
        </>
      )}
    </>
  );

  const handleLocationClick = (location: AddressLocation) => {
    dispatch(handleSetCurrentLocation(undefined, location));
    dispatch(handleSearchLocationByTerm(''));
    navigation.navigate('AddNewAddress');
  };

  return (
    <ScreenPopup title="Endereço" withBorder>
      {isLogged ? (
        <Container>
          <Content>
            <SearchBar type="Location" />
            <Space n={3} />
          </Content>
          {locationContent()}
        </Container>
      ) : (
        <MainContent>
          <NotLoggedBox title="Você não possui endereços cadastrados." />
        </MainContent>
      )}
    </ScreenPopup>
  );
});

export default ChoseAddressScreen;
