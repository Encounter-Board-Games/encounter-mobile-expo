import React from 'react'
import styled from 'styled-components'


const Progress = styled.View`
    width: 100%;
    border-radius: 4px;
    height: 4px;
    background: "#BCBEC0";
`


const Bar = styled.View`
    width: 0%;
    border-radius: 4px;
    height: 4px;
    background: "#0d3c54";
`



export default (props) => {
    return (<Progress>
            <Bar {...props}/>
    </Progress>
    )
}