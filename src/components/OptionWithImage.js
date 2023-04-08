import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { H4, H3 } from './Typography';
import { Image } from 'react-native';

const OptionWithImage = styled(TouchableOpacity)`
    padding: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: '8px';
    border: 1.5px;
    border-color: "#BCBEC0";
    margin-bottom: 16px;
    background-color: 'transparent';
    height: 120px;
`

const Content = styled.View`
    flex: 1;
    height: 100%;
    justify-content: center;
    flex-wrap: wrap;
`

const Line = styled.View`
    flex-flow: row;
    align-items: flex-start;
`

const ImageContent = styled.View`
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
    padding-right: 16px;
    width: 50%;
`

export default ({isActive, text, image, onPress}) => {
    return (
        <OptionWithImage isActive={isActive} onPress={onPress}>
            <Line>
                <ImageContent>
                    <Image 
                        resizeMode="contain"
                        style={{
                            width: '100%',
                            height: '100%',
                            flex: 1,
                        }}
                        source={{ uri: image }} />
                </ImageContent>
                <Content>
                    {
                        isActive ? <H3 bold type="primaryDarkColor" style={{ width: '100%' }}>{text}</H3> :
                                   <H4 type="secondDarkColor" style={{ width: '100%' }}>{text}</H4>
                    }
                </Content>
            </Line>
        </OptionWithImage>
    )
}
