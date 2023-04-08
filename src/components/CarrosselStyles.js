import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: "8px";
`
export const StepperHeader = styled.View`
    flex-flow: row;
    width: 100%;
`
export const StepperHeaderBack = styled(TouchableOpacity)`
    flex-flow: row;
    flex: 1;
    height: 32px;
`