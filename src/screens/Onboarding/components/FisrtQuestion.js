import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { Space, Bottom } from '../../../components/Space'
import { H1, H4, H3, Subtitle2 } from '../../../components/Typography'
import { Image, View, Platform } from 'react-native'
import { Button } from '../../../components/Button'
import { RadioButton } from '../../../components/RadioButton'
import { setSelectQuestionToggleOnboarding } from '../../../store/actions/onboarding'
import { useDispatch, useSelector } from 'react-redux'
import { API_URI } from '../../../graphql/client'
import Constants from 'expo-constants'


const Container = styled.View`
    flex: 1;
    width: 100%;
    padding-left: 24px
    padding-right: 24px
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

const Line = styled.View`
    flex-flow: row
`;

export default (props) => {

    const dispatch = useDispatch()
    const onboarding = useSelector(state => state.onboarding)
    const type = 'firstQuestion'
    const selects =  onboarding.questions && onboarding.questions[type] ? onboarding.questions[type] : undefined
    const options = ["Opa, claro!","Ainda não"]
    return (
        <Container>
            <Content>
                <H4>Queremos <H3>te conhecer</H3> melhor.</H4>
                <H4>A cada pergunta a seguir, marque <H3>quantas respostas quiser</H3>.</H4>
                <H4>Mas, antes, diz pra gente: você já visitou a Encounter?</H4>
                <Line>
                    {
                        options.map((option, index) => <RadioButton key={option}
                                                           isLast={(index + 1)== options.length}
                                                           isSelected={selects == option} 
                                                           isFlex 
                                                           onPress={() => dispatch(setSelectQuestionToggleOnboarding(type, option))}>{option}</RadioButton>)
                    }
                    
                </Line>
                <ImageContent>
                    <Image resizeMode={"contain"} style={{ height: '100%', width: '70%' }} source={{ uri: API_URI + "/encounter.png"}} />
                </ImageContent>
            </Content>
            <Footer>
                <Button disabled={!selects} type="CallToAction-Light" width={"100%"} onPress={() => props.onNext() }>Continuar</Button>
            </Footer>
            <Bottom />
        </Container>)
}

