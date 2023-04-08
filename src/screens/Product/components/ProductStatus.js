
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import config from '../../../../config'

const ProductEnable = styled.View`
flex-flow: row;
justify-content: flex-start;
    align-items: flex-end;
width: 100%
`;

const Content = styled.View`
    flex: 1;
    flex-flow: row
    align-items: center;
`;

const Timer = styled.TouchableOpacity`
    width: 24px
    justify-content: center;
        align-items: center;
    height: 24px

    background-color: "#0d3c54";
    border-radius: 24px;
    border: .5px solid "#0d3c54";
`;

const ProductEnableText = styled.Text`
max-width: 100%;
font-size: 12px;
font-family: Nunito;
color: "#6D6E71";
`;

const Space = styled.View`
width: 4px;
height: 1px;
`;

const ProductEnableBall = styled.View`
width: 8px;
height: 8px;
border-radius:  8px;
background: "#6FE382";
`;

export default withTheme(({ available, rememberMe, hasAlert, theme, onPress, company }) => <ProductEnable>
    {
        (config.showCompanyOnAvaiable && company) ? <Content>
            <ProductEnableText>{company}</ProductEnableText>
        </Content> :
            <Content>
                <ProductEnableBall available={available} />
                <Space />
                <ProductEnableText>{available ? 'Disponível' : 'Insdisponível'}</ProductEnableText>
            </Content>
    }

    {
        rememberMe && <Timer hasAlert={hasAlert} onPress={() => onPress && onPress()}>
            {
                !hasAlert ? <Ionicons name="ios-notifications-outline" color={"#0d3c54"} size={16} /> :
                    <Ionicons name="ios-notifications-outline" color={"#FAFAFA"} size={16} />
            }

        </Timer>
    }


</ProductEnable>)