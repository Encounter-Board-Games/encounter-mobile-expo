import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    height: 100%
`;

export const Content = styled.ScrollView`
    height: 100%;
    flex-direction: column;
    padding: ${props => props.theme.space.space2};
`;

export const ContentInput = styled.View`
    flex-grow: 1;
`;

export const ContentButton = styled.View`
    margin-top: ${props => props.theme.space.space3}
`;

export const Line = styled.View`
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
`;

export const FlexItem = styled.View`
    flex: 1
`;

export const CustomInput = styled.View`
    border: 1.5px solid ${props => props.theme.colors.primaryColor}
    background: ${props => props.theme.colors.primaryLightColor}
    padding-left: ${props => props.theme.space.space2}
    border-radius: ${props => props.theme.borderRadius.button}
    height: 48px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row
    opacity: .5
`;

export const CustomInputText = styled.Text`

    font-size: ${props => props.theme.sizes.h3};
    opacity: ${props => props.disabled ? '.5' : '1'}
    color: ${props => props.theme.colors.darkColor}
`;