import React, { useState } from 'react'
import styled from 'styled-components'
import Dice from '../../../components/Dice'
import { Space, SpaceHorizontal } from '../../../components/Space'
import { Button } from '../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { H4, H3 } from '../../../components/Typography'
import { openLoginPopup } from '../../../store/actions/user'
import { closePopupModal } from '../../../store/actions/info'
import { Linking, KeyboardAvoidingView, Keyboard } from 'react-native'
import { handleRemoveCurrentPayment } from '../../../store/actions/payments'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Container = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
`
 const TextInput = styled.TextInput`
     height:40px;
     width: 100%;
     border: 1.5px solid;
     background: "#ebf7f4";
     padding-left: 16px
     padding-right: 16px
     border-radius: '8px';
     font-size: 16px;
 `

const Line = styled.View`
    flex-flow: row;
    align-items: flex-start;
    justify-content: center;
`

const Btn = styled.View`
    flex:  1 1 0px
`
const Option_ = styled.TouchableOpacity`
    margin-top: 8px;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid  #c8e8e0;
    width: 40px;
    height: 40px;
    margin-left:  8px;
    margin-right:  8px;
`

const Option = ({children, onPress}) => {
    return <Option_ onPress={onPress}>
        <H3 center>{children}</H3>
    </Option_>
}

export default () => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    
    const {  popup = { } } = useSelector(state => state.info)
    const { callBack = () => {}, title = undefined, description = undefined, cancelBtn = undefined, options = [], } = popup.data  ? popup.data : {}


    const cancel = () =>{
        dispatch(closePopupModal())
        callBack(false);
    }
    const choose = (option) =>{
        dispatch(closePopupModal())
        callBack(option);
    }

    return (
  
        <Container onPress={() => Keyboard.dismiss()}>
            {/* <KeyboardAvoidingView behavior="padding"> */}
            {
                title && <H3 center>{title}</H3>
            }
            <Space n={1}/>
            {
                description && <H4 noBold center>{description}</H4>
            }
            
           

            <View style={{ width: '100%', flexDirection:'row', flexWrap: 'wrap'}}>
                {
                    options.map((option, index) => <View key={index} style={{ flexGrow: 1, alignItems: 'center' }}><Option onPress={() => choose(option)} >{option}</Option></View>)
                }
            </View>
           
            <Line>
                <Btn>
                    <Button onPress={cancel} type="CallToAction-Outline" width={'auto'}>{ cancelBtn ? cancelBtn : 'Cancelar'}</Button>
                </Btn>
            </Line>
            {/* </KeyboardAvoidingView> */}
        </Container>
    )
}