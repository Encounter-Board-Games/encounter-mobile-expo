import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme, withTheme } from 'styled-components/native';
import { Button } from '../../components/Button/Button';
import { Space } from '../../components/Space';
import { Subtitle2 } from '../../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import { handleSearchLocation } from '../../store/actions/address/address';
import { useDispatch, useSelector } from 'react-redux';

const CurrentLocation = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentLocation } = useSelector(({ address }) => address);
  const [moving, setMoving] = useState(false);
  const [started, setStarted] = useState(false);
  const mapRef = useRef(null);
  const theme = useTheme();

  const onPressMap = (e) => {
    if (mapRef.current && e.nativeEvent.coordinate) {
      setMoving(true);
      mapRef.current.animateCamera(
        { center: e.nativeEvent.coordinate, pitch: 10, altitude: 800 },
        500
      );
    }
  };

  const onRegionChange = (e) => {
    setMoving(true);
  };

  const onRegionChangeComplete = (e) => {
    if (started) {
      setMoving(false);
      requestStreeName(e);
    }
  };

  const requestStreeName = ({ latitude, longitude }) => {
    dispatch(handleSearchLocation(latitude, longitude));
  };

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      mapRef.current.animateCamera(
        { center: currentLocation.coords, pitch: 10, altitude: 800, zoom: 17 },
        500
      );
      requestStreeName(currentLocation.coords);
      setStarted(true);
      setMoving(false);
    };

    getLocationAsync();
  }, []);

  const streetName = currentLocation?.street
    ? currentLocation.formatted_address || currentLocation.street
    : undefined;
  const markerTop = Dimensions.get('window').height / 2 - 16;

  return (
    <>
      <Header>
        <CloseButton onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-arrow-round-back"
            color={theme.colors.darkColor}
            size={32}
          />
        </CloseButton>
      </Header>
      <Footer>
        <Address disabled={!streetName}>
          <Subtitle2>{!streetName ? 'Carragando...' : streetName}</Subtitle2>
        </Address>
        <Space n={2} />
        <Button
          onPress={() => navigation.navigate('AddNewAddress')}
          disabled={!streetName}
          type="CallToAction-Light"
        >
          Confirmar
        </Button>
      </Footer>
      <MarkerMiddle style={{ top: moving ? markerTop - 8 : markerTop }}>
        <Image
          resizeMode={'contain'}
          style={{ height: '100%', opacity: moving ? 0.5 : 1 }}
          source={require('../../assets/img/map-pin.png')}
        />
      </MarkerMiddle>
      <MapView
        onPress={onPressMap}
        onRegionChangeComplete={onRegionChangeComplete}
        onRegionChange={onRegionChange}
        pitchEnabled={false}
        ref={mapRef}
        loadingEnabled
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          >
            <Image source={require('../../assets/img/map-pin.png')} />
          </Marker>
        )}
      </MapView>
    </>
  );
};

export default withTheme(CurrentLocation);
