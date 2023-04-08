import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { Subtitle2, Subtitle1 } from '../../../components/Typography'
import { SpaceHorizontal } from '../../../components/Space'
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';



const AddressBox = styled.TouchableOpacity`
    margin-left: 16px;
    margin-right: 16px;
    background-color: "#FAFAFA";
    padding: 16px;
    border-radius: '8px';
    shadow-color: 'rgb(0, 0, 0)';
    shadow-offset: 0px; 5px;
    shadow-opacity: .16;
    shadow-radius: 3px;
    elevation: 2;
    margin-bottom: 16px;
    align-items: center;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-flow: row;
`;

const AddressBoxInfo = styled.View`
    flex: 1;
    align-items: flex-start;
`;


class BoxAddress extends Component {

    render() {
        const { address, addressKey, onPress, choseAddressMode, theme } = this.props
        
        if (!address) return null
        return (
            <React.Fragment>
                <AddressBox onPress={() => onPress(addressKey)}>

                    <AddressBoxInfo>
                        <Subtitle1>{address.nameFormated}</Subtitle1>
                       
                        <Subtitle2 type="secondDarkColor">{address.addressFormated}</Subtitle2>
                        <Subtitle2 type="secondDarkColor">{address.complement}</Subtitle2>
                    </AddressBoxInfo>
                    <SpaceHorizontal n={2} />
                    {
                        !choseAddressMode && <EvilIcons name="chevron-right" color= '#414042' size={theme.sizes.icons} />
                    }
                </AddressBox>
            </React.Fragment>
        )
    }

}


function mapStateToProps({ address }, { addressKey }){
    return {
        address: address.adresses[addressKey]
    }
}

export default withTheme(connect(mapStateToProps)(BoxAddress))