import React, { useState } from 'react';
import styled from 'styled-components';
import { Space } from '../../../components/Space';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { H4, H3 } from '../../../components/Typography';
import { closePopupModal } from '../../../store/actions/info';
import { Keyboard, TouchableOpacity, View } from 'react-native';

const Container = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
`
 const TextInput = styled.TextInput`
     height: 40px;
     width: 100%;
     border: 1.5px solid ${props => props.theme.colors.primaryColor}
     background: ${props => props.theme.colors.primaryLightColor}
     padding-left: ${props => props.theme.space.space2}
     padding-right: ${props => props.theme.space.space2}
     border-radius: ${props => props.theme.borderRadius.button}
     font-size: ${props => props.theme.space.space2};
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
    margin-top: ${props => props.theme.space.space1};
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid ${props => props.theme.colors.primaryColor};
    width: 40px;
    height: 40px;
    margin-left:  ${props => props.theme.space.space1};
    margin-right:  ${props => props.theme.space.space1};
`

const Option = ({children, onPress}) => {
    return <Option_ onPress={onPress}>
        <H3 center>{children}</H3>
    </Option_>
}

export default () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const {  popup = { } } = useSelector(state => state.info);
    const { callBack = () => {}, title = undefined, description = undefined, cancelBtn = undefined, options = [], } = popup.data  ? popup.data : {};

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
            {
                title && <H3 center>{title}</H3>
            }
            <Space n={1}/>
            {
                description && <H4 noBold center>{description}</H4>
            }
            <Space n={1} />
            <View style={{ width: '100%', flexDirection:'row', flexWrap: 'wrap'}}>
                {
                    options.map((option, index) => <View key={index} style={{ flexGrow: 1, alignItems: 'center' }}><Option onPress={() => choose(option)} >{option}</Option></View>)
                }
            </View>
            <Space n={2} />
            <Line>
                <Btn>
                    <Button onPress={cancel} type="CallToAction-Outline" width={'auto'}>{ cancelBtn ? cancelBtn : 'Cancelar'}</Button>
                </Btn>
            </Line>
        </Container>
    )
}