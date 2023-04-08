import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styled, { withTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Subtitle2 } from '../../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import { handleSearchLocation } from '../../store/actions/address';
import { connect } from 'react-redux';
// import {  } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const Header = styled.View`
    position: absolute;
    top: 32px;
    left: 0;
    zIndex: 99;
    width: 100%;
    padding: 16px
`;

const Footer = styled.View`
    position: absolute;
    bottom: 16px;
    left: 0;
    zIndex: 99;
    width: 100%;
    padding: 16px
`;

const CloseButton = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items:center;
`;

const Address = styled.View`
    background: "#FAFAFA"
    width: 100%;
    border-radius: '8px';
    padding: 16px;
    shadow-color: 'rgb(0, 0, 0)';
    shadow-offset: 0px, 5px;
    shadow-opacity: .16;
    shadow-radius: 3px;
    elevation: 2;
    opacity: '.8';
`;

const MarkerMiddle = styled.View`
    width: 32px;
    height: 32px;
    position:absolute;
    top: 16px;
    left: 16px;
    zIndex: 99;
    align-items:center;
    justify-content:center;
`;


class CurrentLocation extends Component {

    state = {
        moving: false,
        started: false
    }

    async componentDidMount() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        
        this.map.animateCamera({ center: currentLocation.coords, pitch: 10, altitude: 800, zoom: 17 }, 500)
        
        this.requestStreeName(currentLocation.coords)
        
        this.setState({
            started: true,
            moving: false
        })
    }


    onPressMap = (e) => {
        if (this.map && e.nativeEvent.coordinate) {
            this.setState({ moving: true })
            this.map.animateCamera({ center: e.nativeEvent.coordinate, pitch: 10, altitude: 800 }, 500)
        }
    }

    requestStreeName = ({ latitude, longitude}) => {

        this.props.dispatch(handleSearchLocation(latitude, longitude))
        
    }

    onRegionChange = (e) => {
        this.setState({ moving: true })
    }

    onRegionChangeComplete = (e) => {

        if(this.state.started)
        {
            this.setState({ moving: false })
            this.requestStreeName(e)
        }
        // this.map.animateCamera({ center: e, pitch: 10, }, 500)
    }


    render() {
        const { moving } = this.state
        const streetName = this.props.currentLocation && 
                            this.props.currentLocation.street ?
                            (this.props.currentLocation.formatted_address || this.props.currentLocation.street) :
                            undefined
        const markerTop = Dimensions.get('window').height / 2 - 16
        // nagivation.goBack()

        return (<Container >

            <Hedaer>
                <CloseButton onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" color= '#414042' size={32} />
                </CloseButton>
            </Hedaer>

            <Footer>
                <Address disabled={!streetName}>
                    <Subtitle2> {!streetName ? 'Carragando...' : streetName} </Subtitle2>
                </Address>
               
                <Button onPress={() => this.props.navigation.navigate("AddNewAddress")} disabled={!streetName} type="CallToAction-Light">Confirmar</Button>
            </Footer>

            <MarkerMiddle style={{ top: moving ? markerTop - 8 : markerTop }}>
                <Image resizeMode={"contain"} style={{ height: '100%', opacity: moving ? .5 : 1 }} source={require('../../assets/img/map-pin.png')} />
            </MarkerMiddle>

            <MapView
                onPress={e => this.onPressMap(e)}
                onRegionChangeComplete={e => this.onRegionChangeComplete(e)}
                onRegionChange={e => this.onRegionChange(e)}
                pitchEnabled={false}
                ref={ref => {
                    this.map = ref;
                }}
                loadingEnabled
                style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}
            >

            </MapView>
        </Container>)

    }

}

function mapStateToProps({ address }){
    return {
        currentLocation: address.currentLocation
    }

}

export default withTheme(connect(mapStateToProps)(CurrentLocation))