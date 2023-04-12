import styled from 'styled-components';

export const Space = styled.View`
  width: 1px;
`;

export const SpaceHorizontal = styled.View`
  width: ${props => props.theme.space['space' + props.n]}px;
  height: 1px;
`;

export const Bottom = styled.View`
  width: 100%;
  
`;