import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { Subtitle1, H3 } from './Typography';

const ToolItem = styled(TouchableOpacity)`
    position: absolute;
    top:0;
    right:0;
    justify-content: center;
    align-items:center;
`;

const Header = styled.View`
    flex-flow: row;
    position: relative;
`

export default withTheme((props) => <Header>
<H3>{props.title}</H3>
{
    props.showSeeAll && 
        <ToolItem onPress={() => props?.onSeeAllPress()}>
            <Subtitle1 underline color= '#414042'>Ver todos</Subtitle1>
        </ToolItem>
}
</Header>)