import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    width: 100%;
    position: relative;
    padding-right: '28px';
`

export const CustomInput = styled.TextInput`
    border: 1.5px solid  #c8e8e0;
    background: "#ebf7f4";
    padding-left: 16px;
    border-radius: 8px;
    height: 56px;
    font-size: 16px;
    opacity: .5;
`

const Button = styled.View`
    height: 56px;
    align-items:center;
    justify-content:center;
    width: 56px;
    border-radius: 56px;
    background: #414042;
    opacity: .5;
`

const ButtonSpace = styled.View`
    height: 56px;
    width: 56px;
    border-radius: 56px;
    background: "#FAFAFA";
    position: absolute;
    right: 0;
`

const TouchRightIcon = styled(TouchableOpacity)`
    height: 56px;
    width: 56px;
    border-radius: 56px;
    position: absolute;
    right: 0;
    align-items: center;
    justify-content: center;
    opacity: .5;
`

const CustomTextInput = (props) => {

    const format = (value) => {
        if(!props.format) return value
        return props.format(value)
    }

    let withButton, rightIcon;

    if(props.withButton) {
        withButton = (
            <ButtonSpace>
                <TouchableWithoutFeedback disabled={props.disabledButton} onPress={() => props.onPress()}>
                    <Button disabledButton={props.disabledButton}>
                        <Ionicons name="ios-arrow-forward" color="#FAFAFA" size={32} />
                    </Button>
                </TouchableWithoutFeedback>
            </ButtonSpace>
        );
    }

    if(props.rightIcon) {
        rightIcon = (
            <TouchRightIcon {...props} onPress={() => props.onRightIconPress && props.onRightIconPress()}>
                <Ionicons name={props.rightIcon} color= '#414042' size={32} />
            </TouchRightIcon>
        );
    }

    return (
        <Container {...props}>
            <CustomInput {...props} onChangeText={e => props.onChangeText && props.onChangeText(format(e))} editable={!props.disabled} />
            {withButton}
            {rightIcon}
        </Container>
    )
}

export default withTheme(CustomTextInput)
