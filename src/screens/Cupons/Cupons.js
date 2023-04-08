import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { H3, Subtitle2 } from '../../components/Typography'
import { Space } from '../../components/Space'
import ScreePopup from '../../components/ScreePopup'
import { Box } from '../../components/Box'
import NotLoggedBox from '../User/components/NotLoggedBox'
import InformationBox from '../../components/InformationBox'
import ProgressBar from '../../components/ProgressBar'
import { useSelector, useDispatch } from 'react-redux'
import { handleLoadCupons } from '../../store/actions/cupons'
import { handleSetSelects } from '../../store/actions/filters'
import { View } from 'react-native-animatable'
import { translation } from '../../texts'
import { useNavigation } from '@react-navigation/native'


const Container = styled.View`
    min-height:100%;
    padding: 16px;
`

const Cupon = styled.View`
width: 100%;
`

const Cupons = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { cupons = undefined } = useSelector(state => state.cupons)
    useEffect(() => {
        dispatch(handleLoadCupons())
    }, [])
    const hasCupons = cupons != undefined && cupons.length > 0;
    
    const openFilter = (filter) => {
        dispatch(handleSetSelects(filter))
        navigation.navigate('Busca')
    }

    return hasCupons ? <View  flex={1}>
        {
            cupons.map((cupon, index) => (
                <Box key={index}>
                    <Cupon>
                        <H3>{cupon.title}</H3>
                       
                        <Subtitle2 type="secondDarkColor">{cupon.description}</Subtitle2>
                       
                        <Button type="CallToAction-Outline" onPress={() => openFilter(cupon.search)}>{translation("cupon.btn")}</Button>
                       
                        <Subtitle2 width='100%' right type="secondDarkColor">{cupon.progressBarText}</Subtitle2>
                       
                        <ProgressBar percent={cupon.progressBar} />
                    </Cupon>
                </Box>
            ))
        }

    </View> : <InformationBox
            title='Você não possui cupons ativos.'
            description='Assim que receber, poderá ver tudo por aqui!' />
}

export default () => {

    const hasCupons = true;
    const { isLogged = false } = useSelector(state => state.user)


    const isNotLoggedContent = () => <NotLoggedBox title='Você não possui cupons ativos.' />

    return (<ScreePopup title={"Cupons"} withBorder >
        <Container>
            {isLogged ? <Cupons /> : isNotLoggedContent()}
        </Container>
    </ScreePopup>
    )
}