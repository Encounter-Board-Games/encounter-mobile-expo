import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { Space, Bottom } from '../../components/Space'
import { H1, H4, H3, Subtitle2, Subtitle1 } from '../../components/Typography'
import { Image, View, Platform } from 'react-native'
import { Button } from '../../components/Button'
import { RadioButton } from '../../components/RadioButton'
import { setSelectQuestionToggleOnboarding } from '../../store/actions/onboarding'
import { useDispatch, useSelector } from 'react-redux'
import { API_URI } from '../../graphql/client'
import Constants from 'expo-constants'
import { quickSearchs } from '../../graphql'
import { handleAnswer } from '../../store/actions/quickSearch'


const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: "#FAFAFA";
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
`;

const Content = styled.View`
flex: 1;
`;

const ImageContent = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const Footer = styled.View`
    width: 100%;
`;

const Tags = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
`;

const KnowInfo = styled.TouchableOpacity`
    flex-flow: row;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Cancel = styled.TouchableOpacity``;


export default ({ quickSearch }) => {

    const dispatch = useDispatch()

    const answer = (value) => {
        dispatch(handleAnswer(quickSearch.key))
    } 

    const { options = [] } = quickSearch
    return (
        <Container>
            <Content>
               
                {/* Queremos te conhecer melhor!
A cada pergunta a seguir, marque quantas respostas quiser. */}
                <H4>{quickSearch.question}</H4>
               
                {
                    quickSearch.image && <React.Fragment>
                        <ImageContent>
                            <Image resizeMode={"contain"} style={{ height: '100%', width: '70%' }} source={{ uri: quickSearch.image }} />
                        </ImageContent>
                       
                    </React.Fragment>
                }


                <View>
                    {
                        options.map((option, index) => <View key={index}>
                           
                            <Button
                                onPress={() => answer(option)}
                                type="CallToAction-Light"
                                width={"100%"}
                            >{option}</Button>
                        </View>
                        )
                    }

                </View>
                {/* tags here */}
               

            </Content>
            <Footer>
                <Cancel>
                    <Subtitle1 center underline onPress={() => answer(undefined)} type="secondDarkColor">Prefiro não responder</Subtitle1>
                </Cancel>
            </Footer>
            <Bottom />
        </Container>)
}

