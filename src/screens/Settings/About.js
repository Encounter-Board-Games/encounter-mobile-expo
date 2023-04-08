import React from 'react'
import ScreePopup from '../../components/ScreePopup'
import { Subtitle3, Subtitle1, H3, H4 } from '../../components/Typography'
import styled, { withTheme } from 'styled-components'
import { Space, SpaceHorizontal } from '../../components/Space'
import { Button } from '../../components/Button'
import { useSelector } from 'react-redux'
import { Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { getBottomSpace } from 'react-native-iphone-x-helper'

const Container = styled.View`
    padding: 16px
    padding-top: 24px
    padding-bottom: 0
    flex: 1
    height: 100%
`
const ButtonContent = styled.View`
    width: 100%
    padding: 16px
`

const Line = styled.View` 
    flex-flow: row
    align-items:center
`

export default withTheme((props) => {

    const { about = {} } = useSelector(state => state.app)
    const openInstagram = () => {
        Linking.openURL('instagram://user?username=' + about.instagram)
                .catch(error => {
                    Linking.openURL('http://instagram.com.br/' + about.instagram )
                        .catch()
                })
    }
    // alert(getBottomSpace())
    return <ScreePopup
        title={"Sobre" + (about.nameAbout || "")}
        footer={() => <ButtonContent>
            <Button type={'CallToAction-Light'} onPress={openInstagram}>Ir para o Instagram</Button>
        </ButtonContent>}
        withBorder >
        <Container>
            <Subtitle1>
                {about.aboutText}
            </Subtitle1>

           
            <H3 type="secondDarkColor">Conheça nosso instagram</H3>

           
            <Line>
                <Ionicons color={"#6D6E71"} size={20} name="logo-instagram" />
                <SpaceHorizontal n={1} />
                <H4 type="secondDarkColor">@{about.instagram}</H4>
            </Line>
        </Container>
    </ScreePopup>
})