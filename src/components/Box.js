import styled from 'styled-components'


export const Box = styled.View`
width: 100%;
background-color: ${props => props.theme.colors.lightColor}
${props => !props.noPadding ?  'padding:'+ props.theme.space.space2 : ''}

border-radius: ${props => props.theme.borderRadius.button};
shadow-color: ${props => props.theme.shadow.shadowColor};
shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
shadow-radius: ${props => props.theme.shadow.shadowRadius};
elevation: ${props => props.theme.shadow.elevation};
margin-bottom: ${props => props.theme.space.space2};

align-items: center;

`