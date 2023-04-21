import styled from 'styled-components';
import { H3 } from '../../../components/Typography';

export const Container = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const TextInput = styled.TextInput`
     height: 40px;
     width: 100%;
     border: 1.5px solid ${props => props.theme.colors.primaryColor}
     background: ${props => props.theme.colors.primaryLightColor}
     padding-left: ${props => props.theme.space.space2}
     padding-right: ${props => props.theme.space.space2}
     border-radius: ${props => props.theme.borderRadius.button}
     font-size: ${props => props.theme.space.space2};
 `;

 export const Line = styled.View`
    flex-flow: row;
    align-items: flex-start;
    justify-content: center;
`;

export const Btn = styled.View`
    flex:  1 1 0px
`;

export const Option_ = styled.TouchableOpacity`
    margin-top: ${props => props.theme.space.space1};
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid ${props => props.theme.colors.primaryColor};
    width: 40px;
    height: 40px;
    margin-left:  ${props => props.theme.space.space1};
    margin-right:  ${props => props.theme.space.space1};
`;

export const Option = ({children, onPress}) => {
    return <Option_ onPress={onPress}>
        <H3 center>{children}</H3>
    </Option_>
}