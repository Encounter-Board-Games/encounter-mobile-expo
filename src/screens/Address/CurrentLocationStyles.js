import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    flex: 1;
    position: relative;
`;

export const Header = styled.View`
    position: absolute;
    top: ${props => props.theme.space.space4};
    left: 0;
    zIndex: 99;
    width: 100%;
    padding: ${props => props.theme.space.space2}
`;

export const Footer = styled.View`
    position: absolute;
    bottom: ${getBottomSpace() + 'px'};
    left: 0;
    zIndex: 99;
    width: 100%;
    padding: ${props => props.theme.space.space2}
`;


export const CloseButton = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items:center;
`;

export const Address = styled.View`
    background: ${props => props.theme.colors.lightColor}
    width: 100%;
    border-radius: ${props => props.theme.borderRadius.button}
    padding: ${props => props.theme.space.space2}
    shadow-color: ${props => props.theme.shadow.shadowColor};
    shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
    shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
    shadow-radius: ${props => props.theme.shadow.shadowRadius};
    elevation: ${props => props.theme.shadow.elevation};
    opacity: ${props => props.disabled ? '.8' : '1'}
`;

export const MarkerMiddle = styled.View`
    width: 32px;
    height: 32px;
    position:absolute;
    top: ${Dimensions.get('window').height / 2 - 16}px;
    left: ${Dimensions.get('window').width / 2 - 16}px;
    zIndex: 99;
    align-items:center;
    justify-content:center;
`;