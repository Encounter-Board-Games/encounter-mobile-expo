import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: ${props => props.noMargin ? 0 : (props.stepperUp ? '0px' : props.theme.space.space2)};
`
export const StepperHeader = styled.View`
    flex-flow: row;
    width: 100%;
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0'};
    padding-left: ${props => props.paddingRight ? props.paddingRight : '0'};
`
export const StepperHeaderBack = styled.TouchableOpacity`
    flex-flow: row;
    flex: 1;
    height: 32px;
`