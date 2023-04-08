import React from 'react'
import styled, { withTheme } from 'styled-components'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import Constants from 'expo-constants';
import FilterCustom from '../../components/FilterCustom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { handleFinishDiscovery, closeDiscovery } from '../../store/actions/discovery';
import { Platform } from 'react-native';

const Container = styled.View`
    flex: 1;
    background: "#FAFAFA";
    padding-top: '32px';
    
`


export default withTheme(() => {
    const discovery = useSelector(state => state.discovery)
    const dispatch = useDispatch()
    const { steps = [] } = discovery

    const back = () => {
    
        dispatch(closeDiscovery())
    }
    // return <Container><Welcome /></Container>
    return (
        <Container>
             <FilterCustom 
                selectsState={discovery.filters} 
                steps={steps} 
                onBack={back}
                onNext={() => dispatch(handleFinishDiscovery())}
                
            />
               
        </Container>)

})